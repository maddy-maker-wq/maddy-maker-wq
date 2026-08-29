import { JobPosting, WorkerProfile } from '../types';

export interface MatchResult {
  score: number;
  geoScore: number;
  skillScore: number;
  trustScore: number;
  wageScore: number;
  availScore: number;
  explanation: string;
}

export const calculateWorkerJobMatch = (worker: WorkerProfile, job: JobPosting): MatchResult => {
  const dist = job.distanceKm || 3.5;
  let geoScore = 100;
  if (dist > 3) {
    geoScore = Math.max(0, Math.round(100 - ((dist - 3) / 22) * 100));
  }

  let skillScore = 0;
  const workerProfLower = worker.profession.toLowerCase();
  const jobProfLower = job.profession.toLowerCase();
  if (workerProfLower === jobProfLower) {
    skillScore = 80;
    const matchedSkills = job.skills.filter((s) =>
      worker.skills.some((ws) => ws.toLowerCase().includes(s.toLowerCase()))
    );
    skillScore += Math.min(20, matchedSkills.length * 10);
  } else {
    const hasOverlap = worker.skills.some((ws) =>
      job.skills.some((js) => js.toLowerCase().includes(ws.toLowerCase()))
    );
    skillScore = hasOverlap ? 50 : 20;
  }

  let trustScore = Math.round((worker.rating / 5) * 60);
  if (worker.isVerified) trustScore += 20;
  if (worker.safetyCertified) trustScore += 20;

  const offered = job.employerOfferedSalary.amount;
  const expected = worker.expectedSalary.amount;
  let wageScore = 100;
  if (offered < expected) {
    const diffRatio = (expected - offered) / expected;
    wageScore = Math.max(0, Math.round(100 - diffRatio * 180));
  }

  let availScore = 80;
  if (worker.shiftPreference.includes(job.shift)) {
    availScore = 100;
  }

  const totalScore = Math.min(
    100,
    Math.round(
      geoScore * 0.3 +
      skillScore * 0.25 +
      trustScore * 0.2 +
      wageScore * 0.15 +
      availScore * 0.1
    )
  );

  const explanation = totalScore + '% Match: ' + dist + 'km away • Exact ' + job.profession + ' trade match • ₹' + offered + '/' + job.employerOfferedSalary.period + ' offered';

  return {
    score: totalScore,
    geoScore,
    skillScore,
    trustScore,
    wageScore,
    availScore,
    explanation,
  };
};
