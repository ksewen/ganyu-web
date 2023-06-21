'use client';
import { Box, Container, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function Home() {
  return (
    <Container>
      <Typography style={{ textAlign: 'center' }} variant="h3" gutterBottom>
        WELCOME!
      </Typography>
      <Box>
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
      </Box>
    </Container>
  );
}
