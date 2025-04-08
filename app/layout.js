import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';

export const metadata = {
  title: 'NASA Explorer',
  description: 'Explore stunning daily astronomy pictures from NASA',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}


