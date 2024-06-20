import { NavLink } from 'react-router-dom'

const Navbar = () => {
  const activeStyle = 'underline underline-offset-4'

  return (
    <nav className='flex justify-between items-center fixed z-10 top-0 w-full py-5 px-8 text-sm font-light'>
        <ul className='flex items-center gap-3'>
            <li className='font-semibold text-lg'>
                <NavLink 
                    to='/'
                >
                    Vial SIMs
                </NavLink>
            </li>
            <li>
                <NavLink 
                    to='/'
                    className={({ isActive }) => isActive ? activeStyle : undefined}
                >
                    All
                </NavLink>
            </li>
        </ul>

        <ul className='flex items-center gap-3'>
            <li>
                <NavLink 
                    to='/my-account'
                    className={({ isActive }) => isActive ? activeStyle : undefined}
                >
                    MyAccount
                </NavLink>
            </li>
            <li>
                <NavLink 
                    to='/sign-in'
                    className={({ isActive }) => isActive ? activeStyle : undefined}
                >
                    SignIn
                </NavLink>
            </li>
        </ul>
    </nav>
  )
}

export default Navbar
