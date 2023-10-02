import prisma from '../../../../utils/prisma';

export async function POST(request) {
  const rawData = await request.text();
  const data = JSON.parse(rawData);

  const userId = "cln4dplo80000gwz1joipss3e"; // Use the specific user ID
  const { routineName, exercises, notes } = data;


  try {
    const newWorkoutPlan = await prisma.workoutPlan.create({
      data: {
        name: routineName,
        notes: notes,
        userId: userId,
        exercises: {
          create: exercises.map((exercise, index) => ({
            exerciseId: exercise.id,
            sets: exercise.sets,
            reps: exercise.reps,
            duration: exercise.duration,
            order: index + 1,
          })),
        },
      },
    });

    return new Response(JSON.stringify({ success: true, id: newWorkoutPlan.id }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
