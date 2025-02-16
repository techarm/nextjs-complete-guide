import AuthForm from '@/components/auth-form';

export default async function Home({ searchParams }) {
  const { mode } = await searchParams;
  const formMode = mode || 'login';
  console.log(formMode);
  return <AuthForm mode={formMode} />;
}
