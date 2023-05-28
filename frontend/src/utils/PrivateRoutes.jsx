import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = () => {
  const token = localStorage.getItem('token')

  const isTokenValid = !!token


  return isTokenValid ? <Outlet/> : <Navigate to="/"/>
}

export default PrivateRoutes
