import PageContainer from '@/components/Layout/PageContainer'
import Heading from '@/components/Layout/Heading'
import AvatarBlock from '@/components/Layout/AvatarBlock'
import Dashboard from '@/components/Dashboard/Dashboard'

export default function Profile() {
  return (
    <PageContainer>
      <Heading title='Profile' />
      <AvatarBlock name="John Doe" avatar="https://github.com/shadcn.png" workouts={5} />
      <Dashboard />
    </PageContainer>
  )
}