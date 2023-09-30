'use client'
import { useSession } from "next-auth/react";
import PageContainer from '@/components/Layout/PageContainer';
import Heading from '@/components/Layout/Heading';
import AvatarBlock from '@/components/Layout/AvatarBlock';
import Dashboard from '@/components/Dashboard/Dashboard';

export default function Profile() {
  const { data: session, status } = useSession();

  let name = "Not Logged in";
  let avatar = "https://picsum.photos/200";
  let workouts = 0;

  if (status === "authenticated") {
    name = session.user.name || "User";
    avatar = session.user.image || avatar;
  }

  return (
    <PageContainer>
      <Heading title='Profile' />
      <AvatarBlock name={name} avatar={avatar} workouts={workouts} />
      <Dashboard />
    </PageContainer>
  );
}
