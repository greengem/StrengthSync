'use client'
import { useState } from 'react';
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

    function addExercises(newExercises) {
        console.log("Received exercises:", newExercises);
        const formattedExercises = newExercises.map(exercise => ({
            id: exercise.id,
            name: exercise.name,
            sets: 3,
            reps: 3,
            duration: 3
        }));
        setSelectedExercises(prevExercises => [...prevExercises, ...formattedExercises]);
    }
    async function saveRoutine() {
        const payload = {
            routineName,
            exercises: selectedExercises,
            notes
        };
        console.log("Payload being sent to the API:", payload);

        try {
            const response = await fetch('/api/routines/save-routine', {
                method: 'POST',
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
                alert('Routine saved successfully!');
                // Optionally, redirect the user or clear the form
            } else {
                alert('Error saving routine: ' + (data.message || 'Unknown error'));
            }
        } catch (error) {
            console.error('Error saving routine:', error); 
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
            // Parsing the value from string to integer
            const numericValue = parseInt(value, 10);
            
            // Making a copy of the existing exercises array
            const updatedExercises = [...selectedExercises];
            
            // Finding the index of the exercise to update
            const index = selectedExercises.findIndex(ex => ex.id === exercise.id);
            
            // Updating the value (if parsed value is NaN, set it to 0)
            updatedExercises[index][columnKey] = isNaN(numericValue) ? 0 : numericValue;
            
            // Setting the new state value
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