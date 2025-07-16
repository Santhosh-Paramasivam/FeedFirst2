import '../common.css'
import Subtitle from '../Components/Subtitle'

function VoucherList() {
    return <div className='full-height w-100' style={{ backgroundColor: 'white' }}>
        <div className='card mx-3 mt-3 pt-2 px-3'>
            <div className='row'>
                <div className='col'>
                    <Subtitle title='Voucher ID'/>
                </div>
                <div className='col'>
                    <Subtitle title='Requested Items'/>
                </div>
                <div className='col'>
                    <Subtitle title='Provided Items'/>
                </div>
                <div className='col'>
                    <Subtitle title='Status'/>
                </div>
            </div>
        </div>
    </div>
}

export default VoucherList