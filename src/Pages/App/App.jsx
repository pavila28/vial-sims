import Home from '../Home/Home'
import MyAccount from '../MyAccount/MyAccount'
import NotFound from '../NotFound/NotFound'
import SignIn from '../SignIn/SignIn'
import './App.css'

function App() {
  return (
    <div className='bg-red-100'>
      <Home />
      <MyAccount />
      <SignIn />
      <NotFound />
    </div>
  )
}

export default App
