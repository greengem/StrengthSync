import prisma from '../../../../utils/prisma';

export async function POST(request) {
  // Read the request body as text
  const rawData = await request.text();
  console.log("Raw request body:", rawData);

  // Parse the body data as JSON
  const data = JSON.parse(rawData);

  const userId = "cln4dplo80000gwz1joipss3e"; // Use the specific user ID
  const { routineName, exercises } = data;

  try {
    // Create a new WorkoutPlan associated with the specific user
    const newWorkoutPlan = await prisma.workoutPlan.create({
      data: {
        name: routineName,
        userId: userId, // Use the specific user ID
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
    console.error("Failed to insert routine:", error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
