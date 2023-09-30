'use client'
import PageContainer from '@/components/Layout/PageContainer'
import Heading from '@/components/Layout/Heading'
import React, { useState, useEffect } from 'react';
import { Link } from '@nextui-org/link';
import NextLink from 'next/link';
import { Button } from "@nextui-org/button";
import RoutineList from '@/components/Routines/RoutineList';
import { Spinner } from "@nextui-org/spinner";
import { Routine } from '@/components/Routines/types';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";

export default function RoutinesPage() {
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [loading, setLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure(); // Modal state
  const [selectedRoutineId, setSelectedRoutineId] = useState<string | null>(null); // Selected routine ID for deletion

  const handleDelete = async () => {
    if (!selectedRoutineId) return;
    try {
      const response = await fetch(`/api/routines/delete/${selectedRoutineId}`, { method: 'DELETE' });

      if (response.ok) {
        const updatedRoutines = routines.filter(routine => routine.id !== selectedRoutineId);
        setRoutines(updatedRoutines);
        onClose(); // Close the modal after deletion
      } else {
        console.error("Failed to delete routine.");
      }
    } catch (error) {
      console.error("There was an error deleting the routine:", error);
    }
  };

  const promptDelete = (routineId: string) => {
    setSelectedRoutineId(routineId);
    onOpen();
  };

  const getData = async () => {
    await fetch('/api/routines')
      .then(res => res.json())
      .then(data => {
        setRoutines(data.data);
      })
      .catch(err => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <PageContainer>
      <Heading title='Routines' />
      <Link as={NextLink} href='/routines/new' className='mb-5'>
        <Button color='primary'>New Routine</Button>
      </Link>
      {loading ? (
        <div className='pt-20 text-center'>
          <Spinner color="primary" />
        </div>
      ) : routines.length > 0 ? (
        <RoutineList routines={routines} onDelete={promptDelete} />
      ) : (
        <p>No data available</p>
      )}

      <Modal isOpen={isOpen} onOpenChange={onClose}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Delete Confirmation</ModalHeader>
          <ModalBody>
            <p>
              Are you sure you want to delete this routine? This action cannot be undone.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Cancel
            </Button>
            <Button color="primary" onPress={handleDelete}>
              Confirm Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </PageContainer>
  )
}
