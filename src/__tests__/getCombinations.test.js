import getCombinations from '../getCombinations';

import { MF } from 'mf-global';

describe('getCombinations', () => {
  it('C2H4O', () => {
    let mfInfo = new MF('C2H4O').getInfo();

    let results = getCombinations(mfInfo);
    console.log(results[0].possibilities);
    expect(true).toStrictEqual(true);
  });
});
