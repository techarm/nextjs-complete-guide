'use server';

import { redirect } from 'next/navigation';

import { hashUserPassword, verifyPassword } from '@/lib/hash';
import { createUser, getUserByEmail } from '@/lib/user';
import { createAuthSession, destroySession } from '@/lib/auth';

export async function signup(prevState, formData) {
  const email = formData.get('email');
  const password = formData.get('password');

  let errors = {};
  if (!email.includes('@')) {
    errors.email = 'Please enter a valid email address.';
  }

  if (password.trim().length < 8) {
    errors.password = 'Password must be at least 8 characters long.';
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  const hashedPassword = hashUserPassword(password);
  try {
    const id = createUser(email, hashedPassword);
    await createAuthSession(id);

    redirect('/training');
  } catch (error) {
    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      errors.email = 'An account with that email address already exists.';
      return { errors };
    }
    throw error;
  }
}

export async function login(prevState, formData) {
  const email = formData.get('email');
  const password = formData.get('password');

  const user = getUserByEmail(email);
  if (!user) {
    return { errors: { email: 'No account with that email address exists.' } };
  }

  const isValidPassword = verifyPassword(user.password, password);
  if (!isValidPassword) {
    return { errors: { password: 'Incorrect password.' } };
  }

  await createAuthSession(user.id);
  redirect('/training');
}

export async function auth(mode, preState, formData) {
  if (mode === 'login') {
    return login(preState, formData);
  }
  return signup(preState, formData);
}

export async function logout() {
  await destroySession();
  redirect('/');
}
