import { useRouteMatch, Link } from 'react-router-dom';
import {
  ButtonMenu,
  ButtonMenuItem,
  Toggle,
  Text,
  Flex,
  NotificationDot
} from '@fox/uikit';
import { useTranslation } from 'contexts/Localization';
import { PAGES } from 'utils/constants/links';

const PoolTabButtons = ({ stakedOnly, setStakedOnly, hasStakeInFinishedPools }): JSX.Element => {
  const { isExact } = useRouteMatch();
  const { t } = useTranslation();

  return (
    <Flex
      alignItems='center'
      justifyContent='center'
      mb='32px'>
      <Flex
        alignItems='center'
        flexDirection={['column', null, 'row', null]}>
        <ButtonMenu
          activeIndex={isExact ? 0 : 1}
          scale='sm'
          variant='subtle'>
          <ButtonMenuItem
            as={Link}
            to={PAGES.POOLS}>
            {t('Live')}
          </ButtonMenuItem>
          <NotificationDot show={hasStakeInFinishedPools}>
            <ButtonMenuItem
              as={Link}
              to={PAGES.POOLS_HISTORY}>
              {t('Finished')}
            </ButtonMenuItem>
          </NotificationDot>
        </ButtonMenu>
        <Flex
          mt={['4px', null, 0, null]}
          ml={[0, null, '24px', null]}
          justifyContent='center'
          alignItems='center'>
          <Toggle
            scale='sm'
            checked={stakedOnly}
            onChange={() => setStakedOnly(prev => !prev)} />
          <Text ml='8px'>{t('Staked only')}</Text>
        </Flex>
      </Flex>

    </Flex>
  );
};

export default PoolTabButtons;
