
const rate = async(req, res) => {

    try {
        res.send("rate")
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    rate
}