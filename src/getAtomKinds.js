import getNbNonHydrogensAtoms from './getNbNonHydrogensAtoms';

/**
 *
 * @param {number} nbNonHydrogensAtoms - Total number of non hydrogen atoms
 * @param {number} unsaturation - Unsaturation
 * @returns {Array<Array[sp3,sp2,cycle,spt,spdd]>}
 */

export default function getAtomKinds(mfInfo) {
  const { atoms, unsaturation } = mfInfo;
  let nbNonHydrogensAtoms = getNbNonHydrogensAtoms(atoms);

  let atomKinds = [];
  for (let cycle = 0; cycle <= unsaturation; cycle++) {
    for (let spt = cycle; spt <= unsaturation; spt += 2) {
      for (let spdd = spt; spdd <= unsaturation; spdd++) {
        let kind = {
          nbSp3: 0,
          nbSp2: (unsaturation - spdd) * 2,
          nbCycle: cycle,
          nbSpt: spt - cycle,
          nbSpdd: spdd - spt,
        };
        kind.nbSp3 =
          nbNonHydrogensAtoms - kind.nbSp2 - kind.nbSpt - kind.nbSpdd;
        if (kind.nbSp3 < 0) continue;
        if ((kind.nbSpdd === 1) & (kind.nbSp2 < 2)) continue;
        atomKinds.push(kind);
      }
    }
  }
  return atomKinds;
}
