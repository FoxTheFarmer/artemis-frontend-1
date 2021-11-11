import masterchefAbi from 'config/abi/masterchef.json';
import multicall from 'utils/multicall';
import {getAutoRvrsAddress, getMasterChefAddress} from 'utils/addressHelpers';
import BigNumber from 'bignumber.js';

// eslint-disable-next-line import/prefer-default-export
export const fetchPoolsTotalStaking = async () => {
  const calls = [
    {
      address: getMasterChefAddress(),
      name: 'userInfo',
      params: [0, getAutoRvrsAddress()]
    }
  ];
  const userInfo = await multicall(masterchefAbi, calls);

  return userInfo;
};
