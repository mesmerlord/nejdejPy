import { useState, useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';
import { Button, TextInput, PasswordInput, Container, Card } from '@mantine/core';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import LoginIcon from '@mui/icons-material/Login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import ReactGA from 'react-ga4';
import { useRouter } from 'next/router';
import { useStore } from '../../../src/store/store';
import {
  useRestAuthFacebookCreate,
  useRestAuthGoogleCreate,
} from '../../../src/rest-auth/rest-auth';
import { useDjRestAuthLoginCreate } from '../../../src/dj-rest-auth/dj-rest-auth';
import { routes } from '../../../src/utils/routes';
import Background from '../../../components/background/Background';
import { dehydrate, QueryClient } from 'react-query';

// const fbAppId = local_host ? "586157695796467" : "298089388720155";
//   const clientId = local_host
//     ? "553916859630-3ukm9ntg00ftpbqciu77h4ed41nh0vgi.apps.googleusercontent.com"
//     : "778632375770-0ndavp1ba39q5qkj20bukf5ankbjs5gn.apps.googleusercontent.com";

export async function getServerSideProps(ctx) {
  const queryClient = new QueryClient();
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const Login = () => {
  const token = useStore((state) => state.accessToken);
  const logIn = useStore((state) => state.setAccessToken);
  const setUserInfo = useStore((state) => state.setUserInfo);

  const fbAppId = process.env.NEXT_PUBLIC_FACEBOOK_CLIENT;
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT;
  const [usernameValue, setUsernameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const router = useRouter();
  const facebookAccountCreate = useRestAuthFacebookCreate();
  const googleAccountCreate = useRestAuthGoogleCreate();
  const normalAccountLogin = useDjRestAuthLoginCreate();

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Token ${token}`;
    } else {
      axios.defaults.headers.common['Authorization'] = false;
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      router.push(`${routes.home}`);
    }
  }, []);

  const googleResponse = (response) => {
    let accesstoken = response.accessToken;
    googleLogin(accesstoken);
  };

  const facebookResponse = (response) => {
    let accesstoken = response.accessToken;
    facebookLogin(accesstoken);
  };
  const googleLogin = (accesstoken) => {
    googleAccountCreate.mutate(
      { data: { access_token: accesstoken } },
      {
        onSuccess: (response) => {
          logIn(response.key);
          setUserInfo(response);
          ReactGA.event({
            category: `User Login`,
            action: `Google Login`,
            label: `Successful`,
          });
          router.back();
        },
      }
    );
  };

  const facebookLogin = (accesstoken) => {
    facebookAccountCreate.mutate(
      { data: { access_token: accesstoken } },
      {
        onSuccess: (response) => {
          logIn(response.key);
          setUserInfo(response);
          ReactGA.event({
            category: `User Login`,
            action: `Facebook Login`,
            label: `Successful`,
          });
          router.back();
        },
      }
    );
  };

  const normalLogin = () => {
    normalAccountLogin.mutate(
      { data: { username: usernameValue, password: passwordValue } },
      {
        onSuccess: (response) => {
          logIn(response.key);
          ReactGA.event({
            category: `User Login`,
            action: `Normal Login`,
            label: `Successful`,
          });
          router.back();
        },
      }
    );
  };

  return (
    <Background>
      <Container size="xs" sx={{ padding: '20px' }}>
        <Card sx={{ padding: '10px' }} shadow="xl">
          <TextInput
            value={usernameValue}
            onChange={(e) => setUsernameValue(e.currentTarget.value)}
            placeholder="Enter your username"
            label="Username"
            required
            sx={{ marginBottom: '20px' }}
          />
          <PasswordInput
            value={passwordValue}
            onChange={(e) => setPasswordValue(e.currentTarget.value)}
            placeholder="Enter your password"
            label="Password"
            required
            sx={{ marginBottom: '20px' }}
          />
          <Button
            fullWidth
            leftIcon={<LoginIcon />}
            onClick={normalLogin}
            sx={{ marginBottom: '15px' }}
          >
            Login
          </Button>
          <GoogleLogin
            clientId={clientId || ''}
            render={(renderProps) => (
              <Button
                color="gray"
                leftIcon={<GoogleIcon />}
                onClick={renderProps.onClick}
                fullWidth
                sx={{ marginBottom: '5px' }}
              >
                Login With Google
              </Button>
            )}
            onSuccess={googleResponse}
            onFailure={googleResponse}
          />
          <FacebookLogin
            appId={fbAppId}
            autoLoad={false}
            fields="name,email,picture"
            callback={facebookResponse}
            disableMobileRedirect={true}
            render={(renderProps) => (
              <Button
                leftIcon={<FacebookIcon />}
                color="rgb(66,103,178)"
                fullWidth
                onClick={renderProps.onClick}
              >
                Login With Facebook
              </Button>
            )}
          />
        </Card>
      </Container>
    </Background>
  );
};

export default Login;
