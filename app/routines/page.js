import prisma from '@/utils/prisma';
import PageContainer from '@/components/Layout/PageContainer';
import Heading from '@/components/Layout/Heading';
import { Link } from '@nextui-org/link';
import NextLink from 'next/link';
import { Button } from "@nextui-org/button";
import RoutineCard from '@/components/Routines/RoutineCard';

export const revalidate = 0;

async function fetchRoutinesFromDB() {
  return await prisma.workoutPlan.findMany({
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
}

export default async function Routines() {
  const routines = await fetchRoutinesFromDB();

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
  );
}
