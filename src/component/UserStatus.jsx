'use client';
import { useAuthContext } from '@/context/AuthProvider';
import { Box, Button } from '@mui/material';
import UserAvatar from './UserAvatar';

function UserStatus() {
  const { token } = useAuthContext();

  if (token) {
    return <UserAvatar />;
  }

  return (
    <Box sx={{ mt: 2 }}>
      <Button variant="text" size="small" href="/sign-in">
        LOGIN
      </Button>
      <Button variant="outlined" size="small" href="/sign-up">
        REGISTER
      </Button>
    </Box>
  );
}
export default UserStatus;
