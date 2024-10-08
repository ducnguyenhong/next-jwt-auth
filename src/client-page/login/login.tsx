'use client';

import { Box, Button } from '@chakra-ui/react';
import { useCallback } from 'react';

const Login: React.FC = () => {
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
