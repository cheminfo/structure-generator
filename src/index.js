import { MF } from 'mf-global';

/**
 * Returns a very important number
 * @return {number}
 */
export function generate(mf) {
  let mfInfo = new MF(mf).getInfo();
  console.log(mfInfo);
  checkMF(mfInfo);

  return 42;
}

function checkMF(mfInfo) {
  if (mfInfo.unsaturation < 0) throw Error('Unsaturation is negative');
  if (mfInfo.unsaturation << 0 !== mfInfo.unsaturation) {
    throw Error('Unsaturation must an integer');
  }
  if (mfInfo.charge !== 0) throw Error('Only uncharge mf are supported');
  for (let atom in mfInfo.atoms) {
    if (!['H', 'C', 'N', 'O', 'S', 'P', 'F', 'Cl', 'Br', 'I'].includes(atom)) {
      throw Error('The atom ' + atom + ' is not allowed');
    }
  }
}
