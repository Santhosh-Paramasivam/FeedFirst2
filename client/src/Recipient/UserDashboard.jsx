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

    return <div className="light-pink">
        <div className='d-flex flex-row'>
            <div className='d-flex flex-column full-height' style={{ width: '200px' }}>
                <div className='btn-group-vertical'>
                    <button className={'btn rounded-0 light-pink-menu-button' + pageClicked('get-voucher')} onClick={() => { setPage('get-voucher') }}>Get Voucher</button>
                    <button className={'btn rounded-0 light-pink-menu-button' + pageClicked('voucher-list')} onClick={() => { setPage('voucher-list') }}>Voucher List</button>
                </div>
                <div className='flex-grow-1'></div>
                <button className='btn rounded-0 py-2 light-pink-menu-button'>Log Out</button>
            </div>
            { page === 'get-voucher' && <GetVoucher/>}
            { page === 'voucher-list' && <VoucherList/>}
        </div>
    </div>
}

export default UserDashboard