'use client';
import { useAuthContext } from '@/context/AuthProvider';
import { Box, Container, Link, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function Home() {
  const { auth } = useAuthContext();

  return (
    <Container>
      <Typography style={{ textAlign: 'center' }} variant="h3" gutterBottom>
        WELCOME!
      </Typography>
      <Box>
        {auth && (
          <Typography align="center" className="not-found">
            <Link href="/user/detail">{auth?.username}</Link>
          </Typography>
        )}
        {!auth && (
          <Stack spacing={2}>
            <Box style={{ textAlign: 'center' }}> - Please - </Box>
            <Box style={{ textAlign: 'center' }}>
              <Button sx={{ width: '20%' }} variant="contained" href="/sign-in">
                Sign In
              </Button>
            </Box>
            <Box style={{ textAlign: 'center' }}> - OR - </Box>
            <Box style={{ textAlign: 'center' }}>
              <Button sx={{ width: '20%' }} variant="contained" href="/sign-up">
                Sign Up
              </Button>
            </Box>
          </Stack>
        )}
      </Box>
    </Container>
  );
}
