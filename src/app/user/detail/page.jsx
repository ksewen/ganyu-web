'use client';
import { ProtectRoute } from '@/context/AuthProvider';
import { Container, Typography } from '@mui/material';

function Details() {
  return (
    <ProtectRoute>
      <Container>
        <Typography variant="h5">User Detail</Typography>
        <Typography variant="text">username: </Typography>
      </Container>
    </ProtectRoute>
  );
}

export default Details;
