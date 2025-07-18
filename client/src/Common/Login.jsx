import '../common.css'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login() {
    let navigate = useNavigate('')

    const [userEmail, setUserEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [adminEmail, setAdminEmail] = useState('')
    const [adminPassword, setAdminPassword] = useState('')

    function userLogin() {
        if (!userEmail.trim() || !userPassword.trim()) {
            alert('Email and password cannot be empty')
            return
        }
        if (userEmail.length < 8 || userPassword.length < 8) {
            alert('Email and password have to be 8 characters or longer')
            return
        }

        axios.post(`${import.meta.env.VITE_SERVER_URL}login`, {
            "email_ID": userEmail,
            "password": userPassword,
            "role": "user"
        }, {
            headers: { "Content-Type": "application/json" }
        })
            .catch((e) => console.log(e))
            .then((response) => {
                console.log(response)
                localStorage.setItem('role', response.data.role)
                localStorage.setItem('access_token', response.data.access_token)

                navigate({pathname: '/user_dashboard'})
            })
    }

    function adminLogin() {
        if (!adminEmail.trim() || !adminPassword.trim()) {
            alert('Email and password cannot be empty')
            return
        }
        if (adminEmail.length < 8 || adminPassword.length < 8) {
            alert('Email and password have to be 8 characters or longer')
            return
        }

        axios.post(`${import.meta.env.VITE_SERVER_URL}login`, {
            "email_ID": adminEmail,
            "password": adminPassword,
            "role": "admin"
        }, {
            headers: { "Content-Type": "application/json" }
        })
            .catch((e) => {
                console.log(e)
                alert('Invalid credentials')
                return
            })
            .then((response) => {
                console.log(response)
                localStorage.setItem('role', response.data.role)
                localStorage.setItem('access_token', response.data.access_token)

                navigate({pathname: '/admin_dashboard'})
            })
    }

    return <div className='light-pink full-height'>
        <div className='d-flex flex-row justify-content-center align-items-center pt-5 mb-5'>
            <img src='static/food-pantry.png' style={{ width: '120px' }}></img>
            <div className='d-flex flex-column mx-3'>
                <h3 className='dark-blue-text my-1'>FeedFirst</h3>
                <h5 className='italic dark-blue-text'>By Santhosh.P</h5>
            </div>
        </div>

        <div className='grid pt-4'>
            <div className='row mx-0 h-100'>
                <div className='col-sm-12 col-md-12 col-lg-6 d-flex flex-column justify-content-center align-items-center'>
                    <div className='card mx-3 px-4 py-4 border-0 dark-blue-text' style={{ height: '250px', width: '500px' }}>
                        <h3 className='card-title'>Login as User</h3>
                        <div className='card-body'>
                            <input className='form-control rounded-1 border-1 mb-2' placeholder='Email' value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
                            <input className='form-control rounded-1 border-1' placeholder='Password' type='password' value={userPassword} onChange={(e) => setUserPassword(e.target.value)} />
                            <button className='btn dark-blue-button mt-3' onClick={userLogin}>
                                Login
                            </button>
                        </div>
                    </div>
                </div>
                <div className='col-sm-12 col-md-12 col-lg-6 d-flex flex-column my-4 justify-content-center align-items-center'>
                    <div className='card mx-3 px-4 py-4 border-0 dark-blue-text' style={{ height: '250px', width: '500px' }}>
                        <h3 className='card-title'>Login as Admin</h3>
                        <div className='card-body'>
                            <input className='form-control rounded-1 border-1 mb-2' placeholder='Email' value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} />
                            <input className='form-control rounded-1 border-1' placeholder='Password' type='password' value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} />
                            <button className='btn dark-blue-button mt-3' onClick={adminLogin}>
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