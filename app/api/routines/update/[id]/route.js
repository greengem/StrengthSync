import { prisma } from '@/utils/prisma';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'POST') {
    const data = req.body;
    const updatedWorkoutPlan = await prisma.workoutPlan.update({
      where: { id },
      data,
      include: { exercises: true }
    });
    return res.json(updatedWorkoutPlan);
  }
}
