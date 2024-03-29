"use client";
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';

const inter = Inter({ subsets: ['latin'] })

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

/* export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
} */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
       <ThemeProvider theme={darkTheme}>
       <CssBaseline />
      <body className={inter.className}>
        
      <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
      </body>
      </ThemeProvider>
    </html>
  )
}
