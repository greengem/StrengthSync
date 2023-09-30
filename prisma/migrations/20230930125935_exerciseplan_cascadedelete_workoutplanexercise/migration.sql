-- DropForeignKey
ALTER TABLE "WorkoutPlanExercise" DROP CONSTRAINT "WorkoutPlanExercise_workoutPlanId_fkey";

-- AddForeignKey
ALTER TABLE "WorkoutPlanExercise" ADD CONSTRAINT "WorkoutPlanExercise_workoutPlanId_fkey" FOREIGN KEY ("workoutPlanId") REFERENCES "WorkoutPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
