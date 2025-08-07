import '../common.css'
import Subtitle from './Subtitle'

function ItemBatchRow({ name, batch_no, quantity, exp_date, title = false, className }) {
    return <div className={'row ' + className}>
        <div className='col-2'>
            {!title ? <p>{name}</p> : <Subtitle title={name} />}
        </div>
        <div className='col-2'>
            {!title ? <p>{batch_no}</p> : <Subtitle title={batch_no} />}
        </div>
        <div className='col-2'>
            {!title ? <p>{quantity}</p> : <Subtitle title={quantity} />}
        </div>
        <div className='col-4'>
            {!title ? <p>{exp_date}</p> : <Subtitle title={exp_date} />}
        </div>
        <div className='col-2'>
            {!title && <button className="btn dark-blue-button"></button>}
        </div>
    </div>

}

export default ItemBatchRow