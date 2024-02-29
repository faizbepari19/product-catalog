class ApiResponse {
    constructor(success, message = null, data = null, error = null) {
        this.success = success;
        this.message = message || undefined;
        this.data = data || undefined;
        this.error = error || undefined;
    }

    static success(data = null, message = null) {
        return new ApiResponse(true, message, data);
    }

    static error(err_message) {
        return new ApiResponse(false, null, null, { message: err_message });
    }
}

module.exports = ApiResponse;