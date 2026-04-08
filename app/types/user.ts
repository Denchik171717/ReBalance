export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface UserProgress {
  userId: string;
  assessmentScores: AssessmentScore[];
  completedResources: string[];
  studyStreak: number;
  lastStudyDate: string;
  totalStudyTime: number; // in minutes
}

export interface AssessmentScore {
  assessmentId: string;
  score: number;
  totalQuestions: number;
  completedAt: string;
  timeSpent: number; // in seconds
}

export interface UserSession {
  userId: string;
  createdAt: string;
  expiresAt: string;
}
