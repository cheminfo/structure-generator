import { getPossibleAtoms } from './Atom';
import getAtomKinds from './getAtomKinds';
import getNbNonHydrogensAtoms from './getNbNonHydrogensAtoms';
import { ATOM_INDEX } from './Atom';

export default function getCombinations(mfInfo) {
  const { atoms } = mfInfo;
  // for each atom kind we need to find the possible atoms
  /* Possible atoms:
C: sp3, sp3Cyclic, sp2, sp2Cyclic, spt, sptCyclic, spdd, spddCyclic
N, P: sp3, sp3Cyclic, sp2, sp2Cyclic, spt
O, S: sp3, sp3Cyclic, sp2
H, F, Cl, Br, I: sp3
*/

  let possibleAtoms = getPossibleAtoms(mfInfo);
  console.log(possibleAtoms);
  let atomKinds = getAtomKinds(mfInfo);
  let nbNonHydrogensAtoms = getNbNonHydrogensAtoms(atoms);

  const length = possibleAtoms.length;
  let maxAtomKindsTemplate = new Uint8Array(length);
  let atomTargetIndex = new Uint8Array(length);
  let numberAtoms = new Uint8Array(Object.keys(ATOM_INDEX).length);
  for (let atom in atoms) {
    if (ATOM_INDEX[atom] === undefined) continue;
    numberAtoms[ATOM_INDEX[atom]] = atoms[atom];
  }

  for (let i = 0; i < length; i++) {
    maxAtomKindsTemplate[i] = atoms[possibleAtoms[i].label];
    atomTargetIndex[i] = possibleAtoms[i].index;
  }

  const combinations = [];

  for (let atomKind of atomKinds) {
    let combination = {
      atomKind,
      possibleAtoms,
      possibilities: [],
    };
    combinations.push(combination);
    let maxAtomKinds = maxAtomKindsTemplate.slice();
    for (let atomIndex = 0; atomIndex < possibleAtoms.length; atomIndex++) {
      let atom = possibleAtoms[atomIndex];
      // based on required kind we will get the min / max of each atom kidn

      if (atom.isSp3 && maxAtomKinds[atomIndex] > atomKind.nbSp3) {
        maxAtomKinds[atomIndex] = atomKind.nbSp3;
      }
      if (atom.isSp2 && maxAtomKinds[atomIndex] > atomKind.nbSp2) {
        maxAtomKinds[atomIndex] = atomKind.nbSp2;
      }
      if (atom.isCycle && maxAtomKinds[atomIndex] > atomKind.nbCycle) {
        maxAtomKinds[atomIndex] = atomKind.nbCycle;
      }
      if (atom.isSpt && maxAtomKinds[atomIndex] > atomKind.nbSpt) {
        maxAtomKinds[atomIndex] = atomKind.nbSpt;
      }
      if (atom.isSpdd && maxAtomKinds[atomIndex] > atomKind.nbSpdd) {
        maxAtomKinds[atomIndex] = atomKind.nbSpdd;
      }
    }

    let currentAtomKindsCount = new Uint8Array(length);
    let currentAtomsCount = new Uint8Array(Object.keys(ATOM_INDEX).length);
    let currentNumberAtoms = 0;
    let currentPosition = 0;
    while (currentPosition >= 0) {
      if (currentNumberAtoms === nbNonHydrogensAtoms) {
        if (
          isValid(
            currentAtomsCount,
            numberAtoms,
            atomKind,
            possibleAtoms,
            currentAtomKindsCount,
          )
        ) {
          combination.possibilities.push(currentAtomKindsCount.slice());
        }
      }
      currentPosition = length - 1;
      while (currentPosition >= 0) {
        if (
          currentAtomKindsCount[currentPosition] <
            maxAtomKinds[currentPosition] &&
          currentNumberAtoms <= nbNonHydrogensAtoms
        ) {
          currentAtomKindsCount[currentPosition]++;
          currentNumberAtoms++;
          currentAtomsCount[atomTargetIndex[currentPosition]]++;
          break;
        } else {
          currentNumberAtoms -= currentAtomKindsCount[currentPosition];
          currentAtomsCount[atomTargetIndex[currentPosition]] -=
            currentAtomKindsCount[currentPosition];
          currentAtomKindsCount[currentPosition] = 0;
          currentPosition--;
        }
      }
    }
  }
  return combinations;
}

function isValid(
  currentAtomsCount,
  numberAtoms,
  atomKind,
  atoms,
  currentAtomKindsCount,
) {
  for (let i = 0; i < currentAtomsCount.length; i++) {
    if (currentAtomsCount[i] > numberAtoms[i]) {
      return false;
    }
  }
  atomKind = JSON.parse(JSON.stringify(atomKind));
  for (let i = 0; i < currentAtomKindsCount.length; i++) {
    if (currentAtomKindsCount[i] !== 0) {
      if (atoms[i].isSp3) atomKind.nbSp3 -= currentAtomKindsCount[i];
      if (atoms[i].isSp2) atomKind.nbSp2 -= currentAtomKindsCount[i];
      if (atoms[i].isSpdd) atomKind.nbSpdd -= currentAtomKindsCount[i];
      if (atoms[i].isSpt) atomKind.nbSpt -= currentAtomKindsCount[i];
      if (atoms[i].isCycle) atomKind.nbCycle -= currentAtomKindsCount[i];
    }
  }
  for (let kind in atomKind) {
    if (atomKind[kind] !== 0) return false;
  }
  return true;
}
