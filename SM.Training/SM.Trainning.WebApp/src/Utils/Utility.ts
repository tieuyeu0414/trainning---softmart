import { useEffect } from 'react';
import iKeyValuePair from "../Interfaces/iKeyValuePair";
import SMX from "../constants/SMX";
import moment from 'moment';
import React, { useState } from 'react';

class TimeZoneStore {
    static timeZone = 0;

    static setTimeZone(timeZone: number) {
        this.timeZone = timeZone
    }

    static getTimeZone() {
        return this.timeZone
    }
}

export { TimeZoneStore }

export default class Utility {
    static CheckPermission(allowedFunctions: Array<string> | undefined, checkingFunction: string): boolean {
        if (allowedFunctions) {
            const bypass = allowedFunctions.findIndex((code) => code === "*");
            if (bypass >= 0) {
                return true;
            } else {
                const result = allowedFunctions!.findIndex(
                    (code) => code.toUpperCase() === checkingFunction.toUpperCase()
                );
                return result >= 0;
            }
        } else {
            return false;
        }
    }

    static IsNullOrUndefined(obj: any) {
        if (obj === null || obj === undefined) {
            return true;
        }
        return false;
    }

    static IsNullOrEmpty(str: string) {
        if (str === null || str === undefined || str === "") {
            return true;
        }
        return false;
    }

    static IsNullOrWhitspace(str: string) {
        if (str === null || str === undefined || str.trim() === "") {
            return true;
        }
        return false;
    }

    //#region CÁC HÀM LIÊN QUAN ĐẾN DATETIME

    static ConvertToUtcDateTime(date?: Date) {
        // // Dương 2022-02-19 Update hàm Convert Date từ Client trả về Server
        // try {
        //     return this.ConvertToUtcDateTime_Prototype(date);
        // } catch (ex) {
        //     console.log(ex)
        //     return this.ConvertToUtcDateTime_Stable(date);
        // }

        // return null;
        return this.ConvertToUtcDateTime_Stable(date);
    }

    static ConvertToUtcDateTime_Stable(date?: Date) {
        let result: any;
        if (date) {
            //nếu tham số truyền vào không phải Date thì cast sang Date
            if (!(date instanceof Date)) {
                date = new Date(date);
            }

            //var dateNow = new Date();
            let gmt = date.getTimezoneOffset(); //số phút mà giờ client nhanh hơn giờ UTC

            // Trừ số phút nhanh hơn vì qua hàm JSON.stringify các giá trị datetime bị reset về UTC+0
            result = new Date(date.getFullYear(), date.getMonth(), date.getDate(),
                date.getHours(), date.getMinutes() - gmt, date.getSeconds());
            //result = moment(val).utc().format();

            //return result;
        }
        else {
            result = null;
        }

        return result;
    }

    static ConvertToUtcDateTime_Prototype(_date?: Date) {
        try {
            let result: any;
            if (_date) {
                let date: Date | undefined = undefined
                if (!(_date instanceof Date)) {
                    date = new Date(_date);
                }

                date = this.CloneDate(_date)!;

                // let timeZone = TimeZoneStore.getTimeZone();

                const serverTimeZone = -7;

                let dateNow = new Date();

                let clientTimeZone = dateNow.getTimezoneOffset() / 60;

                let timeZoneDiff = serverTimeZone - clientTimeZone;

                console.log({ dateNow }, { clientTimeZone }, { timeZoneDiff });

                let dateServerTime = this.CloneDate(date)!;

                dateServerTime.setHours(date.getHours() - timeZoneDiff - serverTimeZone)

                console.log({ dateServerTime })

                result = dateServerTime

                return result;
            }
        } catch (ex) {
            console.log(80, ex)
        }

        return null;
    }

    static CloneDate(date?: Date): Date | undefined {
        if (date) {
            let cloneDate = new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate(),
                date.getHours(),
                date.getMinutes(),
                date.getSeconds(),
                date.getMilliseconds()
            );

            return cloneDate
        }

        return undefined
    }

    static ConvertToUtcDateTimeMoment(date: Date) {
        // Dương 2022-02-19 Update hàm Convert Date từ Client trả về Server
        try {
            return this.ConvertToUtcDateTime_Prototype(date);
        }
        catch (ex) {
            console.log(ex)
            return this.ConvertToUtcDateTimeMoment_Stable(date);
        }
        return null;
    }

    static ConvertToUtcDateTimeMoment_Stable(date: Date) {
        let result: any;
        if (date) {
            var dateNow = new Date();
            let gmt = 0;
            gmt = (dateNow.getTimezoneOffset() / 60) * -1;//số phút chênh chia 60 ra dc số giờ lệch (-7h so với múi +0 nên * -1)
            let val = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours() - gmt, date.getMinutes(), date.getSeconds());
            result = moment(val).utc().format();
            return result;
        }
        return null;
    }

    static getTime(date: Date) {
        if (date) {
            let dateNew = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 1, 1, 1, 1);
            let value = dateNew.getTime();
            return value;
        } else {
            return undefined;
        }
    }
    static RemoveTimeZone(date: Date | null | undefined): Date | null {
        if (date) {
            // Xử lý trường hợp giá trị không phải là Date trước
            if (typeof date !== typeof Date) {
                date = new Date(date);
            }

            date.setMinutes(date.getMinutes() - date.getTimezoneOffset());

            return date;
        }
        return null;
    }

    // Trả ra date string với format DD/MM/YYYY
    static GetDateString(dateVal: Date | undefined): string {
        if (dateVal) {
            if (typeof dateVal !== typeof Date) {
                dateVal = new Date(dateVal);
            }

            if (dateVal) {
                // Kết hợp với phần offset vì các hàm GetDate luôn + 7 giờ vào kết quả
                //dateVal.setMinutes(dateVal.getMinutes() + dateVal.getTimezoneOffset());

                let year = dateVal.getFullYear().toString();

                let month = (dateVal.getMonth() + 1).toString();
                if (month.length < 2) {
                    month = "0" + month;
                }

                let day = dateVal.getDate().toString();
                if (day.length < 2) {
                    day = "0" + day;
                }

                return day + "/" + month + "/" + year;
            }
        }

        return "";
    }

    // Trả ra Thứ với đầu vào là date
    static GetDayOfWeek(dateVal: Date): string {
        if (dateVal) {
            if (typeof dateVal !== typeof Date) {
                dateVal = new Date(dateVal);
            }

            if (dateVal) {
                // Kết hợp với phần offset vì các hàm GetDate luôn + 7 giờ vào kết quả
                // dateVal.setMinutes(dateVal.getMinutes() + dateVal.getTimezoneOffset());

                // Cộng 1 vì hàm getDay trả ra 0 là Chủ nhật, trong SMX thì 1 là Chủ nhật
                let day = dateVal.getDay() + 1;
                return this.GetDictionaryValue(SMX.DayOfWeek.dicName, day);
            }
        }

        return "";
    }

    // Trả ra DateString với format hh:mm DD/MM/YYYY
    static GetDateMinuteString(dateVal: Date | undefined | null): string {
        if (dateVal) {
            if (typeof dateVal !== typeof Date) {
                dateVal = new Date(dateVal);
            }

            if (dateVal) {
                // Kết hợp với phần offset vì các hàm GetDate luôn + 7 giờ vào kết quả
                //dateVal.setMinutes(dateVal.getMinutes() + dateVal.getTimezoneOffset());
                //==> không sử dụng hàm này. Xử lý lệch utc chỉ cần với hàm đẩy date lên api thôi, còn get xuống thì ko cần
                let year = dateVal.getFullYear().toString();

                let month = (dateVal.getMonth() + 1).toString();
                if (month.length < 2) {
                    month = "0" + month;
                }

                let day = dateVal.getDate().toString();
                if (day.length < 2) {
                    day = "0" + day;
                }

                let hour = dateVal.getHours().toString();
                if (hour.length < 2) {
                    hour = "0" + hour;
                }

                let minute = dateVal.getMinutes().toString();
                if (minute.length < 2) {
                    minute = "0" + minute;
                }

                return hour + ":" + minute + "  " + day + "/" + month + "/" + year;
            }
        }

        return "";
    }

    // Trả ra DateString với format DD/MM/YYYY hh:mm 
    static GetDateMinuteString_DateHour(dateVal: Date | undefined | null): string {
        if (dateVal) {
            if (typeof dateVal !== typeof Date) {
                dateVal = new Date(dateVal);
            }

            if (dateVal) {
                // Kết hợp với phần offset vì các hàm GetDate luôn + 7 giờ vào kết quả
                //dateVal.setMinutes(dateVal.getMinutes() + dateVal.getTimezoneOffset());
                //==> không sử dụng hàm này. Xử lý lệch utc chỉ cần với hàm đẩy date lên api thôi, còn get xuống thì ko cần
                let year = dateVal.getFullYear().toString();

                let month = (dateVal.getMonth() + 1).toString();
                if (month.length < 2) {
                    month = "0" + month;
                }

                let day = dateVal.getDate().toString();
                if (day.length < 2) {
                    day = "0" + day;
                }

                let hour = dateVal.getHours().toString();
                if (hour.length < 2) {
                    hour = "0" + hour;
                }

                let minute = dateVal.getMinutes().toString();
                if (minute.length < 2) {
                    minute = "0" + minute;
                }

                return day + "/" + month + "/" + year + "  " + hour + ":" + minute;
            }
        }

        return "";
    }

    // Trả ra DateString với format hh:mm:ss DD/MM/YYYY
    static GetFullDateMinuteString(dateVal: Date | undefined | null): string {
        if (dateVal) {
            if (typeof dateVal !== typeof Date) {
                dateVal = new Date(dateVal);
            }

            if (dateVal) {
                // Kết hợp với phần offset vì các hàm GetDate luôn + 7 giờ vào kết quả
                //dateVal.setMinutes(dateVal.getMinutes() + dateVal.getTimezoneOffset());
                //==> không sử dụng hàm này. Xử lý lệch utc chỉ cần với hàm đẩy date lên api thôi, còn get xuống thì ko cần
                let year = dateVal.getFullYear().toString();

                let month = (dateVal.getMonth() + 1).toString();
                if (month.length < 2) {
                    month = "0" + month;
                }

                let day = dateVal.getDate().toString();
                if (day.length < 2) {
                    day = "0" + day;
                }

                let hour = dateVal.getHours().toString();
                if (hour.length < 2) {
                    hour = "0" + hour;
                }

                let minute = dateVal.getMinutes().toString();
                if (minute.length < 2) {
                    minute = "0" + minute;
                }

                let second = dateVal.getSeconds().toString();
                if (second.length < 2) {
                    second = "0" + second;
                }

                return hour + ":" + minute + ":" + second + "  " + day + "/" + month + "/" + year;
            }
        }

        return "";
    }
    // Trả ra giờ và phút hh:mm
    static GetHourMinuteString(dateVal: Date | undefined | null): string {
        if (dateVal) {
            if (typeof dateVal !== typeof Date) {
                dateVal = new Date(dateVal);
            }

            if (dateVal) {
                // Kết hợp với phần offset vì các hàm GetDate luôn + 7 giờ vào kết quả
                // dateVal.setMinutes(dateVal.getMinutes() + dateVal.getTimezoneOffset());
                //==> không sử dụng hàm này. Xử lý lệch utc chỉ cần với hàm đẩy date lên api thôi, còn get xuống thì ko cần

                let hour = dateVal.getHours().toString();
                if (hour.length < 2) {
                    hour = "0" + hour;
                }

                let minute = dateVal.getMinutes().toString();
                if (minute.length < 2) {
                    minute = "0" + minute;
                }

                return hour + ":" + minute;
            }
        }

        return "";
    }

    // Trả ra DateString với format MM
    static GetDateMonthString(dateVal: Date | undefined | null): string {
        if (dateVal) {
            if (typeof dateVal !== typeof Date) {
                dateVal = new Date(dateVal);
            }
            if (dateVal) {
                // Kết hợp với phần offset vì các hàm GetDate luôn + 7 giờ vào kết quả
                //dateVal.setMinutes(dateVal.getMinutes() + dateVal.getTimezoneOffset());
                //==> không sử dụng hàm này. Xử lý lệch utc chỉ cần với hàm đẩy date lên api thôi, còn get xuống thì ko cần

                let month = (dateVal.getMonth() + 1).toString();

                return month;
            }
        }

        return "";
    }
    // Trả ra DateString với format DD
    static GetDateDayString(dateVal: Date | undefined | null): string {
        if (dateVal) {
            if (typeof dateVal !== typeof Date) {
                dateVal = new Date(dateVal);
            }
            if (dateVal) {
                // Kết hợp với phần offset vì các hàm GetDate luôn + 7 giờ vào kết quả
                //dateVal.setMinutes(dateVal.getMinutes() + dateVal.getTimezoneOffset());
                //==> không sử dụng hàm này. Xử lý lệch utc chỉ cần với hàm đẩy date lên api thôi, còn get xuống thì ko cần
                let day = dateVal.getDate().toString();

                return day;
            }
        }

        return "";
    }
    // Chuyển đổi 1 string sang date và hiển thị giá trị date đó với format DD/MM/YYYY
    static ParseAndGetDateString(dateString: string): string {
        if (dateString !== null && dateString !== undefined) {
            try {
                var dte = new Date(dateString);
                return Utility.GetDateString(dte);
            } catch {
                return "";
            }
        } else {
            return "";
        }
    }

    // Chuyển đổi 1 string sang date và hiển thị giá trị date đó với format hh:mm DD/MM/YYYY
    static ParseAndGetDateMinuteString(dateString: string) {
        if (dateString !== null && dateString !== undefined) {
            try {
                var dte = new Date(dateString);

                return Utility.GetDateMinuteString(dte);
            } catch {
                return "";
            }
        } else {
            return "";
        }
    }
    // Chuyển đổi 1 string sang date và hiển thị giá trị date đó với format  DD/MM/YYYY hh:mm
    static ParseAndGetDateHourString(dateString: string) {
        if (dateString !== null && dateString !== undefined) {
            try {
                var dte = new Date(dateString);

                return Utility.GetDateMinuteString(dte);
            } catch {
                return "";
            }
        } else {
            return "";
        }
    }

    //#endregion

    // Hiển thị giá trị decimal
    static GetDecimalString(num?: number, digitNumber: number = 0): string {
        if (num === null || num === undefined) {
            return '';
        }
        if (digitNumber == 0) {
            if (num === 0) {
                return '0';
            }
            if (num !== null && num !== undefined && num !== 0) {
                var num_parts = num.toString().split(".");
                num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                return num_parts.join(".");
            } else {
                return "";
            }
        }

        if (digitNumber < 0) {
            return "";
        }
        if (num !== null && num !== undefined) {
            var num_parts = num.toString().split(".");
            if (num_parts.length <= 1) {
                num_parts[1] = "0".repeat(digitNumber);
            } else {
                num_parts[1] = num_parts[1].toString() + "0".repeat(digitNumber - num_parts[1].toString().length);
            }
            num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            if (digitNumber === 0) {
                return num_parts[0];
            }
            return num_parts.join(".");
        }
        else {
            if (digitNumber === 0) {
                return "0";
            }
            return `0.${"0".repeat(digitNumber)}`;
        }
    }

    static GetDecimalWithRound(num?: number, fixed: number = 2): string {
        // fixed=6;

        if (num === 0) return '0';

        if (num === null || num === undefined) return '';

        if (num !== null && num !== undefined) {
            num = parseFloat(num.toFixed(fixed));
            var num_parts = num.toString().split(".");

            num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

            if (num_parts.length <= 1) {
                return num_parts[0]
            }
            return num_parts.join(".");
        } else {
            return "0." + "0".repeat(fixed);
        }
    }

    static GetDecimalWithRoundCommaFraction(num?: number, fixed: number = 2): string {

        if (num === 0) return '0';

        if (num === null || num === undefined) return '';

        if (num !== null && num !== undefined) {
            num = parseFloat(num.toFixed(fixed));
            var num_parts = num.toString().split(".");

            num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");

            if (num_parts.length <= 1) {
                return num_parts[0]
            }
            return num_parts.join(",");
        } else {
            return "0," + "0".repeat(fixed);
        }
    }

    static GetDecimalPrincipalString(num?: number): string {
        if (num !== null && num !== undefined) {

            var num_parts = num.toString().split(".");
            if (num_parts.length <= 1) {
                num_parts[1] = "00";
            }
            num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return num_parts[0];
        } else {
            return "0.00";
        }
    }

    static GetDecimalPercentage(num?: number): string {
        if (num) {
            return this.GetDecimalWithRound(num * 100, 2) + '%'
        }
        return ''
    }

    // Cast 1 string sang Date
    static ConvertToDate(dateString: any): Date | null {
        if (dateString !== null && dateString !== undefined) {
            try {
                var dte = new Date(dateString);
                return dte;
            } catch {
                return null;
            }
        } else {
            return null;
        }
    }

    // Cast 1 string sang NullableInt
    static ConvertToInt(intString: string): number | null {
        if (intString !== null && intString !== undefined) {
            try {
                var result = parseInt(intString);
                return result;
            } catch {
                return null;
            }
        } else {
            return null;
        }
    }

    // Cast 1 string sang number | undefined
    static ConvertStringToInt(intString: string): number | undefined {
        if (intString !== null && intString !== undefined && intString != '') {
            try {
                let result = parseInt(intString);
                return result;
            } catch {
                return undefined;
            }
        } else {
            return undefined;
        }
    }

    // Cast 1 string sang Bool
    static ConvertToBool(boolString: string): boolean | null {
        return boolString === "true";
    }

    // cast 1 number sang bool
    static ConvertNumberToBool(value: number | null | undefined): boolean {
        if (typeof value === undefined) {
            return false;
        }

        if (value == null) {
            return false;
        }

        return true;
    }

    // Cast 1 string sang NullableDecimal
    static ConvertToDecimal(decString: string): number | null {
        if (decString !== null && decString !== undefined) {
            try {
                var result = parseFloat(decString);
                return result;
            } catch {
                return null;
            }
        } else {
            return null;
        }
    }

    static GetDictionaryValue<T>(dict: iKeyValuePair<T, any>[], key: T): any {
        if (key !== null && key !== undefined) {
            let item = dict.find((en) => en.Key === key);
            //console.log(item);
            if (item) {
                return item.Value;
            }
        }
        return "";
    }

    // static GetStyleColor(name, status, color) {
    //     return <span style={{color: SMX.DayOfWeek[color]}}>{name}</span>
    // }

    // Xóa dấu tiếng Việt
    static FormatVNLanguage(str: string, lowerCase = false): string {
        if (lowerCase) {
            str = str.toLowerCase();
        }
        str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");

        str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
        str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
        str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
        str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
        str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
        str = str.replace(/Ỳ|Ý|Y|Ỷ|Ỹ/g, "Y");
        str = str.replace(/Đ/g, "D");
        // str = str.replace(/\W+/g, ' ');
        // str = str.replace(/\s/g, '-');
        return str;
    }

    static TrimString(str: string | null | undefined, arrChar: Array<string>) {
        if (str !== null && str !== undefined) {
            for (let i = 0; i < arrChar.length; i++) {
                str = str.replace(new RegExp("^" + arrChar[i]), "");
                str = str.replace(new RegExp(arrChar[i] + "$"), "");
            }
        }
        return str;
    }
    //validate
    static validateEmail(email: string) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    static validateUsername(obj: string) {
        var Re_username = new RegExp(/^([a-z|A-Z|_|\.|0-9][a-z|A-Z|_|\.|0-9]+)$/);
        return Re_username.test(obj);
        //username ki tự đầu phải là kí tự chữ. k thể là số. các kí tự sau lặp có thẻ là chứ _ .  or sô
    }
    static validatePhone(obj: string) {
        var Re_phone = new RegExp(/^(\d{6,11})$/);
        return Re_phone.test(obj);
        //phone : 6-11 số
    }
    static validatePassword(obj: string) {
        var Re_password = new RegExp(
            /^([a-z|A-Z|0-9])([a-z|A-Z|0-9][a-z|A-Z|0-9][a-z|A-Z|0-9][a-z|A-Z|0-9])([a-z|A-Z|0-9]+)$/
        );
        return Re_password.test(obj);
        //password : 6 kí tự
    }

    static validateCoordinate(obj: string) {
        var Re_Coord = new RegExp(/^(-?)\d*\.?\d*$/);
        return Re_Coord.test(obj);
    }

    static validateAZCharacter(obj: string) {
        var Re_Char = new RegExp(/^[A-Z]+$/g);
        return Re_Char.test(obj);
    }

    static validateNumberCharacter(obj: string) {
        var Re_Char = new RegExp(/^[0-9]+$/g);
        return Re_Char.test(obj);
    }

    static validateStrNumber(obj: string) {
        let Re_CharNumber = new RegExp(/^[0-9]+$/g)
        let Re_DecimalThounsandChar = new RegExp(/[\.\,]/)

        if (Re_CharNumber.test(obj)) {
            return true
        }

        return Re_DecimalThounsandChar.test(obj)
    }

    static validateDateMonthPickerCharacter(obj: string) {
        let Re_CharNumber = new RegExp(/^[0-9]+$/g)
        var Re_CharDivider = new RegExp(/[\/\.\-]/)

        if (Re_CharNumber.test(obj)) {
            return true
        }

        return Re_CharDivider.test(obj)
    }

    // ConvertMetToKm
    static ConvertMetToKm(val: number): string | null {
        if (val !== null && val !== undefined) {
            try {
                var km = val / 1000;
                return km.toFixed(1);
            } catch {
                return null;
            }
        } else {
            return null;
        }
    }
    //mili giây sang phút
    static millisToMinutes(millis: number) {
        if (millis !== null) {
            var minutes = Math.floor(millis / 60000);
            //var seconds = ((millis % 60000) / 1000).toFixed(0);
            return minutes;
        } else {
            return undefined;
        }
    }

    static async getImageBase64(file: File) {
        let promise = new Promise<any>((resolve, reject) => {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                resolve(reader.result);
            };
            reader.onerror = function (error) {
                reject("error");
            };
        });
        return promise;
    }
    static formatContent(val?: string, lengthValue?: number) {
        if (!lengthValue) {
            lengthValue = 80;
        }
        if (val) {
            if (val.length > lengthValue) {
                return val.substr(0, lengthValue) + "..";
            } else {
                return val;
            }
        } else {
            return "";
        }
    }

    static Guid() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
            var r = (Math.random() * 16) | 0,
                v = c == "x" ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    }

    static GetBoolString(val: boolean | null | undefined) {
        if (val !== null && val !== undefined) {
            return val.toString();
        }
        else {
            return "";
        }
    }

    static GetNumberString(val: number | null | undefined) {
        if (val) {

            return val.toString();
        } else {
            if (val == 0) {
                return ("0");
            }
            return "";
        }
    }

    static AppendSearchResult<T extends object, U extends keyof T>(newData: T[] | null | undefined, oldData: T[] | null | undefined, key: U): T[] {
        if (oldData) {
            let arrDiff = newData?.filter((en1: T) => oldData?.find((en2: T) => en1[key] === en2[key]) === undefined) || [];

            return [...oldData, ...arrDiff]
        }
        else {
            return newData || [];
        }
    }

    static StringIsEmpty(string: null | undefined | string): boolean {
        return string === null || string === undefined || string === ''
    }

    static BuildDisplayString(arrayString: (string | null | undefined)[], seperateSymbol: string = " - ") {
        return arrayString.filter(str => str !== null && str !== undefined).join(seperateSymbol)
    }

    static SetDateMaxValue(date?: Date) {
        if (date)
            date.setHours(23, 59, 59)
    }

    static SetDateMinValue(date?: Date) {
        if (date)
            date.setHours(0, 0, 0)
    }

    static ParseBool(val: string): boolean | undefined {
        debugger;
        console.log(val);
        if (val) {
            if (val.toUpperCase() === "TRUE") {
                return true;
            }

            return false;
        }

        return undefined;
    }

    static AddTrailingLeftZero(value: number, x: number): string {
        let str = value.toString()
        let trailingZero = x - str.length > 0 ? '0'.repeat(x - str.length) : ''
        return trailingZero + str
    }

    static CheckNullOrUndefinedNumber(value: undefined | null | number) {
        if (typeof value == 'undefined') {
            return false;
        }

        if (value === null) {
            return false;
        }

        return true;
    }

    static CheckNullOrUndefinedString(value: undefined | null | string) {
        if (typeof value == 'undefined') {
            return false;
        }

        if (value === null) {
            return false;
        }

        return true;
    }

    static ToFixedNumber(num: number, digits: number = 2, base: number = 10) {
        let pow = Math.pow(base, digits);
        return Math.round(num * pow) / pow;
    }

    /**
   * Returns an array with arrays of the given size.
   *
   * @param myArray {Array} array to split
   * @param chunk_size {Integer} Size of every group
   */
    static chunkArray(myArray: any[], chunk_size: number) {
        var index = 0;
        var arrayLength = myArray.length;
        var tempArray: any[] = [];

        for (index = 0; index < arrayLength; index += chunk_size) {
            let myChunk = myArray.slice(index, index + chunk_size);
            // Do something if you want with the group
            tempArray.push(myChunk);
        }

        return tempArray;
    }

    static Docso(value?: number) {
        if (value == undefined) {
            return ''
        }

        let strValue = doc(value.toString());
        return strValue.charAt(1).toUpperCase() + strValue.slice(2);

        // Function
        function doc1so(so: any) {
            var arr_chuhangdonvi: any = ['không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];
            var resualt = '';
            resualt = arr_chuhangdonvi[so];
            return resualt;
        }
        function doc2so(so: any, decimal = false) {
            so = so.replace(' ', '');
            var arr_chubinhthuong: any = ['không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];
            var arr_chuhangdonvi: any = ['mươi', 'mốt', 'hai', 'ba', 'bốn', 'lăm', 'sáu', 'bảy', 'tám', 'chín'];
            var arr_chuhangchuc: any = ['không', 'mười', 'hai mươi', 'ba mươi', 'bốn mươi', 'năm mươi', 'sáu mươi', 'bảy mươi', 'tám mươi', 'chín mươi'];
            var resualt = '';
            var sohangchuc = Number(so.substr(0, 1));
            var sohangdonvi = Number(so.substr(1, 1));
            resualt += arr_chuhangchuc[sohangchuc];

            if (decimal) {
                // if (sohangchuc == 0 && sohangdonvi > 0)
                resualt += ' ' + arr_chubinhthuong[sohangdonvi];
            } else {
                if (sohangchuc == 1 && sohangdonvi == 1)
                    resualt += ' ' + arr_chubinhthuong[sohangdonvi];
                else if (sohangchuc == 1 && sohangdonvi > 1)
                    resualt += ' ' + arr_chuhangdonvi[sohangdonvi];
                else if (sohangchuc > 1 && sohangdonvi > 0)
                    resualt += ' ' + arr_chuhangdonvi[sohangdonvi];
            }

            return resualt;
        }
        function doc3so(so: any, decimal = false) {
            var resualt = '';
            var arr_chubinhthuong: any = ['không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];
            var arr_chuhangdonvi: any = ['mươi', 'mốt', 'hai', 'ba', 'bốn', 'lăm', 'sáu', 'bảy', 'tám', 'chín'];
            var arr_chuhangchuc: any = ['không', 'mười', 'hai mươi', 'ba mươi', 'bốn mươi', 'năm mươi', 'sáu mươi', 'bảy mươi', 'tám mươi', 'chín mươi'];

            var sohangtram = so.substr(0, 1);
            var sohangchuc = Number(so.substr(1, 1));
            var sohangdonvi = Number(so.substr(2, 1));

            resualt = arr_chubinhthuong[sohangtram] + ' trăm';

            if (sohangchuc == 0 && sohangdonvi != 0)
                resualt += ' linh ' + arr_chubinhthuong[sohangdonvi];
            else if (sohangchuc != 0)
                resualt += ' ' + doc2so(arr_chuhangchuc[sohangchuc] + ' ' + arr_chuhangdonvi[sohangdonvi]);
            return resualt;
        }

        function docsonguyen(so: any, decimal = false) {
            var result = '';

            if (so != undefined) {
                var arr_So: any = [{ 'ty': '' }, { 'trieu': '' }, { 'nghin': '' }, { 'tram': '' }];
                var sochuso = so.length;
                for (var i = (sochuso - 1); i >= 0; i--) {

                    if ((sochuso - i) <= 3) {
                        if (arr_So['tram'] != undefined)
                            arr_So['tram'] = so.substr(i, 1) + arr_So['tram'];
                        else arr_So['tram'] = so.substr(i, 1);

                    }
                    else if ((sochuso - i) > 3 && (sochuso - i) <= 6) {
                        if (arr_So['nghin'] != undefined)
                            arr_So['nghin'] = so.substr(i, 1) + arr_So['nghin'];
                        else arr_So['nghin'] = so.substr(i, 1);
                    }
                    else if ((sochuso - i) > 6 && (sochuso - i) <= 9) {
                        if (arr_So['trieu'] != undefined)
                            arr_So['trieu'] = so.substr(i, 1) + arr_So['trieu'];
                        else arr_So['trieu'] = so.substr(i, 1);
                    }
                    else {
                        if (arr_So['ty'] != undefined)
                            arr_So['ty'] = so.substr(i, 1) + arr_So['ty'];
                        else arr_So['ty'] = so.substr(i, 1);
                    }
                }

                if (decimal == false) {
                    if (arr_So['ty'] > 0) {
                        result += doc(arr_So['ty']) + ' tỷ';
                    }
                    if (arr_So['trieu'] > 0) {
                        if (arr_So['trieu'].length >= 3 || arr_So['ty'] > 0)
                            result += ' ' + doc3so(arr_So['trieu'], decimal) + ' triệu';
                        else if (arr_So['trieu'].length >= 2)
                            result += ' ' + doc2so(arr_So['trieu'], decimal) + ' triệu';
                        else result += ' ' + doc1so(arr_So['trieu']) + ' triệu';
                    }
                    if (arr_So['nghin'] > 0) {
                        if (arr_So['nghin'].length >= 3 || arr_So['trieu'] > 0)
                            result += ' ' + doc3so(arr_So['nghin'], decimal) + ' nghìn';
                        else if (arr_So['nghin'].length >= 2)
                            result += ' ' + doc2so(arr_So['nghin'], decimal) + ' nghìn';
                        else result += ' ' + doc1so(arr_So['nghin']) + ' nghìn';
                    }
                    if (arr_So['tram'] > 0) {
                        if (arr_So['tram'].length >= 3 || arr_So['nghin'] > 0)
                            result += ' ' + doc3so(arr_So['tram'], decimal);
                        else if (arr_So['tram'].length >= 2)
                            result += ' ' + doc2so(arr_So['tram'], decimal);
                        else result += ' ' + doc1so(arr_So['tram']);
                    }
                    if (result === '' && arr_So['tram'] == 0) {
                        result += ' không'
                    }
                } else {
                    if (arr_So['ty'] >= 0)
                        result += doc(arr_So['ty']) + ' tỷ';
                    if (arr_So['trieu'] >= 0) {
                        if (arr_So['trieu'].length >= 3 || arr_So['ty'] > 0)
                            result += ' ' + doc3so(arr_So['trieu'], decimal) + ' triệu';
                        else if (arr_So['trieu'].length >= 2)
                            result += ' ' + doc2so(arr_So['trieu'], decimal) + ' triệu';
                        else result += ' ' + doc1so(arr_So['trieu']) + ' triệu';
                    }
                    if (arr_So['nghin'] >= 0) {
                        if (arr_So['nghin'].length >= 3 || arr_So['trieu'] > 0)
                            result += ' ' + doc3so(arr_So['nghin'], decimal) + ' nghìn';
                        else if (arr_So['nghin'].length >= 2)
                            result += ' ' + doc2so(arr_So['nghin'], decimal) + ' nghìn';
                        else result += ' ' + doc1so(arr_So['nghin']) + ' nghìn';
                    }
                    if (arr_So['tram'] >= 0) {
                        if (arr_So['tram'].length >= 3 || arr_So['nghin'] > 0)
                            result += ' ' + doc3so(arr_So['tram'], decimal);
                        else if (arr_So['tram'].length >= 2)
                            result += ' ' + doc2so(arr_So['tram'], decimal);
                        else result += ' ' + doc1so(arr_So['tram']);
                    }
                }
            }

            return result;
        }

        function doc(so: any) {
            var kytuthapphan = ".";
            var result = '';
            if (so != undefined) {
                so = " " + so + " ";
                so = so.trim();
                var cautrucso = so.split(kytuthapphan);
                if (cautrucso[0] != undefined) {
                    result += docsonguyen(cautrucso[0]);
                }
                if (cautrucso[1] != undefined) {
                    //alert(this.docsonguyen(cautrucso[1]));
                    result += ' phẩy' + docsonguyen(cautrucso[1], true);
                }
            }

            return result;
        }
    }
}