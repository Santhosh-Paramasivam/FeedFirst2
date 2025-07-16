import '../common.css'

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
                        <a className='nav-link nav-link-white' href='#'>Home</a>
                        <a className='nav-link nav-link-white' href='#'>Login</a>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle nav-link-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Register As
                            </a>
                            <ul class="dropdown-menu" data-bs-theme='light'>
                                <li><a class="dropdown-item" href="#">Recipient</a></li>
                                <li><hr class="dropdown-divider" /></li>
                                <li><a class="dropdown-item " href="#">Pantry Manager</a></li>
                            </ul>
                        </li>
                    </div>
                </div>
            </div>
        </nav>
    </div>
}

export default Navbar;