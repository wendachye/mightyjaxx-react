import { memo } from 'react';
import logoSVG from 'assets/logo.svg';
import styled from 'styled-components';

const LogoImage = styled.img<{ height?: string; onClick?: () => void; width?: string }>`
  width: ${({ width }) => width || '7.5rem'};
  height: ${({ height }) => height || '7.5rem'};
  cursor: ${({ onClick }) => (onClick ? 'pointer' : 'default')};
`;

interface LogoProps {
  height?: string;
  onClick?: () => void;
  width?: string;
}

const Logo = ({ ...rest }: LogoProps) => {
  return <LogoImage {...rest} alt="logo" src={logoSVG} />;
};

export default memo(Logo);
