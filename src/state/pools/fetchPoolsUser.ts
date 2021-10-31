import multicall from 'utils/multicall';
// eslint-disable-next-line import/named
import { getCakeAddress, getAutoRvrsAddress } from 'utils/addressHelpers';
import autofoxAbi from 'config/abi/autorvrs.json';
import erc20ABI from 'config/abi/erc20.json';

export const fetchPoolsAllowance = async account => {
  const calls = [
    {
      address: getCakeAddress(),
      name: 'allowance',
      params: [account, getAutoRvrsAddress()]
    }
  ];

  const allowances = await multicall(erc20ABI, calls);
  return {
    allowance: allowances
  };
};

export const fetchUserBalances = async account => {
  const calls = [
    {
      address: getAutoRvrsAddress(),
      name: 'wantLockedTotal',
      params: [account]
    }
  ];
  const tokenBalancesRaw = await multicall(autofoxAbi, calls);

  return { tokenBalancesRaw };
};

export const fetchUserStakeBalances = async account => {
  const calls = [
    {
      address: getCakeAddress(),
      name: 'balanceOf',
      params: [account]
    }
  ];
  const tokenBalancesRaw = await multicall(erc20ABI, calls);

  return { tokenBalancesRaw };
};