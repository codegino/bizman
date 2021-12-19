import {useEffect} from 'react';
import {Auth} from '@supabase/ui';
import {GetServerSideProps} from 'next';
import {useRouter} from 'next/router';
import {supabase} from '../utils/supabase-client';

const Container: React.FC = ({children}) => {
  const router = useRouter();

  useEffect(() => {
    const {data: authListener} = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.access_token) {
          fetch('/api/auth', {
            method: 'POST',
            headers: new Headers({'Content-Type': 'application/json'}),
            credentials: 'same-origin',
            body: JSON.stringify({event, session}),
          })
            .then(res => res.json())
            .then(e => {
              router.replace('/');
            });
        }
      },
    );
    return () => {
      authListener?.unsubscribe();
    };
  }, [router]);

  return <>{children}</>;
};

export default function AuthBasic() {
  return (
    <Container>
      <Auth supabaseClient={supabase} />
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async ({req}) => {
  const {token} = await supabase.auth.api.getUserByCookie(req);

  if (token) {
    return {
      props: {},
      redirect: {
        destination: '/',
      },
    };
  }

  return {
    props: {},
  };
};
