import autofoxAbi from 'config/abi/autorvrs.json';
import multicall from 'utils/multicall';
import { getAutoRvrsAddress } from 'utils/addressHelpers';
import BigNumber from 'bignumber.js';

// eslint-disable-next-line import/prefer-default-export
export const fetchPoolsTotalStaking = async () => {
  const calls = [
    {
      address: getAutoRvrsAddress(),
      name: 'balanceOf',
      params: []
    }
  ];
  const totalStaked = await multicall(autofoxAbi, calls);

  return {
    totalStaked: new BigNumber(totalStaked).toJSON()
  };
};