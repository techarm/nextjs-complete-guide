import { Lucia } from 'lucia';
import { BetterSqlite3Adapter } from '@lucia-auth/adapter-sqlite';

import db from './db';
import { cookies } from 'next/headers';

const adapter = new BetterSqlite3Adapter(db, {
  user: 'users',
  session: 'sessions',
});

const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === 'production',
    },
  },
});

export async function createAuthSession(userId) {
  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  const cookie = await cookies();
  cookie.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
}

export async function verifyAuth() {
  const cookie = await cookies();
  const sessionCookie = cookie.get(lucia.sessionCookieName);

  if (!sessionCookie) {
    return {
      user: null,
      session: null,
    };
  }

  const sessionId = sessionCookie.value;
  if (!sessionId) {
    return {
      user: null,
      session: null,
    };
  }

  const result = await lucia.validateSession(sessionId);
  try {
    if (result.session && result.session.fresh) {
      const sessionCookie = lucia.createSessionCookie(result.session.id);
      cookie.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    }
    if (!result.session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      cookie.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    }
  } catch (error) {
    console.error(error);
  }

  return result;
}

export async function destroySession() {
  const { session } = await verifyAuth();
  if (!session) {
    return { error: 'User is not logged in.' };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  const cookie = await cookies();
  cookie.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
}

// https://v3.lucia-auth.com/basics/sessions
// Delete all expired sessions
// Use Lucia.deleteExpiredSessions() to delete all expired sessions in the database.
// We recommend setting up a cron-job to clean up your database on a set interval.
// await lucia.deleteExpiredSessions();
