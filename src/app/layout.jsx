import Copyright from '@/component/copyright';
import Navbar from '@/component/navbar';
import styles from './global.css';

export const metadata = {
  title: {
    template: '%s | Ganyu',
  },
  description: 'a little assistant',
};

const Layout = ({ children }) => {
  return (
    <html lang="en">
      <body className="content" suppressHydrationWarning={true}>
        <Navbar />
        {children}
        <Copyright />
      </body>
    </html>
  );
};

export default Layout;
