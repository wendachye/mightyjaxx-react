import { memo, ReactNode } from 'react';
import { theme } from 'styles/theme';

const styles = ({ color, margin }: { color?: string; margin?: string }) => {
  return {
    color: color || theme.colors.black,
    margin: margin,
  };
};

interface TitleProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children?: ReactNode;
  color?: string;
  margin?: string;
}

const Title = ({ as: Component = 'h1', children, ...rest }: TitleProps) => {
  return <Component style={styles({ ...rest })}>{children}</Component>;
};

export default memo(Title);
