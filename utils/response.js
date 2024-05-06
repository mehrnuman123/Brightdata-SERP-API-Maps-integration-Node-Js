var status = require("http-status")

const APIresponse = (res, successMsg, successData) => {
    let responseJson = {
        success: true,
        message: successMsg,
        data: successData ?? null
    }

    return res.status(status.OK).json(responseJson)
}

module.exports = { APIresponse }