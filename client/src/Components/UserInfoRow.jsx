function UserInfoRow({ label, value }) {
    return <div className="row">
        <div className="col-6">
            <p>{label}</p>
        </div>
        <div className="col-6">
            <p>{value}</p>
        </div>
    </div>
}

export default UserInfoRow