import { redirect } from "react-router";
import type { Route } from "./+types/api.auth.logout";
import {
  getSessionFromRequest,
  deleteSession,
  destroySessionCookie,
} from "~/services/session.server";

export async function action({ request }: Route.ActionArgs) {
  const sessionId = await getSessionFromRequest(request);
  
  if (sessionId) {
    deleteSession(sessionId);
  }

  const cookie = await destroySessionCookie();

  return redirect("/", {
    headers: {
      "Set-Cookie": cookie,
    },
  });
}
