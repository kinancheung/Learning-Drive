import { Card, CardContent, Container, Stack, Typography } from '@mui/material';

import GithubButton from '../../components/auth/buttons/GithubButton';
import GoogleButton from '../../components/auth/buttons/GoogleButton';
import LogoIcon from '../../components/icons/LogoIcon';

/**
 * Initial login page for users to authenticate their accounts with Google
 */
const LoginPage = () => (
  <Container maxWidth='xs' sx={{ mt: 8 }}>
    <Stack spacing={4}>
      <LogoIcon color='secondary' sx={{ mx: 'auto', width: 64, height: 64 }} />
      <Stack>
        <Typography align='center' variant='h3' gutterBottom>
          Learning Drive
        </Typography>
        <Typography align='center' color='text.secondary'>
          {'An online learning community'}
        </Typography>
      </Stack>
      <Card>
        <CardContent>
          <Stack alignItems='center' spacing={3}>
            <Typography variant='h6' component='h1' gutterBottom>
              Get Started
            </Typography>
            <GoogleButton />
            <GithubButton />
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  </Container>
);

export default LoginPage;
