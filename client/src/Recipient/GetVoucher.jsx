import '../common.css'
import VoucherInputRow from '../Components/VoucherInputRow'

function GetVoucher() {
    return <div className='full-height w-100' style={{ backgroundColor: 'white' }}>
        <div className='card mx-3 mt-3 pt-2 px-2'>
            <div className='card-body'>
                <VoucherInputRow/>
                <VoucherInputRow/>
                <VoucherInputRow/>
                <VoucherInputRow/>
                <VoucherInputRow/>
                <VoucherInputRow/>
                <VoucherInputRow/>
                <VoucherInputRow/>
            </div>
            <div className='d-flex flex-row justify-content-end mx-3'>
                <button className='dark-blue-button btn mb-3' style={{height: '40px'}}>Apply</button>
            </div>
        </div>
    </div>
}

export default GetVoucher