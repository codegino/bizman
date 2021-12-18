import {useEffect, useState} from 'react';
import {CacheProvider, EmotionCache} from '@emotion/react';
import {ThemeProvider} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import type {AppProps} from 'next/app';
import useDarkMode from 'use-dark-mode';
import Footer from '../components/Footer';
import Header from '../components/header/Header';
import darkTheme from '../dark-theme';
import '../styles/_globals.css';
import '../styles/animations.css';
import lightTheme from '../theme';
import createEmotionCache from '../utils/createEmotionCache';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp(props: MyAppProps) {
  const {Component, emotionCache = clientSideEmotionCache, pageProps} = props;
  const {value: isDarkMode} = useDarkMode();
  const [theme, setTheme] = useState(() =>
    isDarkMode ? darkTheme : lightTheme,
  );

  useEffect(() => {
    if (isDarkMode) {
      setTheme(darkTheme);
    } else {
      setTheme(lightTheme);
    }
  }, [isDarkMode]);

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

export default MyApp;
