import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("assessment", "routes/assessment.tsx"),
  route("resources", "routes/resources.tsx"),
  route("progress", "routes/progress.tsx"),
  route("resource/:id", "routes/resource.$id.tsx"),   // добавленная строка
  route("api/auth/login", "routes/api.auth.login.tsx"),
  route("api/auth/logout", "routes/api.auth.logout.tsx"),
  route("api/progress", "routes/api.progress.tsx"),
  route("api/assessment/submit", "routes/api.assessment.submit.tsx"),
  route("api/resource/complete", "routes/api.resource.complete.tsx"),
] satisfies RouteConfig;