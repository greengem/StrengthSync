import { getSession } from 'next-auth/react';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req, res) {
    // Get user session
    const session = await getSession({ req });

    if (!session) {
        return res.status(401).json({ success: false, message: "Not authenticated" });
    }

    const { routineName, exercises } = req.body;

    try {
        // Create a new WorkoutPlan
        const newWorkoutPlan = await prisma.workoutPlan.create({
            data: {
                name: routineName,
                userId: session.user.id, // Use the user's ID from the session
                exercises: {
                    create: exercises.map((exercise, index) => ({
                        exerciseId: exercise.id,
                        sets: exercise.sets,
                        reps: exercise.reps,
                        duration: exercise.duration,
                        order: index + 1
                    }))
                }
            }
        });

        res.status(200).json({ success: true, id: newWorkoutPlan.id });
    } catch (error) {
        console.error("Failed to insert routine:", error);
        res.status(500).json({ success: false, error: error.message });
    }
}
