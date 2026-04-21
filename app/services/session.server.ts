import { createCookie } from "react-router";
import type { UserSession } from "~/types/user";

const sessionCookie = createCookie("user_session", {
  httpOnly: true,
  secure: false,
  sameSite: "lax",
  maxAge: 60 * 60 * 24 * 30, // 30 days
});

const sessions: Map<string, UserSession> = new Map();

export async function createSession(userId: string): Promise<string> {
  const sessionId = crypto.randomUUID();
  const session: UserSession = {
    userId,
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  };
  
  sessions.set(sessionId, session);
  return sessionId;
}

export function getSession(sessionId: string): UserSession | null {
  const session = sessions.get(sessionId);
  if (!session) return null;

  // Check if expired
  if (new Date(session.expiresAt) < new Date()) {
    sessions.delete(sessionId);
    return null;
  }

  return session;
}

export function deleteSession(sessionId: string): void {
  sessions.delete(sessionId);
}

export async function getSessionFromRequest(
  request: Request
): Promise<string | null> {
  const cookieHeader = request.headers.get("Cookie");
  return await sessionCookie.parse(cookieHeader);
}

export async function createSessionCookie(sessionId: string): Promise<string> {
  return await sessionCookie.serialize(sessionId);
}

export async function destroySessionCookie(): Promise<string> {
  return await sessionCookie.serialize("", { maxAge: 0 });
}
