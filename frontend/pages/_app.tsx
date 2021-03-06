import React, { useEffect, useState } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider, ColorScheme } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { Provider, useCreateStore } from '../src/store/store';
import ReactGA from 'react-ga4';
import { useRouter } from 'next/router';
import Loading from '../components/common/Loading';
import Background from '../components/background/Background';
import Navbar from '../components/navbar/Navbar';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  const [queryClient] = React.useState(() => new QueryClient());
  const createStore = useCreateStore(pageProps?.initialZustandState);
  const router = useRouter();
  const [state, setState] = useState({
    isRouteChanging: false,
    loadingKey: 0,
  });
  useEffect(() => {
    ReactGA.initialize(process?.env?.NEXT_PUBLIC_ANALYTICS_CODE as string);
  }, []);

  useEffect(() => {
    const handleRouteChangeStart = () => {
      ReactGA.send({ hitType: 'pageview', page: router.pathname });

      setState((prevState) => ({
        ...prevState,
        isRouteChanging: true,
        loadingKey: prevState.loadingKey ^ 1,
      }));
    };

    const handleRouteChangeEnd = () => {
      setState((prevState) => ({
        ...prevState,
        isRouteChanging: false,
      }));
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeEnd);
    router.events.on('routeChangeError', handleRouteChangeEnd);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeEnd);
      router.events.off('routeChangeError', handleRouteChangeEnd);
    };
  }, [router.events]);

  return (
    <>
      <Provider createStore={createStore}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps?.dehydratedState}>
            <Head>
              <title>Mantine next example</title>
              <meta
                name="viewport"
                content="minimum-scale=1, initial-scale=1, width=device-width"
              />
              <link rel="shortcut icon" href="/favicon.svg" />
            </Head>

            <MantineProvider withGlobalStyles withNormalizeCSS>
              <NotificationsProvider>
                <Loading isRouteChanging={state.isRouteChanging} key={state.loadingKey} />
                <Background>
                  <Navbar />

                  <Component {...pageProps} />
                </Background>
              </NotificationsProvider>
            </MantineProvider>
          </Hydrate>
        </QueryClientProvider>
      </Provider>
    </>
  );
}
