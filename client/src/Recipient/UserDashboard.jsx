import '../common.css'
import { useState } from 'react'
import GetVoucher from './GetVoucher'
import VoucherList from './VoucherList'

function UserDashboard() {
    const [page, setPage] = useState('get-voucher')

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
                    <button className={'btn rounded-0 light-pink-menu-button' + pageClicked('get-voucher')} onClick={() => { setPage('get-voucher') }}>Get Voucher</button>
                    <button className={'btn rounded-0 light-pink-menu-button' + pageClicked('voucher-list')} onClick={() => { setPage('voucher-list') }}>Voucher List</button>
                </div>
                <div className='flex-grow-1'></div>
                <button className='btn rounded-0 py-2 light-pink-menu-button' onClick={logOut}>Log Out</button>
            </div>
            { page === 'get-voucher' && <GetVoucher/>}
            { page === 'voucher-list' && <VoucherList/>}
        </div>
    </div>
}

export default UserDashboard