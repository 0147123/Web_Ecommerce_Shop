import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Route } from 'react-router-dom'

const ProdectedRoutes = ({ component: Component, ...rest }) => {
  const auth = useSelector((state) => state.auth)
  const { token } = auth
  return (
    <Route
      {...rest}
      render={() =>
        token ? <Component/> : <Navigate to="/login" />
      }
    />
  )
}

export default ProdectedRoutes