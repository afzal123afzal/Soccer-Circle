import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ErrorPage from '../pages/Players/ErrorPage'


const ErrorRoutes = () => {
  return (
    <div>
        <BrowserRouter>
        <Routes>
        <Route
              path={"*"}
              element={<ErrorPage/>}
            />
        </Routes>
        </BrowserRouter>
    </div>
  )
}

export default ErrorRoutes