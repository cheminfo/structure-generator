import { getPossibleAtoms } from '../Atom';

describe('Atom.getPossibleAtoms', () => {
  it('C, 1 unsaturation', () => {
    let results = getPossibleAtoms({ C: 1 }, 1);
    results = JSON.parse(JSON.stringify(results));
    expect(results).toStrictEqual([
      {
        label: 'C',
        valence: 4,
        nbCycle: 0,
        nbDoubleBonds: 0,
        nbTripleBonds: 0,
        nbSingleBonds: 4,
        unsaturation: 0,
        index: 0,
      },
      {
        label: 'C',
        valence: 4,
        nbCycle: 0,
        nbDoubleBonds: 1,
        nbTripleBonds: 0,
        nbSingleBonds: 2,
        unsaturation: 1,
        index: 0,
      },
      {
        label: 'C',
        valence: 4,
        nbCycle: 1,
        nbDoubleBonds: 0,
        nbTripleBonds: 0,
        nbSingleBonds: 4,
        unsaturation: 1,
        index: 0,
      },
    ]);
  });
});
