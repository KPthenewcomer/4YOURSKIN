import { supabase } from './supabaseClient.js';

export type QuizSvar = {
  hudtyp: 'torr' | 'fet' | 'kombinerad' | 'normal';
  besvar: string[];
  kanslig: boolean;
  gravid: boolean;
  budget?: 'låg' | 'mellan' | 'hög';
};

export type Product = {
  id: string;
  namn: string;
  beskrivning: string | null;
  pris: number;
  steg: 'rengoring' | 'serum' | 'fuktkram' | 'solskydd';
  hudtyper: string[];
  besvar: string[];
  kanslig_ok: boolean;
  gravid_ok: boolean;
  bild_url: string | null;
};

type Poangsatt = Product & { poang: number };

const STEG_ORDNING: Product['steg'][] = ['rengoring', 'serum', 'fuktkram', 'solskydd'];

export async function hamtaProdukter(): Promise<Product[]> {
  const { data, error } = await supabase.from('products').select();
  if (error) throw error;
  return (data ?? []) as Product[];
}

export function poangsattProdukter(produkter: Product[], svar: QuizSvar): Poangsatt[] {
  return produkter
    .filter((p) => (!svar.gravid || p.gravid_ok) && (!svar.kanslig || p.kanslig_ok))
    .map((p) => ({
      ...p,
      poang:
        (p.hudtyper.includes(svar.hudtyp) ? 3 : 0) +
        p.besvar.filter((b) => svar.besvar.includes(b)).length * 2,
    }))
    .filter((p) => p.poang > 0)
    .sort((a, b) => b.poang - a.poang);
}

export async function byggRutin(svar: QuizSvar): Promise<Product[]> {
  const produkter = await hamtaProdukter();
  const poangsatta = poangsattProdukter(produkter, svar);

  const rutin = STEG_ORDNING.map((steg) => poangsatta.find((p) => p.steg === steg)).filter(
    (p): p is Poangsatt => Boolean(p),
  );

  if (rutin.length === 0) {
    return produkter.filter((p) => STEG_ORDNING.includes(p.steg)).slice(0, 4);
  }

  return rutin;
}

export async function sparaQuizSvar(svar: QuizSvar, userId?: string) {
  const { error } = await supabase.from('quiz_responses').insert({
    user_id: userId ?? null,
    hudtyp: svar.hudtyp,
    besvar: svar.besvar,
    kanslig: svar.kanslig,
    gravid: svar.gravid,
    budget: svar.budget,
  });

  if (error) throw error;
}
