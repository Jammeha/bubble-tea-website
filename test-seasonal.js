import { getActiveDrinks } from './utils/seasonalFilter.js';

const mockDrinks = [
  { id: 1, name: 'Always Available', seasonal: false },
  { id: 2, name: 'Past Special', seasonal: true, availableFrom: '2020-01-01', availableTo: '2020-01-02' },
  { id: 3, name: 'Future Special', seasonal: true, availableFrom: '2099-01-01', availableTo: '2099-01-02' },
  { id: 4, name: 'Current Special', seasonal: true, availableFrom: '2026-03-01', availableTo: '2026-04-01' }, // Current is 2026-03-14
];

const active = getActiveDrinks(mockDrinks);
console.log('Active Drinks:', active.map(d => d.name));

if (active.length === 2 && active.some(d => d.name === 'Always Available') && active.some(d => d.name === 'Current Special')) {
  console.log('✅ TEST PASSED');
} else {
  console.log('❌ TEST FAILED');
  process.exit(1);
}
