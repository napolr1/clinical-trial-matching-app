import { ReactElement, useCallback, useEffect, useState } from 'react';
import { CacheProvider } from '@emotion/react';
import { CircularProgress, CssBaseline, Stack, ThemeProvider, Typography } from '@mui/material';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import { ReactQueryDevtools } from 'react-query/devtools';
import AppContext from '@/AppContext';

import '@fontsource/open-sans/300.css';
import '@fontsource/open-sans/400.css';
import '@fontsource/open-sans/600.css';
import '@fontsource/open-sans/700.css';
import '@fontsource/open-sans/800.css';

import emotionCache from '@/emotionCache';
import theme from '@/styles/theme';

import type { AppProps } from 'next/app';

const App = ({ Component, pageProps, router }: AppProps): ReactElement => {
  const [loading, setLoading] = useState(false);
  const [cancerTypeData, setCancerTypeData] = useState(null);
  const handleStart = useCallback(() => setLoading(true), []);
  const handleStop = useCallback(() => setLoading(false), []);

  useEffect(() => {
    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
    };
  }, [handleStop, handleStart, router.events]);

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <CacheProvider value={emotionCache}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {loading ? (
              <Stack minHeight="100vh" maxHeight="100vh" justifyContent="center" alignItems="center">
                <CircularProgress size="10vh" />
                <Typography variant="h4" marginTop={3}>
                  Loading page...
                </Typography>
              </Stack>
            ) : (
              <AppContext.Provider
                value={{
                  state: {
                    cancerTypeData: cancerTypeData,
                  },
                  setCancerTypeData: setCancerTypeData,
                }}
              >
                <Component {...pageProps} />
              </AppContext.Provider>
            )}
            <ReactQueryDevtools initialIsOpen={false} />
          </ThemeProvider>
        </CacheProvider>
      </Hydrate>
    </QueryClientProvider>
  );
};

export default App;
