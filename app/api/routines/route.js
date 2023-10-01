import prisma from '../../../utils/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const workoutPlans = await prisma.workoutPlan.findMany({
      select: {
        id: true,
        name: true,
        exercises: {
          select: {
            exercise: {
              select: {
                id: true,
                name: true,
              }
            },
            sets: true,
            reps: true,
            duration: true,
            order: true,
          }
        },
        createdAt: true,
        updatedAt: true,
      }
    });

    return NextResponse.json({ data: workoutPlans });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
