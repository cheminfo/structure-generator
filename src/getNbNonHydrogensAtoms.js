export default function getNbNonHydrogensAtoms(atoms) {
  let nbNonHydrogensAtoms = 0;
  for (let atom in atoms) {
    if (atom === 'H') continue;
    nbNonHydrogensAtoms += atoms[atom];
  }
  return nbNonHydrogensAtoms;
}
