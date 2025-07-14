function Navbar() {
    return <div>
        <nav className='navbar navbar-expand-md pastel-crimson'>
            <div className='container-fluid'>
                <a className='navbar-brand' href='#' style={{ color: 'white' }}>
                    FeedFirst
                </a>
                <button className='navbar-toggler' data-bs-toggle='collapse' data-bs-target='#nav-nav'>
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse' id='nav-nav'>
                    <div className='navbar-nav'>
                        <a className='nav-link'>Home</a>
                        <a className='nav-link'>Login</a>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Register As
                            </a>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="#">Recipient</a></li>
                                <li><hr class="dropdown-divider" /></li>
                                <li><a class="dropdown-item" href="#">Pantry Manager</a></li>
                            </ul>
                        </li>
                    </div>
                </div>
            </div>
        </nav>
    </div>
}

export default Navbar;