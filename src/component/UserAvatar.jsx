'use client';
import { useAuthContext } from '@/context/AuthProvider';
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';

const settings = [
  { value: 'Account', path: '/user/detail' },
  { value: 'Logout', path: '/logout' },
];

function UserAvatar() {
  const { auth } = useAuthContext();
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title={auth?.nickname}>
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar key="user-avatar" src={auth?.avatarUrl} />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map((setting) => (
          <MenuItem key={setting.value} onClick={handleCloseUserMenu}>
            <Typography textAlign="center">
              <Link href={setting.path}>{setting.value}</Link>
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}

export default UserAvatar;
