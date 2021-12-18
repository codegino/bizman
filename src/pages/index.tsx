import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import type {GetStaticProps, InferGetStaticPropsType} from 'next';
import Head from 'next/head';
import {commonMetaTags} from '../frontend-utils/meta-tags';
import generateSitemap from '../lib/sitemap';

export default function Home({}: InferGetStaticPropsType<
  typeof getStaticProps
>) {
  return (
    <>
      <Head>
        <title>Welcome to my Website | Code Gino | Carlo Gino Catapang</title>
        {commonMetaTags('Home Page')}
      </Head>

      <main>
        <Container>
          <Typography variant="h1">Hello world</Typography>
          <Typography
            color={{
              xs: 'yellow',
              sm: 'red',
              md: 'blue',
              lg: 'pink',
            }}
          >
            YOYO
          </Typography>
        </Container>
        <Button variant="outlined" color="primary">
          Hello
        </Button>
        <Button variant="contained" color="primary">
          Hello
        </Button>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  if (process.env.NODE_ENV === 'production') {
    await generateSitemap();
  }

  return {
    props: {},
  };
};
