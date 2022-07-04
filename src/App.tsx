import { Provider } from 'react-redux';
import { persistor, store } from 'redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import Routes from 'routes';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from 'styles/global';
import { theme } from 'styles/theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Routes />
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
