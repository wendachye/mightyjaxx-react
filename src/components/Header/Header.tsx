import { memo } from 'react';
import { logout } from 'redux/slices/userSlice';
import { push } from 'redux-first-history';
import { theme } from 'styles/theme';

import Button from 'components/Button';
import Logo from 'components/Logo';
import useMediaQuery from 'hooks/useMediaQuery';
import { useDispatch } from 'hooks/useRedux';
import { StyledHeader } from './Header.styles';

const Header = () => {
  const dispatch = useDispatch();
  const isDesktop = useMediaQuery(`(min-width:${theme.breakpoints.sm})`);

  const handleLogout = async () => {
    dispatch(logout.trigger());
  };

  const onClickLogo = () => {
    dispatch(push('/'));
  };

  return (
    <StyledHeader>
      <Logo
        onClick={onClickLogo}
        width={isDesktop ? '5rem' : '3.75rem'}
        height={isDesktop ? '5rem' : '3.75rem'}
      />
      <Button onClick={handleLogout} backgroundColor="transparent">
        Logout
      </Button>
    </StyledHeader>
  );
};

export default memo(Header);
