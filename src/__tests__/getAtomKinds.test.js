import getAtomKinds from '../getAtomKinds';
import { MF } from 'mf-global';

describe('getAtomKinds', () => {
  it('CH4', () => {
    let results = getAtomKinds(new MF('CH4').getInfo());
    expect(results).toStrictEqual([
      { nbSp3: 1, nbSp2: 0, nbCycle: 0, nbSpt: 0, nbSpdd: 0 },
    ]);
  });

  it('C5H12', () => {
    let results = getAtomKinds(new MF('C5H12').getInfo());
    expect(results).toStrictEqual([
      { nbSp3: 5, nbSp2: 0, nbCycle: 0, nbSpt: 0, nbSpdd: 0 },
    ]);
  });

  it('C2H4', () => {
    let results = getAtomKinds(new MF('C2H4').getInfo());
    expect(results).toStrictEqual([
      { nbSp3: 0, nbSp2: 2, nbCycle: 0, nbSpt: 0, nbSpdd: 0 },
      { nbSp3: 2, nbSp2: 0, nbCycle: 1, nbSpt: 0, nbSpdd: 0 },
    ]);
  });

  it('C5H10', () => {
    let results = getAtomKinds(new MF('C5H10').getInfo());
    expect(results).toStrictEqual([
      { nbSp3: 3, nbSp2: 2, nbCycle: 0, nbSpt: 0, nbSpdd: 0 },
      { nbSp3: 5, nbSp2: 0, nbCycle: 1, nbSpt: 0, nbSpdd: 0 },
    ]);
  });

  it('C5H4', () => {
    let results = getAtomKinds(new MF('C5H4').getInfo());
    expect(results).toStrictEqual([
      { nbSp3: 0, nbSp2: 2, nbCycle: 0, nbSpt: 0, nbSpdd: 3 },
      { nbSp3: 1, nbSp2: 0, nbCycle: 0, nbSpt: 0, nbSpdd: 4 },
      { nbSp3: 0, nbSp2: 2, nbCycle: 0, nbSpt: 2, nbSpdd: 1 },
      { nbSp3: 1, nbSp2: 0, nbCycle: 0, nbSpt: 2, nbSpdd: 2 },
      { nbSp3: 1, nbSp2: 0, nbCycle: 0, nbSpt: 4, nbSpdd: 0 },
      { nbSp3: 0, nbSp2: 4, nbCycle: 1, nbSpt: 0, nbSpdd: 1 },
      { nbSp3: 1, nbSp2: 2, nbCycle: 1, nbSpt: 0, nbSpdd: 2 },
      { nbSp3: 2, nbSp2: 0, nbCycle: 1, nbSpt: 0, nbSpdd: 3 },
      { nbSp3: 1, nbSp2: 2, nbCycle: 1, nbSpt: 2, nbSpdd: 0 },
      { nbSp3: 1, nbSp2: 4, nbCycle: 2, nbSpt: 0, nbSpdd: 0 },
      { nbSp3: 2, nbSp2: 2, nbCycle: 2, nbSpt: 0, nbSpdd: 1 },
      { nbSp3: 3, nbSp2: 0, nbCycle: 2, nbSpt: 0, nbSpdd: 2 },
      { nbSp3: 3, nbSp2: 0, nbCycle: 2, nbSpt: 2, nbSpdd: 0 },
      { nbSp3: 3, nbSp2: 2, nbCycle: 3, nbSpt: 0, nbSpdd: 0 },
      { nbSp3: 5, nbSp2: 0, nbCycle: 4, nbSpt: 0, nbSpdd: 0 },
    ]);
  });
});
