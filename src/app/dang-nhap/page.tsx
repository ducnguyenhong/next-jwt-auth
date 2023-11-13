import { Box, Button } from '@chakra-ui/react';
import { NextPage } from 'next';
import { useCallback } from 'react';

const Login: NextPage = () => {
  const onLogin = useCallback(() => {
    window.location.href = `${process.env.NEXT_PUBLIC_IVND}/login?redirect-app=${process.env.NEXT_PUBLIC_IVND_KEY}`;
  }, []);

  return (
    <Box>
      <Button onClick={onLogin}>Sign in</Button>
    </Box>
  );
};

export default Login;
