import '../common.css'
import { Link } from 'react-router-dom';

function Navbar() {
    return <div>
        <nav className='navbar navbar-expand-md pastel-crimson' data-bs-theme='dark'>
            <div className='container-fluid'>
                <a className='navbar-brand nav-link-white bg=dark' href='#'>
                    FeedFirst
                </a>
                <button className='navbar-toggler border-0' data-bs-toggle='collapse' data-bs-target='#nav-nav'>
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse' id='nav-nav'>
                    <div className='navbar-nav'>
                        <Link to={{ pathname: '/' }} className='nav-link nav-link-white'>Home</Link>
                        <Link to={{ pathname: '/login' }} className='nav-link nav-link-white'>Login</Link>
                        <Link to={{pathname: '/pantries'}} className='nav-link nav-link-white'>Pantries</Link>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle nav-link-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Register As
                            </a>
                            <ul className="dropdown-menu" data-bs-theme='light'>
                                <li><Link to={{ pathname: '/register_user' }} className='dropdown-item'>User</Link></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><Link to={{pathname: '/register_pantry'}} className='dropdown-item'>Pantry Admin</Link></li>
                            </ul>
                        </li>
                    </div>
                </div>
            </div>
        </nav>
    </div>
}

export default Navbar;