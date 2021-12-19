import {useEffect, useState} from 'react';
import {CacheProvider, EmotionCache} from '@emotion/react';
import {ThemeProvider} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import type {AppContext, AppProps} from 'next/app';
import App from 'next/app';
import useDarkMode from 'use-dark-mode';
import Footer from '../components/Footer';
import Header from '../components/header/Header';
import '../styles/_globals.css';
import '../styles/animations.css';
import darkTheme from '../styles/dark-theme';
import lightTheme from '../styles/theme';
import createEmotionCache from '../utils/createEmotionCache';
import {supabase} from '../utils/supabase-client';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp(props: MyAppProps) {
  const {Component, emotionCache = clientSideEmotionCache, pageProps} = props;
  const {value: isDarkMode} = useDarkMode();
  const [theme, setTheme] = useState(() => lightTheme);

  useEffect(() => {
    if (isDarkMode) {
      setTheme(darkTheme);
    } else {
      setTheme(lightTheme);
    }
  }, [isDarkMode]);

  useEffect(() => {
    const {data: authListener} = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!session?.access_token) {
          fetch('/api/auth', {
            method: 'POST',
            headers: new Headers({'Content-Type': 'application/json'}),
            credentials: 'same-origin',
            body: JSON.stringify({event, session}),
          })
            .then(res => res.json())
            .then(() => {
              if (props.router.pathname !== '/auth') {
                props.router.replace('/auth');
              }
            });
        }
      },
    );
    return () => {
      authListener?.unsubscribe();
    };
  }, [props.router]);

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Component {...pageProps} />
        <Footer />
      </ThemeProvider>
    </CacheProvider>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);

  const {token} = await supabase.auth.api.getUserByCookie(appContext.ctx.req);

  // Redirect to login if no token is found.
  if (!token) {
    if (appContext.router.pathname !== '/auth') {
      appContext.ctx.res?.writeHead(302, {Location: '/auth'});
      appContext.ctx.res?.end();

      return {
        props: appProps,
      };
    }
  }

  return appProps;
};

export default MyApp;
