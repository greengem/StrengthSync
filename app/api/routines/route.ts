import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

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
                // Add any other fields you want here
              }
            },
            sets: true,
            reps: true,
            duration: true,
            order: true,
            // Add any other fields you want here
          }
        },
        createdAt: true,
        updatedAt: true,
        // Add any other fields you want here
      }
    });

    return NextResponse.json({ data: workoutPlans });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
