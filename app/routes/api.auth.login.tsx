import { data, redirect } from "react-router";
import type { Route } from "./+types/api.auth.login";
import { createUser, getUserByEmail } from "~/services/user.server";
import { createSession, createSessionCookie } from "~/services/session.server";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;

  if (!name || !email) {
    return data({ error: "Имя и email обязательны" }, { status: 400 });
  }

  // Check if user exists
  let user = getUserByEmail(email);
  
  // Create new user if not exists
  if (!user) {
    user = createUser(name, email);
  }

  // Create session
  const sessionId = await createSession(user.id);
  const cookie = await createSessionCookie(sessionId);

  return redirect("/", {
    headers: {
      "Set-Cookie": cookie,
    },
  });
}
