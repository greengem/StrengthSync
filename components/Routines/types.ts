export interface ExerciseDetail {
    exercise: {
      id: string;
      name: string;
    };
    sets: number;
    reps: number;
    duration: number;
    order: number;
  }
  
  export interface Routine {
    id: string;
    name: string;
    exercises: ExerciseDetail[];
    createdAt: string;
    updatedAt: string;
  }
  