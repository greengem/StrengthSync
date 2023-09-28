import PageContainer from '@/components/Layout/PageContainer'
import Heading from '@/components/Layout/Heading'
import AvatarBlock from '@/components/Layout/AvatarBlock'
import Dashboard from '@/components/Dashboard/Dashboard'
import Link from 'next/link'

export default function Profile() {
  return (
    <PageContainer>
      <Heading title='Profile' />
      <Link href='/api/auth/signin'>Sign in</Link>
      <Link href='/api/auth/signout'>Sign Out</Link>
      
      <AvatarBlock name="Not Logged in" avatar="https://picsum.photos/200" workouts={5} />
      <Dashboard />
    </PageContainer>
  )
}