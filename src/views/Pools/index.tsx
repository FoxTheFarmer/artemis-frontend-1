import React, { useMemo } from 'react';
import { Route } from 'react-router-dom';
import BigNumber from 'bignumber.js';
import { useWeb3React } from '@web3-react/core';
import { Flex } from '@fox/uikit';
import orderBy from 'lodash/orderBy';
import partition from 'lodash/partition';
import usePersistState from 'hooks/usePersistState';
import { usePools, useBlock } from 'state/hooks';
import FlexLayout from 'components/layout/Flex';
import Page from 'components/layout/Page';
import PageHeader from 'components/PageHeader';
import styled from 'styled-components';
import PoolCard from './components/PoolCard';
import CakeVaultCard from './components/CakeVaultCard';
import PoolTabButtons from './components/PoolTabButtons';
import { PAGES } from 'utils/constants/links';

const CardImage = styled.img`
  margin-bottom: 16px;
`;

const Pools: React.FC = () => {
  const { account } = useWeb3React();
  const pools = usePools(account);
  const { currentBlock } = useBlock();
  const [stakedOnly, setStakedOnly] = usePersistState(false, 'pancake_pool_staked');

  const [finishedPools, openPools] = useMemo(
    () => partition(pools, pool => pool.isFinished || currentBlock > pool.endBlock),
    [currentBlock, pools]
  );
  // TODO: not used for now
  // const stakedOnlyPools = useMemo(
  //   () => openPools.filter(pool => pool.userData && new BigNumber(pool.userData.stakedBalance).isGreaterThan(0)),
  //   [openPools]
  // );
  const hasStakeInFinishedPools = useMemo(
    () => finishedPools.some(pool => pool.userData && new BigNumber(pool.userData.stakedBalance).isGreaterThan(0)),
    [finishedPools]
  );
  // This pool is passed explicitly to the cake vault
  const cakePoolData = useMemo(() => openPools.find(pool => pool.sousId === 0), [openPools]);

  return (
    <>
      <PageHeader>
        <Flex
          justifyContent='space-between'
          flexDirection={['column', null, 'row']}>
          <Flex
            flexDirection='column'
            mr={['8px', 0]}>

            <CardImage
              src='/images/svgs/pool.png'
              alt='Portfolio'
              width={550}
              height={550} />

            {/*
            <Heading as="h1" scale="xxl" mb="24px">
              {t('FOX Pools')}
            </Heading>

            <Heading scale="md" color="text">
              {t('Simply stake tokens to earn.')}
            </Heading>
            */}
          </Flex>
        </Flex>
      </PageHeader>
      <Page>
        <PoolTabButtons
          stakedOnly={stakedOnly}
          setStakedOnly={setStakedOnly}
          hasStakeInFinishedPools={hasStakeInFinishedPools} />
        <FlexLayout>
          <Route
            exact
            path={PAGES.POOLS}>
            <>
              <CakeVaultCard
                pool={cakePoolData}
                showStakedOnly={stakedOnly} />
            </>
          </Route>
          <Route path={PAGES.POOLS_HISTORY}>
            {orderBy(finishedPools, ['sortOrder']).map(pool => (
              <PoolCard
                key={pool.sousId}
                pool={pool}
                account={account} />
            ))}
          </Route>
        </FlexLayout>
      </Page>
    </>
  );
};

export default Pools;
