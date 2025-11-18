import React from 'react'
import connectDB from '@/lib/mongodb'


connectDB();

const HomePage = () => {
  return (
    <div><h1>Hello world!</h1></div>
  )
}

export default HomePage