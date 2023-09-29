'use client'
import { useSession } from "next-auth/react";
import PageContainer from '@/components/Layout/PageContainer';
import Heading from '@/components/Layout/Heading';
import AvatarBlock from '@/components/Layout/AvatarBlock';
import Dashboard from '@/components/Dashboard/Dashboard';
import Link from 'next/link';

export default function Profile() {
  const { data: session, status } = useSession();

  let name = "Not Logged in";
  let avatar = "https://picsum.photos/200";
  let workouts = 5; // Or any other default value you'd like

  if (status === "authenticated") {
    name = session.user.name || "User";
    avatar = session.user.image || avatar;
    // You can also update the workouts value based on the session data if it's available
  }

  return (
    <PageContainer>
      <Heading title='Profile' />
      <AvatarBlock name={name} avatar={avatar} workouts={workouts} />
      <Dashboard />
    </PageContainer>
  );
}
