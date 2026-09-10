export type SupabaseTableResponse<T> = {
  data: T | null;
  error: Error | null;
};

export const mockProducts = [
  {
    id: '1',
    namn: 'Mild rengöring',
    beskrivning: 'Lätt rengöring för torr och känslig hud.',
    pris: 179,
    steg: 'rengoring',
    hudtyper: ['torr', 'normal', 'kombinerad'],
    besvar: ['torrhet', 'rodnad'],
    kanslig_ok: true,
    gravid_ok: true,
    bild_url: null,
  },
  {
    id: '2',
    namn: 'Niacinamide serum',
    beskrivning: 'Stödjer porer och balans för kombinerad hud.',
    pris: 249,
    steg: 'serum',
    hudtyper: ['kombinerad', 'fet', 'normal'],
    besvar: ['finnar', 'oljig hud'],
    kanslig_ok: true,
    gravid_ok: true,
    bild_url: null,
  },
  {
    id: '3',
    namn: 'Fuktkräm barrier repair',
    beskrivning: 'Djup återfuktning för torr och känslig hud.',
    pris: 299,
    steg: 'fuktkram',
    hudtyper: ['torr', 'normal'],
    besvar: ['torrhet', 'rodnad'],
    kanslig_ok: true,
    gravid_ok: true,
    bild_url: null,
  },
  {
    id: '4',
    namn: 'Daily SPF 50',
    beskrivning: 'Skydd mot UV-strålar med lätt finish.',
    pris: 229,
    steg: 'solskydd',
    hudtyper: ['torr', 'kombinerad', 'normal', 'fet'],
    besvar: ['solkänslighet'],
    kanslig_ok: true,
    gravid_ok: true,
    bild_url: null,
  },
] as const;

export const supabase = {
  from: (table: string) => ({
    select: async () => {
      if (table === 'products') {
        return { data: mockProducts, error: null };
      }

      return { data: [], error: null };
    },
    insert: async (_payload: unknown) => ({ error: null }),
  }),
};
