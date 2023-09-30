import React, { useState, useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure } from "@nextui-org/react";

export default function RoutineModal({ onAddExercises }) {
  const [localSelectedExercises, setLocalSelectedExercises] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  async function fetchExercises() {
    try {
      const response = await fetch('/api/exercises'); 
      const data = await response.json();
      if (data && data.data) {
        setExercises(data.data.rows || []);
      }
    } catch (error) {
      console.error("Failed to fetch exercises:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchExercises();
  }, []);

  function handleExerciseSelection(exercise) {
    setLocalSelectedExercises(prev => ([...prev, exercise]));
  }

  function handleSubmit() {
    console.log("Sending exercises:", localSelectedExercises);
    onAddExercises(localSelectedExercises);
    setLocalSelectedExercises([]);
  }

  return (
    <>
      <Button className="mr-3" onPress={onOpen}>Add Exercise</Button>
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Select Exercise</ModalHeader>
              <ModalBody>
                <ul>
                  {loading ? (
                    <li>Loading...</li>
                  ) : (
                    exercises.map(exercise => (
                      <li 
                        key={exercise.id} 
                        className={localSelectedExercises.includes(exercise) ? 'bg-blue-200' : ''}
                        onClick={() => handleExerciseSelection(exercise)}
                      >
                        {exercise.name}
                      </li>
                    ))
                  )}
                </ul>
                <Button onPress={handleSubmit}>Add Selected</Button>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
