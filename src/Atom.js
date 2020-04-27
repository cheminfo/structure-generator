export const ATOM_INDEX = {
  C: 0,
  N: 1,
  O: 2,
  F: 3,
  Cl: 4,
  Br: 5,
  I: 6,
  S: 7,
  P: 8,
};

export class Atom {
  constructor(value) {
    for (let key in value) {
      this[key] = value[key];
    }
    this.nbSingleBonds =
      this.valence - this.nbDoubleBonds * 2 - this.nbTripleBonds * 3;
    this.unsaturation =
      this.nbCycle + this.nbDoubleBonds + 2 * this.nbTripleBonds;
    this.index = ATOM_INDEX[this.label];
  }

  get isSp3() {
    return this.nbDoubleBonds === 0 && this.nbTripleBonds === 0;
  }

  get isSp2() {
    return this.nbDoubleBonds === 1;
  }

  get isSpdd() {
    return this.nbDoubleBonds === 2;
  }

  get isSpt() {
    return this.nbTripleBonds === 1;
  }

  get isCycle() {
    return this.nbCycle === 1;
  }
}

const Csp3 = new Atom({
  label: 'C',
  id: 'Csp3',
  valence: 4,
  nbCycle: 0,
  nbDoubleBonds: 0,
  nbTripleBonds: 0,
});

const Csp3Cyclic = new Atom({
  label: 'C',
  id: 'Csp3Cyclic',
  valence: 4,
  nbCycle: 1,
  nbDoubleBonds: 0,
  nbTripleBonds: 0,
});

const Csp2 = new Atom({
  label: 'C',
  id: 'Csp2',
  valence: 4,
  nbCycle: 0,
  nbDoubleBonds: 1,
  nbTripleBonds: 0,
});

const Csp2Cyclic = new Atom({
  label: 'C',
  id: 'Csp2Cyclic',
  valence: 4,
  nbCycle: 1,
  nbDoubleBonds: 1,
  nbTripleBonds: 0,
});

const Cspdd = new Atom({
  label: 'C',
  valence: 4,
  nbCycle: 0,
  nbDoubleBonds: 2,
  nbTripleBonds: 0,
});

const CspddCyclic = new Atom({
  label: 'C',
  id: 'CspddCyclic',
  valence: 4,
  nbCycle: 1,
  nbDoubleBonds: 2,
  nbTripleBonds: 0,
});

const Cspt = new Atom({
  label: 'C',
  id: 'Cspt',
  valence: 4,
  nbCycle: 0,
  nbDoubleBonds: 0,
  nbTripleBonds: 1,
});

const CsptCyclic = new Atom({
  label: 'C',
  id: 'CsptCyclic',
  valence: 4,
  nbCycle: 1,
  nbDoubleBonds: 0,
  nbTripleBonds: 1,
});

const Osp3 = new Atom({
  label: 'O',
  id: 'Osp3',
  valence: 2,
  nbCycle: 0,
  nbDoubleBonds: 0,
  nbTripleBonds: 0,
});

const Osp3Cyclic = new Atom({
  label: 'O',
  id: 'Osp3Cyclic',
  valence: 2,
  nbCycle: 1,
  nbDoubleBonds: 0,
  nbTripleBonds: 0,
});

const Osp2 = new Atom({
  label: 'O',
  id: 'Osp2',
  valence: 2,
  nbCycle: 0,
  nbDoubleBonds: 1,
  nbTripleBonds: 0,
});

export function getPossibleAtoms(mfInfo) {
  const { atoms, unsaturation } = mfInfo;
  let possibleAtoms = [];
  for (let atom in atoms) {
    if (atom === 'H') continue;
    if (atom === 'C') {
      possibleAtoms.push(Csp3);
      if (unsaturation >= 1) {
        possibleAtoms.push(Csp2);
        possibleAtoms.push(Csp3Cyclic);
      }
      if (unsaturation >= 2) {
        possibleAtoms.push(Cspt);
        possibleAtoms.push(Cspdd);
        possibleAtoms.push(Csp2Cyclic);
      }
      if (unsaturation >= 3) {
        possibleAtoms.push(CsptCyclic);
        possibleAtoms.push(CspddCyclic);
      }
    }
    if (atom === 'O') {
      possibleAtoms.push(Osp3);
      if (unsaturation >= 1) {
        possibleAtoms.push(Osp2);
        possibleAtoms.push(Osp3Cyclic);
      }
    }
  }

  return possibleAtoms;
}
