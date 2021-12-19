import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import type {GetServerSideProps, InferGetServerSidePropsType} from 'next';
import Head from 'next/head';
import {commonMetaTags} from '../frontend-utils/meta-tags';
import {User} from '../models/User';
import {supabase} from '../utils/supabase-client';

export default function Projects({
  users,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Head>
        <title>Welcome to my Website | Code Gino | Carlo Gino Catapang</title>
        {commonMetaTags('Home Page')}
      </Head>

      <main>
        {users.map(user => (
          <Container key={user.id}>
            <Typography variant="h1">
              {user.first_name} {user.last_name}
            </Typography>
            <Typography variant="h2">{user.user_id}</Typography>
          </Container>
        ))}
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
