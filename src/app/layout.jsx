'use client';
import Copyright from '@/component/Copyright';
import Navbar from '@/component/NavBar';
import { Container } from '@mui/material';
import styles from './global.css';

const Layout = ({ children }) => {
  return (
    <html lang="en">
      <body className={styles.content} suppressHydrationWarning={true}>
        <Container>
          <Navbar />
          {children}
          <Copyright />
        </Container>
      </body>
    </html>
  );
};

export default Layout;
