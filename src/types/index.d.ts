import { breakpoints, colors } from 'styles/theme';

import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    breakpoints: typeof breakpoints;
    colors: typeof colors;
  }
}
