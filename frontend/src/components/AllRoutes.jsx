import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Add } from './Add'
import { Edit } from './Edit'
import { Home } from './Home'

export const AllRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/edit/:id' element={<Edit />} />
        <Route path='/add' element={<Add />} />
        
    </Routes>
  )
}
