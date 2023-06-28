'use client';
import { Box, Container, Toolbar, Typography } from '@mui/material';
import Link from 'next/link';
import UserStatus from './UserStatus';

const pages = [
  { value: 'Home', path: '/' },
  { value: 'Shopping List', path: '/shopping-list' },
  { value: 'About', path: '/about' },
];

function Navbar() {
  return (
    <nav>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h4"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'Tahoma',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            GANYU
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Typography key={page.value} variant="string" gutterBottom>
                <Box sx={{ mt: 2 }}>
                  <Link href={page.path} key={page.value}>
                    {page.value}
                  </Link>
                </Box>
              </Typography>
            ))}
          </Box>
          <UserStatus />
        </Toolbar>
      </Container>
    </nav>
  );
}

export default Navbar;
