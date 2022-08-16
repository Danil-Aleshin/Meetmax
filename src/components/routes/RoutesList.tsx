import { FC } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RequireAuth from '../hoc/RequireAuth'
import { routes } from './List'


const RoutesList:FC = () => {
  return (
      <Routes>
      {
        routes.map(route =>
          <Route 
            path={route.path} 
            key={route.path} 
            element={route.auth
              ? <RequireAuth><route.component/></RequireAuth> 
              : <route.component/>
            }
          />
        )
      }
      {/* <Route path='*' element={<NotFoundPage/>}/> */}
      </Routes>
  )
}

export default RoutesList