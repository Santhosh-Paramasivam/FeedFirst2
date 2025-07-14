import '../common.css'

function Register() {
    return <div className="light-pink" style={{ height: 'calc(100vh - 56px)' }}>
        <div className="container mx-0 dark-blue-text">
            <h3 className="mx-0 py-3 px-2">User Registration</h3>
        </div>
        <div className="card mx-4 px-4">
            <input className="form-control mt-4" placeholder="Name"></input>
            <input className="form-control mt-3" placeholder="Phone number"></input>
            <textarea className="form-control mt-3" placeholder="Address"></textarea>
            <input className="form-control mt-3" placeholder="Household size"></input>
            <textarea className="form-control mt-3" placeholder="Families' special dietary needs"></textarea>
            <input className="form-control mt-3" placeholder="Ration card number"></input>
            <input className="form-control mt-3" placeholder="Chosen pantry's ID"></input>
            <input className="form-control mt-3" placeholder="Email ID"></input>
            <input className="form-control mt-3" placeholder="Password"></input>
            <input className="form-control mt-3 mb-3" placeholder="Repeat password"></input>
        
            <button className='btn dark-blue-button mb-3'>Sign Up</button>
        </div>
    </div>
}

export default Register