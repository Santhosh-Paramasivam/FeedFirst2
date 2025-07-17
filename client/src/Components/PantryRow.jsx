function PantryRow({ id, name, number, address }) {
    return <div className='row'>
        <div className='col-2'>
            <p>{id}</p>
        </div>
        <div className='col-3'>
            <p>{name}</p>
        </div>
        <div className='col-2'>
            <p>{number}</p>
        </div>
        <div className='col-5'>
            <p>{address}</p>
        </div>
    </div>

}

export default PantryRow