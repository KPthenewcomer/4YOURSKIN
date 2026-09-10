import { byggRutin, poangsattProdukter, type QuizSvar } from './recommendation.js';
import { mockProducts } from './supabaseClient.js';

const svar: QuizSvar = {
  hudtyp: 'kombinerad',
  besvar: ['finnar', 'torrhet'],
  kanslig: false,
  gravid: false,
  budget: 'mellan',
};

const ranked = poangsattProdukter(
  mockProducts as any,
  svar,
);

console.log('Ranked products:');
console.log(ranked.map((p) => ({ namn: p.namn, steg: p.steg, poang: p.poang })));

const rutin = await byggRutin(svar);
console.log('\nRecommended routine:');
console.log(rutin.map((p) => ({ namn: p.namn, steg: p.steg })));
