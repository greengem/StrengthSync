'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation'
import PageContainer from '@/components/Layout/PageContainer';
import Heading from '@/components/Layout/Heading';
import RoutineModal from '@/components/Routines/RoutineModal';

import { Input, Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import {  Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell} from "@nextui-org/table";

const exerciseColumns = [
    { key: "name", label: "Exercise Name" },
    { key: "sets", label: "Sets" },
    { key: "reps", label: "Reps" },
    { key: "duration", label: "Duration (seconds)" }
  ];

  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

export default function RoutineNew() {
    const [selectedExercises, setSelectedExercises] = useState([]);
    const [routineName, setRoutineName] = useState('');
    const [notes, setNotes] = useState('');
    const router = useRouter();

    function addExercises(newExercises) {
        const formattedExercises = newExercises.map(exercise => ({
            id: exercise.id,
            name: exercise.name,
        }));
        setSelectedExercises(prevExercises => [...prevExercises, ...formattedExercises]);
    }
    async function saveRoutine() {
        try {
            const response = await fetch('/api/routines/save', {
                method: 'POST',
                cache: 'no-store',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ routineName, exercises: selectedExercises, notes })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Failed to save routine. Server responded with ${response.status}: ${errorData.error || 'Unknown Error'}`);
            }

            const data = await response.json();

            if (data.success) {
                router.push('/routines');
            } else {
                alert('Error saving routine: ' + (data.message || 'Unknown error'));
            }
        } catch (error) {
            alert('Error saving routine: ' + error.message);
        }
    }

    return (
        <PageContainer>
            <Heading title='New Routine' />
            <Input
                isRequired
                type="text"
                label="Routine Name"
                className='mb-5'
                value={routineName}
                onChange={e => setRoutineName(e.target.value)}
            />
            <Textarea
                placeholder="Enter Notes"
                className='mb-5'
                value={notes}
                onChange={e => setNotes(e.target.value)}
            />
            <Table aria-label="Exercise table" className='mb-10'>
                <TableHeader columns={exerciseColumns}>
                    {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                </TableHeader>
                <TableBody items={selectedExercises} emptyContent={"Add some exercises."}>
                    {(exercise) => (
                        <TableRow key={exercise.id}>
                            {(columnKey) => (
                                <TableCell>
                                    {columnKey === "name" ? exercise.name :
                                        <Input
                                            type="number"
                                            placeholder={capitalize(columnKey)}
                                            value={exercise[columnKey]}
                                            onChange={(value) => {
                                                const numericValue = parseInt(event.target.value, 10);
                                                const updatedExercises = [...selectedExercises];
                                                const index = selectedExercises.findIndex(ex => ex.id === exercise.id);
                                                updatedExercises[index][columnKey] = isNaN(numericValue) ? 0 : numericValue;
                                                setSelectedExercises(updatedExercises);
                                            }}
                                        />
                                    }
                                </TableCell>
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <RoutineModal onAddExercises={addExercises} />
            <Button color='danger' onClick={saveRoutine}>Save Routine</Button>
        </PageContainer>
    )
}