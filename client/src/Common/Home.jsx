import '../common.css'
import Title from '../Components/Title'

function Home() {
    return <div className='d-flex flex-column justify-content-center align-items-center light-pink w-100 mb-4'>
        <div className='d-flex flex-row justify-content-center align-items-center mt-5 mb-4'>
            <img src='static/food-pantry.png' style={{ width: '120px' }}></img>
            <div className='d-flex flex-column mx-3'>
                <h3 className='dark-blue-text my-1'>FeedFirst</h3>
                <h5 className='italic dark-blue-text'>By Santhosh.P</h5>
            </div>
        </div>

        <div className='d-flex flex-row justify-content-center flex-wrap mt-4'>
            <div className='card px-3 pt-3 mt-4 m-2' style={{ width: '500px' }}>
                <h3 className='card-title'>The Problem</h3>
                <div className='card-body'>
                    <p>
                        In many communities, access to food assistance is <b>inconsistent and difficult to navigate.</b>
                        <br />

                        On the other side, food pantry managers face challenges in maintaining accurate inventory and tracking food voucher requests.
                        <br />

                        The lack of streamlined communication between those concerned often results in,

                        <ol>
                            <li>
                                Food waste
                            </li>
                            <li>
                                Stock shortages
                            </li>
                            <li>
                                And missed opportunities for people to get the help they need.
                            </li>
                        </ol>

                        FeedFirst addresses these challenges by creating a centralized system that simplifies the process for both recipients and pantry managers, ensuring that no one in need is left behind.
                    </p>
                </div>
            </div>


            <div className='card px-3 pt-3 mt-4 m-2' style={{ width: '500px' }}>
                <h3 className='card-title'>The Solution</h3>
                <div className='card-body'>
                    <p>Recepients to
                        <ul>
                            <li>Check for local food pantries</li>
                            <li>Check stock levels for various items</li>
                            <li>Apply for food vouchers</li>
                            <li>Redeem food vouchers for food at the respective pantries</li>
                        </ul>
                        Pantry managers to
                        <ul>
                            <li>View and manage pantry inventory</li>
                            <li>Maintain expiry dates and stock level</li>
                            <li>Register other food pantry voluteers</li>
                            <li>Verify and assign recepients a priority level</li>
                            <li>Store and process food vouchers requests</li>
                        </ul>
                    </p>
                </div>
            </div>
        </div>

        <div className='d-flex flex-row justify-content-center flex-wrap mt-2 mb-4'>
            <div className='card px-3 pt-3 m-2' style={{ width: '500px' }}>
                <h4 className='card-title'>Register as User</h4>
                <div className='card-body'>
                    <p>To request food from nearby food banks and pantries</p>
                    <button className='btn dark-blue-button'>Register</button>
                </div>
            </div>
            <div className='card px-3 pt-3 m-2' style={{ width: '500px' }}>
                <h4 className='card-title'>Register as Admin</h4>
                <div className='card-body'>
                    <p>To register your pantry and provide food to others</p>
                    <button className='btn dark-blue-button'>Register</button>
                </div>
            </div>
        </div>
    </div>
}

export default Home