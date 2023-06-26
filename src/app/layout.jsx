'use client';
import Copyright from '@/component/Copyright';
import Navbar from '@/component/NavBar';
import { AuthContextProvider } from '@/context/AuthProvider';
import { Container } from '@mui/material';
import styles from './global.css';

const Layout = ({ children }) => {
  return (
    <html lang="en">
      <body className={styles.content} suppressHydrationWarning={true}>
        <Container>
          <AuthContextProvider>
            <Navbar />
            {children}
            <Copyright />
          </AuthContextProvider>
        </Container>
      </body>
    </html>
  );
};

export default Layout;
