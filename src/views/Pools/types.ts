import BigNumber from 'bignumber.js';

export interface VaultUser {
  shares: BigNumber;
  crystalAtLastUserAction: BigNumber;
  lastDepositedTime: string;
  lastUserActionTime: string;
  stakingTokenBalance: BigNumber;
}
