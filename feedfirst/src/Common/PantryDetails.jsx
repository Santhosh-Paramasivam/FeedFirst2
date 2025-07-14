import '../common.css'
import Title from '../Components/Title'
import Subtitle from '../Components/Subtitle'

function PantryDetails() {
    return <div className="light-pink" style={{ height: 'calc(100vh - 56px)' }}>
        <Title title="Pantry Details" />
        <div className="card mx-4 px-4">
            <div className='row'>
                <div className='col-2'>
                    <Subtitle title='ID' />
                </div>
                <div className='col-3'>
                    <Subtitle title='Name' />

                </div>
                <div className='col-7'>
                    <Subtitle title='Address' />

                </div>
            </div>
        </div>
    </div>
}

export default PantryDetails