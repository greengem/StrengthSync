import PageContainer from '@/components/Layout/PageContainer'
import Heading from '@/components/Layout/Heading'
import { Link } from '@nextui-org/link';
import NextLink from 'next/link';
import { Button } from "@nextui-org/button";
import RoutineCard from '@/components/Routines/RoutineCard';

interface ExerciseDetail {
  id: string;
  name: string;
}

interface RoutineExercise {
  exercise: ExerciseDetail;
  sets: number;
  reps: number;
  duration: number;
  order: number;
}

interface Routine {
  id: string;
  name: string;
  exercises: RoutineExercise[];
  createdAt: string;
  updatedAt: string;
}


const API_URL = process.env.NEXTAUTH_URL;

async function getRoutines(): Promise<Routine[]> {
  const res = await fetch(`${API_URL}/api/routines`, { cache: 'no-store' });
  const routines = await res.json();
  return routines.data;
}


export default async function Routines() {
  const routines = await getRoutines()

  return (
    <PageContainer>
      <Heading title='Routines' />
      <Link as={NextLink} href='/routines/new' className='mb-5'>
        <Button color='primary'>New Routine</Button>
      </Link>
    <ul>
      {routines.map((routine) => (
        <RoutineCard 
          key={routine.id} 
          routine={routine}
        />
      ))}
    </ul>
    </PageContainer>
  )
}