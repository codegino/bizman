import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import type {GetServerSideProps} from 'next';
import Head from 'next/head';
import {commonMetaTags} from '../frontend-utils/meta-tags';
import {User} from '../models/User';
import {supabase} from '../utils/supabase-client';

export default function Home() {
  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

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
        <Button variant="outlined" color="error" onClick={handleSignOut}>
          Sign out
        </Button>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{users: User[]}> = async ({
  req,
}) => {
  const {token} = await supabase.auth.api.getUserByCookie(req);

  supabase.auth.setAuth(token as string);

  const {data: users} = await supabase.from<User>('users').select('*');

  return {
    props: {users: users ?? []},
  };
};
