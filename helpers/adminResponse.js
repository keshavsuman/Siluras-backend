function AdminResponse(res){
    const _this = this;
    this.status = function(status){
        res.status(status);
        return _this;
    }
    this.json = function(data){
        res.json({status:res.statusCode,...data});
    }
    this.error = function(error){
        res.status(500).json({
            status:500,
            message: error.message,
            data: null
        });
    }
    return this;
}


module.exports = AdminResponse;