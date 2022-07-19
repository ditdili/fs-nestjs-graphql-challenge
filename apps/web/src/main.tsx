import { CacheProvider } from '@emotion/react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
  from,
} from '@apollo/client';

import { onError } from '@apollo/client/link/error';

import App from './app/app';
import createEmotionCache from './createEmotionCache';
import theme from './theme';
import { GraphQLError } from 'graphql';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// General Error display from GraphQL
const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach((error: GraphQLError) => {
      console.log(error);
      const { response, code } = error.extensions;

      if (code === 'BAD_USER_INPUT') {
        alert(`GraphQL Error: ${JSON.stringify(response, null, 2)}`);
      } else {
        alert(`GraphQL Error: ${error.message}`);
      }
    });
  }

  if (networkError) {
    console.log(`Network Error: ${networkError.message}`);
  }
});

const httpLink = createHttpLink({
  uri: 'http://localhost:3333/graphql',
});

const queryClient = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache: new InMemoryCache(),
});

root.render(
  <StrictMode>
    <ApolloProvider client={queryClient}>
      <CacheProvider value={clientSideEmotionCache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </CacheProvider>
    </ApolloProvider>
  </StrictMode>
);
