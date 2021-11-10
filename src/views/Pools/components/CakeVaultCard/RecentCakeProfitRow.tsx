import React from 'react';
import BigNumber from 'bignumber.js';
import { Flex, Text } from '@fox/uikit';
import { useTranslation } from 'contexts/Localization';
import { useWeb3React } from '@web3-react/core';
import RecentCakeProfitBalance from './RecentCakeProfitBalance';

interface RecentCakeProfitRowProps {
  crystalAtLastUserAction: BigNumber;
  userShares: BigNumber;
  pricePerFullShare: BigNumber;
}

const RecentCakeProfitCountdownRow: React.FC<RecentCakeProfitRowProps> = ({
  crystalAtLastUserAction,
  userShares,
  pricePerFullShare
}) => {
  const { t } = useTranslation();
  const { account } = useWeb3React();
  const shouldDisplayCakeProfit =
    account && crystalAtLastUserAction && crystalAtLastUserAction.gt(0) && userShares && userShares.gt(0);

  return (
    <Flex
      alignItems='center'
      justifyContent='space-between'>
      <Text fontSize='14px'>{t('Recent FOX profit:')}</Text>
      {shouldDisplayCakeProfit && (
        <RecentCakeProfitBalance
          crystalAtLastUserAction={crystalAtLastUserAction}
          userShares={userShares}
          pricePerFullShare={pricePerFullShare} />
      )}
    </Flex>
  );
};

export default RecentCakeProfitCountdownRow;
