import Signin from '@/components/Signin'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Signin',
  description: '',
}

const Page = () => {
  return (
    <div>
      <Signin />
    </div>
  )
}

export default Page