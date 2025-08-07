export function checkPresent(obj, arr, res) {
    for(let val of arr) {
        if(!(val in obj)) {
            res.status(400).send({'Bad Request':`Missing field ${val}`})
            return false
        }
    }

    return true
}
