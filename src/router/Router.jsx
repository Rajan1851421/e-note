import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AllNote from '../AllNote'
import AddNote from '../AddNote'
import Home from '../Home'

function Router() {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path="/allnotes" element={<AllNote/>}/>
            <Route path='/addnote' element={<AddNote/>}/>
        </Routes>
    </div>
  )
}

export default Router