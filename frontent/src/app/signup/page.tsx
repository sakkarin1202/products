import Signup from '@/components/Signup'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Signup',
  description: '',
}

const Page = () => {
  return (
    <div>
      <Signup />
    </div>
  )
}

export default Page