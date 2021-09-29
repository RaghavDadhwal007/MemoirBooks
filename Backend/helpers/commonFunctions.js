module.exports = {

  // common response for api`s
  setResponseObject: async (req, success, message, data) => {
    let resp = {}
    if(success.status===false){
      resp = {
        success: false,
        typeStatus:1
      };
    }else{
      resp = {
        success: success,
      };
    }
    
    if (message) {
      resp["message"] = message;
    }
    if (data) {
      resp["data"] = data;
    }
    req.newRespData = await resp;
    return;
  },

  // get day month year for date object
  getDateFromObj: async (date) => {
    var date = new Date(date);
    var day = date.getDate(); //Date of the month: 2 in our example
    var month = date.getMonth(); //Month of the Year: 0-based index, so 1 in our example
    var year = date.getFullYear()
    return day + "/" + month + "/" + year
  }
};
