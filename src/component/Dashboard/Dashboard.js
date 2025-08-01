import React from 'react'
import SideBar from './SideBar'
import { Outlet } from 'react-router-dom'

export default function Dashboard() {
  return (
    <div className='flex'>
      
      <div className='w-[20%]'><SideBar/></div>
      <div className='w-[80%] h-[100vh]'><Outlet/></div>
    </div>
  )
}
