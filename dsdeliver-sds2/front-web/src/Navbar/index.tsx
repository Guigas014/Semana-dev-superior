import { Link } from 'react-router-dom';

import { ReactComponent as Logo } from '../Images/logo.svg';

import './styles.css';


function Navbar() {
  return (
    <nav className="main-navbar">
      <Logo />
      <Link className="logo-text" to="/">DS Delivery</Link>
    </nav>
  )
}

export default Navbar;

