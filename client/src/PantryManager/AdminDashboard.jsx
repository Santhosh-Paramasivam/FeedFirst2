import '../common.css'
import { useState } from 'react'
import ViewInventory from './DashboardPages/ViewInventory'
import UpdateItems from './DashboardPages/UpdateItems'
import VerifyUsers from './DashboardPages/VerifyUsers'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function AdminDashboard() {
    const [page, setPage] = useState('view-inventory')
    const navigate = useNavigate()

    function pageClicked(curr) {
        if(curr == page) return ' clicked'
        else return ' '
    } 

    function logOut() {
        axios.post(`${import.meta.env.VITE_SERVER_URL}log_out`, {}, {
            headers: {
                "Content-Type":"application/json",
                "Authorization": `Bearer ${localStorage.getItem('access_token')}`
            }
        })
        .catch((e) => console.log(e))
        .then((response) => {
            console.log(response)
            localStorage.setItem('access_token', '')
            navigate('/')            
        })
    }

    return <div className="light-pink">
        <div className='d-flex flex-row'>
            <div className='d-flex flex-column full-height' style={{ width: '200px' }}>
                <div className='btn-group-vertical'>
                    <button className={'btn rounded-0 light-pink-menu-button' + pageClicked('view-inventory')} onClick={() => { setPage('view-inventory') }}>View Inventory</button>
                    <button className={'btn rounded-0 light-pink-menu-button' + pageClicked('update-items')} onClick={() => { setPage('update-items') }}>Update Items</button>
                    <button className={'btn rounded-0 light-pink-menu-button' + pageClicked('verify-users')} onClick={() => { setPage('verify-users') }}>Verify Users</button>
                    <button className={'btn rounded-0 light-pink-menu-button' + pageClicked('deliver-food')} onClick={() => { setPage('deliver-food') }}>Deliver Food</button>
                </div>
                <div className='flex-grow-1'></div>
                <button className='btn rounded-0 py-2 light-pink-menu-button' onClick={logOut}>Log Out</button>
            </div>
            {page === 'view-inventory' && <ViewInventory/>}
            {page === 'update-items' && <UpdateItems/>}
            {page === 'verify-users' && <VerifyUsers/>}
        </div>
    </div>
}

export default AdminDashboard