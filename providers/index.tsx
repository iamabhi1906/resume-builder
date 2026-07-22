'use client';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter';
import AuthProvider from './auth-provider';
import ThemeProviderComp from './theme';
import ReduxStore from './redux-store';
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxStore>
      <AppRouterCacheProvider>
        <AuthProvider>
          <ThemeProviderComp>{children}</ThemeProviderComp>
        </AuthProvider>
      </AppRouterCacheProvider>
    </ReduxStore>
  );
}
