import { useRoutes, BrowserRouter } from 'react-router-dom'
import Home from '../Home/Home'
import MyAccount from '../MyAccount/MyAccount'
import NotFound from '../NotFound/NotFound'
import SignIn from '../SignIn/SignIn'
import './App.css'

const AppRoutes = () => {
  let routes = useRoutes([
    { path: '/', element: <Home /> },
    { path: '/my-account', element: <MyAccount /> },
    { path: '/sign-in', element: <SignIn /> },
    { path: '*', element: <NotFound /> },
  ])

  return routes
}

const App = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
