'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/SideBar';
import Header from '@/components/Header';
import CategoryTabs from '@/components/CategoryTabs';
import TrendingSection from '@/components/TrendingSection';
import TopicSection from '@/components/TopicSection';

export default function HomePage() {
  const [authChecked, setAuthChecked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    if (!token) {
      router.replace('/auth/login');
    } else {
      setAuthChecked(true);
    }
  }, [router]);

  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <Sidebar active="/" />
      <Header />
      <CategoryTabs />
      <TrendingSection />
      <TopicSection />
    </div>
  );
}