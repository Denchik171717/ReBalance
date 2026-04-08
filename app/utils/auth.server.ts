import { redirect } from "react-router";
import { getSessionFromRequest, getSession } from "~/services/session.server";
import { getUserById } from "~/services/user.server";
import type { User } from "~/types/user";

export async function requireUser(request: Request): Promise<User> {
  const sessionId = await getSessionFromRequest(request);
  
  if (!sessionId) {
    throw redirect("/");
  }

  const session = getSession(sessionId);
  if (!session) {
    throw redirect("/");
  }

  const user = getUserById(session.userId);
  if (!user) {
    throw redirect("/");
  }

  return user;
}

export async function getUser(request: Request): Promise<User | null> {
  const sessionId = await getSessionFromRequest(request);
  
  if (!sessionId) {
    return null;
  }

  const session = getSession(sessionId);
  if (!session) {
    return null;
  }

  return getUserById(session.userId);
}
