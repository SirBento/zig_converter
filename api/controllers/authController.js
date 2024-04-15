
const login = async(req, res) => {

    try {
        res.send("Login")
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    login
}