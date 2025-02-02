import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
        <ul>
            <li>
                {/* Navigate Without Reloading page */}
                <Link to="/">Home</Link>
            </li>

            <li>
                <Link to="/signup">SignUp</Link>
            </li>
            
            <li>
                <Link to="/login">Login</Link>
            </li>
        </ul>
    </div>
  )
}

export default Navbar