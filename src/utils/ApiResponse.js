class ApiResponse{
    constructor(statusCode, data, message = "Success"){
        this.statusCode = statusCode
        this.tata = data
        this.message = message
        this.success = statusCode < 400
    }
} 