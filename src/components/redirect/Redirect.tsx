"use client"
import LoginPage from '@/app/page'
import { useRouter } from 'next/navigation'
import React from 'react'




const Redirect: React.FC<{to: string}> = ({to}) => {
    const router = useRouter()
    setTimeout(() =>{
        router.push(to)
    },200)
  return (
 <LoginPage/>
  )
}

export default Redirect