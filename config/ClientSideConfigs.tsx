'use client';

import { addIcons } from '@/lib/Icons';
import { robotoCondensed } from '@/lib/fonts';
import { AppGlobalStyles } from '@/styling/global';
import { theme } from '@/styling/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


import { ThemeProvider } from 'styled-components';

addIcons();

const queryClient = new QueryClient();

export default function ClientSideConfigs({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
            <AppGlobalStyles />
            <div className={`${robotoCondensed.variable}`}>
              {children}
            </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
