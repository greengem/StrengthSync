import PageContainer from '@/components/Layout/PageContainer'
import Heading from '@/components/Layout/Heading'
import HistoryCard from '@/components/History/HistoryCard'

export default function History() {
  return (
    <PageContainer>
        <Heading title='History' />
        <HistoryCard />
        <HistoryCard />
    </PageContainer>
  )
}
