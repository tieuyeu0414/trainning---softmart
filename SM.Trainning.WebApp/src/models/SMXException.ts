enum ExceptionType {
    PostFailed = 1,
    GetFailed = 2,
    BadRequest = 3,
    Unauthorized = 4,
    NotAcceptable = 5,
}

class SMXException {
    public Type?: ExceptionType;
    public Message?: string;

    public static CreateDataInvalidException(message: string = "Dữ liệu không hợp lệ, vui lòng kiểm tra thông tin đã nhập."): SMXException {
        let ex = new SMXException();
        ex.Type = ExceptionType.BadRequest;
        ex.Message = message;

        return ex;
    }

    public static CreateBadRequestException(message: string): SMXException {
        let ex = new SMXException();
        ex.Type = ExceptionType.BadRequest;
        ex.Message = message;

        return ex;
    }
}

export { SMXException, ExceptionType }