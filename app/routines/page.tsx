'use client'
import PageContainer from '@/components/Layout/PageContainer'
import Heading from '@/components/Layout/Heading'
import React, { useState, useEffect } from 'react';
import { Link } from '@nextui-org/link';
import NextLink from 'next/link';

interface Routine {
  id: string;
  name: string;
}

export default function RoutinesPage() {
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    await fetch('/api/routines')
    .then(res => res.json())
    .then(data => {
      setRoutines(data.data.rows);
      console.log(data.data.rows);
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
      <Link as={NextLink} color='danger' href='/routines/new'>New Routine</Link>
      {
        loading ?
          <div className='pt-20 text-center'>
            <span className="loading loading-infinity loading-lg text-primary"></span>
          </div>
        :
          <div>
            {
              routines.length > 0 ?
              <ul>
                {
                  routines.map((routine) => (
                    <li key={routine.id} className='bg-gray-200 flex justify-between items-center px-4 py-2 my-1 rounded-md'>
                      <div>
                        <p className='font-semibold mb-1'>
                          {routine.name}
                        </p>
                      </div>
                      <button className="btn btn-primary">+</button>
                    </li>
                  ))
                }
              </ul>
              :
              <p>
                No data available
              </p>
            }
            <div className="mt-10 text-xs ">
              data received from Vercel Postgres
            </div>
          </div>
      }
    </PageContainer>
  )
}
