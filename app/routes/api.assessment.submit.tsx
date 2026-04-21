 import { data } from "react-router";
import type { Route } from "./+types/api.assessment.submit";
import { getSessionFromRequest, getSession } from "~/services/session.server";
import { saveAssessmentScore, updateStudyTime } from "~/services/user.server";

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
  const assessmentId = formData.get("assessmentId") as string;
  const score = parseInt(formData.get("score") as string);
  const totalQuestions = parseInt(formData.get("totalQuestions") as string);
  const timeSpent = parseInt(formData.get("timeSpent") as string);

  if (!assessmentId || isNaN(score) || isNaN(totalQuestions) || isNaN(timeSpent)) {
    return data({ error: "Неверные данные" }, { status: 400 });
  }

  saveAssessmentScore(
    session.userId,
    assessmentId,
    score,
    totalQuestions,
    timeSpent
  );

  // Update study time (convert seconds to minutes)
  updateStudyTime(session.userId, Math.ceil(timeSpent / 60));

  return data({ success: true });
}
