import type { User, UserProgress, AssessmentScore } from "~/types/user";

// In-memory storage (replace with database in production)
const users: Map<string, User> = new Map();
const userProgress: Map<string, UserProgress> = new Map();

export function createUser(name: string, email: string): User {
  const user: User = {
    id: crypto.randomUUID(),
    name,
    email,
    createdAt: new Date().toISOString(),
  };
  
  users.set(user.id, user);
  
  // Initialize progress
  userProgress.set(user.id, {
    userId: user.id,
    assessmentScores: [],
    completedResources: [],
    studyStreak: 0,
    lastStudyDate: new Date().toISOString(),
    totalStudyTime: 0,
  });
  
  return user;
}

export function getUserById(userId: string): User | null {
  return users.get(userId) || null;
}

export function getUserByEmail(email: string): User | null {
  for (const user of users.values()) {
    if (user.email === email) {
      return user;
    }
  }
  return null;
}

export function getUserProgress(userId: string): UserProgress | null {
  return userProgress.get(userId) || null;
}

export function saveAssessmentScore(
  userId: string,
  assessmentId: string,
  score: number,
  totalQuestions: number,
  timeSpent: number
): void {
  const progress = userProgress.get(userId);
  if (!progress) return;

  const newScore: AssessmentScore = {
    assessmentId,
    score,
    totalQuestions,
    completedAt: new Date().toISOString(),
    timeSpent,
  };

  // Remove old score for same assessment
  progress.assessmentScores = progress.assessmentScores.filter(
    (s) => s.assessmentId !== assessmentId
  );
  
  progress.assessmentScores.push(newScore);
  userProgress.set(userId, progress);
}

export function markResourceCompleted(userId: string, resourceId: string): void {
  const progress = userProgress.get(userId);
  if (!progress) return;

  if (!progress.completedResources.includes(resourceId)) {
    progress.completedResources.push(resourceId);
    userProgress.set(userId, progress);
  }
}

export function updateStudyTime(userId: string, minutes: number): void {
  const progress = userProgress.get(userId);
  if (!progress) return;

  const today = new Date().toISOString().split("T")[0];
  const lastStudyDay = new Date(progress.lastStudyDate).toISOString().split("T")[0];

  // Update streak
  if (today !== lastStudyDay) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split("T")[0];

    if (lastStudyDay === yesterdayStr) {
      progress.studyStreak += 1;
    } else {
      progress.studyStreak = 1;
    }
    progress.lastStudyDate = new Date().toISOString();
  }

  progress.totalStudyTime += minutes;
  userProgress.set(userId, progress);
}

export function getAllUsers(): User[] {
  return Array.from(users.values());
}
