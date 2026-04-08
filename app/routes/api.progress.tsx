import { data } from "react-router";
import type { Route } from "./+types/api.progress";
import { getSessionFromRequest, getSession } from "~/services/session.server";
import { getUserProgress } from "~/services/user.server";

export async function loader({ request }: Route.LoaderArgs) {
  const sessionId = await getSessionFromRequest(request);
  
  if (!sessionId) {
    return data({ error: "Не авторизован" }, { status: 401 });
  }

  const session = getSession(sessionId);
  if (!session) {
    return data({ error: "Сессия истекла" }, { status: 401 });
  }

  const progress = getUserProgress(session.userId);
  
  if (!progress) {
    return data({ error: "Прогресс не найден" }, { status: 404 });
  }

  return data({ progress });
}
