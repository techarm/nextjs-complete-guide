import { redirect } from 'next/navigation';

import { verifyAuth } from '@/lib/auth';
import { logout } from '@/actions/auth-actions';
import '../globals.css';

export const metadata = {
  title: 'Next Auth',
  description: 'Next.js Authentication',
};

export default async function AuthRootLayout({ children }) {
  const result = await verifyAuth();
  if (!result.user) {
    return redirect('/');
  }

  return (
    <>
      <header id="auth-header">
        <p>Welcome back!</p>
        <form action={logout}>
          <button>Logout</button>
        </form>
      </header>
      {children}
    </>
  );
}
