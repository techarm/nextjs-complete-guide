import { verifyAuth } from '@/lib/auth';
import { redirect } from 'next/navigation';

import AuthForm from '@/components/auth-form';

export default async function Home({ searchParams }) {
  const result = await verifyAuth();
  if (result.user) {
    // ログイン済みの場合は、トレーニングページにリダイレクト
    return redirect('/training');
  }

  const { mode } = await searchParams;
  const formMode = mode || 'login';
  return <AuthForm mode={formMode} />;
}
