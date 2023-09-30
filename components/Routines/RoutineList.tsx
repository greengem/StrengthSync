import React from 'react';
import RoutineCard from './RoutineCard';
import { Routine } from './types';

interface RoutineListProps {
  routines: Routine[];
  onDelete: (routineId: string) => void;
}

const RoutineList: React.FC<RoutineListProps> = ({ routines, onDelete }) => {
  return (
    <div>
      {routines.map((routine) => (
        <RoutineCard key={routine.id} routine={routine} onDelete={onDelete} />
      ))}
    </div>
  );
}

export default RoutineList;
