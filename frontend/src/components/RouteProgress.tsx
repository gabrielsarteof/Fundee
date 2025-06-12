// components/RouteProgress.tsx
'use client';

import { useEffect } from 'react';
import Router from 'next/router';         // importa o singleton do pages router
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

export function RouteProgress({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    NProgress.configure({ showSpinner: false, minimum: 0.1, speed: 300 });

    const handleStart = () => NProgress.start();
    const handleDone = () => NProgress.done();

    Router.events.on('routeChangeStart', handleStart);
    Router.events.on('routeChangeComplete', handleDone);
    Router.events.on('routeChangeError', handleDone);

    return () => {
      Router.events.off('routeChangeStart', handleStart);
      Router.events.off('routeChangeComplete', handleDone);
      Router.events.off('routeChangeError', handleDone);
    };
  }, []);

  return <>{children}</>;
}
