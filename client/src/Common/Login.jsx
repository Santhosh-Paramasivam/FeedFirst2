import '../common.css'

function Login() {
    return <div className='light-pink' style={{ height: 'calc(100vh - 56px)' }}>
        <div className='grid h-100'>
            <div className='row mx-0 h-100'>
                <div className='col-sm-12 col-md-12 col-lg-6 d-flex flex-column justify-content-center align-items-center'>
                    <div className='card mx-3 px-4 py-4 border-0 dark-blue-text' style={{ height: '250px', width: '500px' }}>
                        <h3 className='card-title'>Login as User</h3>
                        <div className='card-body'>
                            <input className='form-control rounded-1 border-1 mb-2' placeholder='Email'></input>
                            <input className='form-control rounded-1 border-1' placeholder='Password'></input>
                            <button className='btn dark-blue-button mt-3'>
                                Login
                            </button>
                        </div>
                    </div>
                </div>
                <div className='col-sm-12 col-md-12 col-lg-6 d-flex flex-column justify-content-center align-items-center'>
                    <div className='card mx-3 px-4 py-4 border-0 dark-blue-text' style={{height: '250px', width: '500px'}}>
                        <h3 className='card-title'>Login as Admin</h3>
                        <div className='card-body'>
                            <input className='form-control rounded-1 border-1 mb-2' placeholder='Email'></input>
                            <input className='form-control rounded-1 border-1' placeholder='Password'></input>
                            <button className='btn dark-blue-button mt-3'>
                                Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default Login