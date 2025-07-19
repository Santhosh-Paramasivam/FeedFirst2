import '../common.css'

function Subtitle({title, className}) {
    return <div className="container mx-0 px-0 py-0 dark-blue-text">
            <h5 className={"px-0 pt-2 " + className}>{title}</h5>
        </div>
}

export default Subtitle