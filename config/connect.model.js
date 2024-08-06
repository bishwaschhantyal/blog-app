const {connect} = require("mongoose");

const connectMongoDB = (url) => {
    return connect(url)
}

module.exports = {connectMongoDB}