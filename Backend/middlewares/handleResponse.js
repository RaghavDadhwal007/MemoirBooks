const responseMessage = require("../helpers/responseMessages");// for static response message
let respObject = {
    success: false,
};
module.exports.RESPONSE = async(req, res) => {
    try {

        // return error or success response
        if (req.newRespData) {
            if(req.newRespData.typeStatus){
                return res.json(req.newRespData)
            }
            if (req.newRespData.success) {
                res.status(200).json(req.newRespData);
            } else {
                res.status(400).json(req.newRespData);
            }
        
        }
    } catch (error) {
        // throw exception message
        respObject["message"] = responseMessage["SOMETHING_WRONG"];
        res.status(400).json(respObject);
    }
};
