import { data } from "react-router";
import type { Route } from "./+types/api.resource.complete";
import { getSessionFromRequest, getSession } from "~/services/session.server";
import { markResourceCompleted, updateStudyTime } from "~/services/user.server";

export async function action({ request }: Route.ActionArgs) {
  const sessionId = await getSessionFromRequest(request);
  
  if (!sessionId) {
    return data({ error: "Не авторизован" }, { status: 401 });
  }

  const session = getSession(sessionId);
  if (!session) {
    return data({ error: "Сессия истекла" }, { status: 401 });
  }

  const formData = await request.formData();
  const resourceId = formData.get("resourceId") as string;
  const studyMinutes = parseInt(formData.get("studyMinutes") as string);

  if (!resourceId) {
    return data({ error: "ID ресурса обязателен" }, { status: 400 });
  }

  markResourceCompleted(session.userId, resourceId);

  if (!isNaN(studyMinutes) && studyMinutes > 0) {
    updateStudyTime(session.userId, studyMinutes);
  }

  return data({ success: true });
}
