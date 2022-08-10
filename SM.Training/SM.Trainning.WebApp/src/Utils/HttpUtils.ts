import ErrorHandler from "../components/ErrorHandler";
import { ExceptionType, SMXException } from "../models/SMXException";

export default class HttpUtils {
    public static async post<T>(apiUrl: string, bodyContent: string, includeToken: boolean = true) {
        return HttpUtils.fetch_api<T>(apiUrl, bodyContent, includeToken, "POST");
    }

    public static async get<T>(apiUrl: string, bodyContent: string, includeToken: boolean = true) {
        return HttpUtils.fetch_api<T>(apiUrl, bodyContent, includeToken, "GET");
    }

    private static async fetch_api<T>(
        apiUrl: string,
        bodyContent: string,
        includeToken: boolean,
        actionType: string
    ) {
        ErrorHandler.hanlerCloseError();

        let header = {};
        if (includeToken) {
            header = {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            };
        } else {
            header = {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            };
        }

        var httpStatus!: number;
        let response = await fetch(apiUrl, {
            method: "POST",
            headers: header,
            body: bodyContent,
        })
            .then((res) => {
                httpStatus = res.status;
                return res.json();
            })
            .then((data) => {
                return data;
            })
            .catch((err) => {
                // Không kết nối được server, chuyển status về 404
                httpStatus = 404;

                // Nếu kết nối thất bại thì báo message và show ở client
                //throw "Kết nối máy chủ thất bại, vui lòng kiểm tra internet";
                //let msg = encodeURI("Kết nối máy chủ thất bại, vui lòng kiểm tra internet: " + err);
                // window.location.href = window.location.origin + `/error/${encodeURIComponent(apiUrl)}/${msg}`;
                //alert("Kết nối máy chủ thất bại");

                let ex = new SMXException();
                if (actionType === "POST") {
                    ex.Type = ExceptionType.PostFailed;
                } else {
                    ex.Type = ExceptionType.GetFailed;
                }
                ex.Message = "Kết nối máy chủ thất bại, vui lòng thử lại sau.";
                throw ex;
            });
        if (httpStatus === 200) {
            return response as T;
        } else {
            //console.log(response);
            let ex = new SMXException();
            if (response.StatusCode === 400) {
                // Lỗi nghiệp vụ, trả về trang đang hiển thị
                // throw response.Message;
                ex.Type = ExceptionType.BadRequest;
                ex.Message = response.Message;
            } else if (response.StatusCode === 401) {
                // Lỗi chưa đăng nhập, nhảy về trang login
                window.location.href = window.location.origin + `/login/${btoa(window.location.pathname)}`;

                //ex.Type = ExceptionType.Unauthorized;
            } else {
                // Các lỗi khác, nhảy về trang báo lỗi
                // let msg = encodeURI(response.Message);
                // let errSrc = encodeURIComponent(window.location.href);
                // window.location.href = window.location.origin + `/error/${errSrc}/${msg}`;
                ex.Type = ExceptionType.NotAcceptable;
                ex.Message = response.Message;
            }
            throw ex;
        }
    }

    public static async download(
        apiUrl: string,
        actionCode: string,
        bodyContent: string,
        resultFileName?: string,
        includeToken: boolean = true,
    ) {
        let header = {};
        if (includeToken) {
            header = {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                Flex_Url: window.location.href,
                Flex_ActionCode: actionCode,
                Flex_IsFile: 1,
            };
        } else {
            header = {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                Flex_Url: window.location.href,
                Flex_ActionCode: actionCode,
            };
        }

        let httpStatus!: Number;
        let response = await fetch(apiUrl, {
            method: "POST",
            headers: header,
            body: bodyContent,
        })
            .then((res) => {
                httpStatus = res.status;
                let filename: string;
                const disposition = res.headers.get("content-disposition");

                if (disposition && disposition.indexOf("attachment") !== -1) {
                    var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                    var matches = filenameRegex.exec(disposition);
                    if (matches != null && matches[1]) {
                        filename = matches[1].replace(/['"]/g, "");
                    }
                }

                // Nếu thành công thì tạo blob để tải file
                if (httpStatus === 200) {
                    res.blob().then((blob) => {
                        let url = window.URL.createObjectURL(blob);
                        let a = document.createElement("a");
                        a.href = url;
                        a.download =
                            resultFileName != undefined && resultFileName != "" && resultFileName != null
                                ? resultFileName
                                : filename;
                        a.click();
                    });
                }
                // Nếu không thành công thì trả ra json để lấy message từ server
                else {
                    return res.json();
                }
            })
            .then((data) => {
                //console.log("RESPONSE DATA:");
                //console.log(data);
                return data;
            })
            .catch((err) => {
                let ex = new SMXException();
                ex.Type = ExceptionType.PostFailed;
                ex.Message = "Kết nối máy chủ thất bại, vui lòng thử lại sau.";
                throw ex;
            });

        if (httpStatus !== 200) {
            //console.log(response);
            let ex = new SMXException();
            if (response.StatusCode === 400) {
                // Lỗi nghiệp vụ, trả về trang đang hiển thị
                // throw response.Message;
                ex.Type = ExceptionType.BadRequest;
                ex.Message = response.Message;
            } else if (response.StatusCode === 401) {
                // Lỗi chưa đăng nhập, nhảy về trang login
                window.location.href = window.location.origin + `/login/${btoa(window.location.pathname)}`;

                //ex.Type = ExceptionType.Unauthorized;
            } else {
                // Các lỗi khác, nhảy về trang báo lỗi
                // let msg = encodeURI(response.Message);
                // let errSrc = encodeURIComponent(window.location.href);
                // window.location.href = window.location.origin + `/error/${errSrc}/${msg}`;
                ex.Type = ExceptionType.BadRequest;
                ex.Message = response.Message;
            }
            throw ex;
        }
    }

    public static async downloadGET(
        apiUrl: string,
        actionCode: string,
        bodyContent: string,
        resultFileName?: string,
        includeToken: boolean = true,
    ) {
        let header = {};
        if (includeToken) {
            header = {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                Flex_Url: window.location.href,
                Flex_ActionCode: actionCode,
            };
        } else {
            header = {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                Flex_Url: window.location.href,
                Flex_ActionCode: actionCode,
            };
        }

        let httpStatus!: Number;
        let response = await fetch(apiUrl, {
            method: "GET",
            headers: header,
        })
            .then((res) => {
                httpStatus = res.status;
                let filename: string;
                const disposition = res.headers.get("content-disposition");

                if (disposition && disposition.indexOf("attachment") !== -1) {
                    var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                    var matches = filenameRegex.exec(disposition);
                    if (matches != null && matches[1]) {
                        filename = matches[1].replace(/['"]/g, "");
                    }
                }

                // Nếu thành công thì tạo blob để tải file
                if (httpStatus === 200) {
                    res.blob().then((blob) => {
                        let url = window.URL.createObjectURL(blob);
                        let a = document.createElement("a");
                        a.href = url;
                        a.download =
                            resultFileName != undefined && resultFileName != "" && resultFileName != null
                                ? resultFileName
                                : filename;
                        a.click();
                    });
                }
                // Nếu không thành công thì trả ra json để lấy message từ server
                else {
                    return res.json();
                }
            })
            .then((data) => {
                //console.log("RESPONSE DATA:");
                //console.log(data);
                return data;
            })
            .catch((err) => {
                let ex = new SMXException();
                ex.Type = ExceptionType.PostFailed;
                ex.Message = "Kết nối máy chủ thất bại, vui lòng thử lại sau.";
                throw ex;
            });

        if (httpStatus !== 200) {
            //console.log(response);
            let ex = new SMXException();
            if (response.StatusCode === 400) {
                // Lỗi nghiệp vụ, trả về trang đang hiển thị
                // throw response.Message;
                ex.Type = ExceptionType.BadRequest;
                ex.Message = response.Message;
            } else if (response.StatusCode === 401) {
                // Lỗi chưa đăng nhập, nhảy về trang login
                window.location.href = window.location.origin + `/login/${btoa(window.location.pathname)}`;

                //ex.Type = ExceptionType.Unauthorized;
            } else {
                // Các lỗi khác, nhảy về trang báo lỗi
                // let msg = encodeURI(response.Message);
                // let errSrc = encodeURIComponent(window.location.href);
                // window.location.href = window.location.origin + `/error/${errSrc}/${msg}`;
                ex.Type = ExceptionType.BadRequest;
                ex.Message = response.Message;
            }
            throw ex;
        }
    }
}
