import { SMXException, ExceptionType } from "../models/SMXException";
import ErrorHandler from "../components/ErrorHandler";

export default class HttpUtils {
    public static async post<T>(apiUrl: string, actionCode: string, bodyContent: string, includeToken: boolean = true) {
        return HttpUtils.fetch_api<T>(apiUrl, actionCode, bodyContent, includeToken, "POST");
    }

    public static async get<T>(apiUrl: string, actionCode: string, bodyContent: string, includeToken: boolean = true) {
        return HttpUtils.fetch_api<T>(apiUrl, actionCode, bodyContent, includeToken, "GET");
    }

    private static async fetch_api<T>(
        apiUrl: string,
        actionCode: string,
        bodyContent: string,
        includeToken: boolean,
        actionType: string
    ) {
        //console.log("url", apiUrl);
        //console.log(bodyContent);

        ErrorHandler.hanlerCloseError();

        let header = {};
        if (includeToken) {
            header = {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                Flex_Url: window.location.href,
                Flex_ActionCode: actionCode,
            };
        } else {
            header = {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                Flex_Url: window.location.href,
                Flex_ActionCode: actionCode,
            };
        }

        var httpStatus!: number;
        let response = await fetch(apiUrl, {
            method: "POST",
            headers: header,
            body: bodyContent,
        })
            .then((res) => {
                //console.log("RESPONSE RAW: \r\n" + JSON.stringify(res));
                httpStatus = res.status;

                return res.json();
            })
            .then((data) => {
                //console.log("RESPONSE DATA:");
                // console.log(data);
                return data;
            })
            .catch((err) => {
                console.log(apiUrl);
                console.log(header);
                console.log(err);

                // Kh??ng k???t n???i ???????c server, chuy???n status v??? 404
                httpStatus = 404;

                // N???u k???t n???i th???t b???i th?? b??o message v?? show ??? client
                //throw "K???t n???i m??y ch??? th???t b???i, vui l??ng ki???m tra internet";
                //let msg = encodeURI("K???t n???i m??y ch??? th???t b???i, vui l??ng ki???m tra internet: " + err);
                // window.location.href = window.location.origin + `/error/${encodeURIComponent(apiUrl)}/${msg}`;
                //alert("K???t n???i m??y ch??? th???t b???i");

                let ex = new SMXException();
                if (actionType === "POST") {
                    ex.Type = ExceptionType.PostFailed;
                } else {
                    ex.Type = ExceptionType.GetFailed;
                }
                ex.Message = "K???t n???i m??y ch??? th???t b???i, vui l??ng th??? l???i sau.";
                throw ex;
            });
        if (httpStatus === 200) {
            return response as T;
        } else {
            //console.log(response);
            let ex = new SMXException();
            if (response.StatusCode === 400) {
                // L???i nghi???p v???, tr??? v??? trang ??ang hi???n th???
                // throw response.Message;
                ex.Type = ExceptionType.BadRequest;
                ex.Message = response.Message;
            } else if (response.StatusCode === 401) {
                // L???i ch??a ????ng nh???p, nh???y v??? trang login
                window.location.href = window.location.origin + `/login/${btoa(window.location.pathname)}`;

                //ex.Type = ExceptionType.Unauthorized;
            } else {
                // C??c l???i kh??c, nh???y v??? trang b??o l???i
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

                // N????u tha??nh c??ng thi?? ta??o blob ?????? ta??i file
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
                // N????u kh??ng tha??nh c??ng thi?? tra?? ra json ?????? l????y message t???? server
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
                ex.Message = "K???t n???i m??y ch??? th???t b???i, vui l??ng th??? l???i sau.";
                throw ex;
            });

        if (httpStatus !== 200) {
            //console.log(response);
            let ex = new SMXException();
            if (response.StatusCode === 400) {
                // L???i nghi???p v???, tr??? v??? trang ??ang hi???n th???
                // throw response.Message;
                ex.Type = ExceptionType.BadRequest;
                ex.Message = response.Message;
            } else if (response.StatusCode === 401) {
                // L???i ch??a ????ng nh???p, nh???y v??? trang login
                window.location.href = window.location.origin + `/login/${btoa(window.location.pathname)}`;

                //ex.Type = ExceptionType.Unauthorized;
            } else {
                // C??c l???i kh??c, nh???y v??? trang b??o l???i
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

                // N????u tha??nh c??ng thi?? ta??o blob ?????? ta??i file
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
                // N????u kh??ng tha??nh c??ng thi?? tra?? ra json ?????? l????y message t???? server
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
                ex.Message = "K???t n???i m??y ch??? th???t b???i, vui l??ng th??? l???i sau.";
                throw ex;
            });

        if (httpStatus !== 200) {
            //console.log(response);
            let ex = new SMXException();
            if (response.StatusCode === 400) {
                // L???i nghi???p v???, tr??? v??? trang ??ang hi???n th???
                // throw response.Message;
                ex.Type = ExceptionType.BadRequest;
                ex.Message = response.Message;
            } else if (response.StatusCode === 401) {
                // L???i ch??a ????ng nh???p, nh???y v??? trang login
                window.location.href = window.location.origin + `/login/${btoa(window.location.pathname)}`;

                //ex.Type = ExceptionType.Unauthorized;
            } else {
                // C??c l???i kh??c, nh???y v??? trang b??o l???i
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
