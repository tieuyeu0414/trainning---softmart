import * as Enums from "./Enums";
import iKeyValuePair from "../Interfaces/iKeyValuePair";
import { LatLngTuple } from "leaflet";
import { awf_RefType } from "./Enums";
import { StaticRouter } from "react-router-dom";

export default class SMX {
    static StoreName = class {
        static GlobalStore = "GlobalStore";
    };

    static MIN_DATE = new Date(1900, 1, 1)

    static SMX_PageSize = 20;
    //cấu hình type giữ bộ fillter tìm kiếm trang danh sách
    static Screen = class {
        static Lenh_ToanHang = 1;
        static Lenh_LichSu = 2;
        static Lenh_ChuaHoanThanh = 3;
        static DN_DVKD = 4;

        static Config_Area = 10;
        static BookingRoom = 11;
    };
    // Bộ const cho Width, Height, Các số Max, Min, ...

    static Const = class {
        static PopupNhapBangKe_Width = 1200;
        static PopupDisplayBangKe_Width = 900;
        static MAX_VALUE_MONEY = 2147483647;
        static MAX_INT = 2147483647;
    };
    static Currency = class {
        static CurrencyVND = 'VND';
        static CurrencyUSD = 'USD';
    };
    static MethodType = class {
        static Tien = 1;
        static TaiSan = 2;
    };
    static ReportingStatus = class {
        static readonly dicName: iKeyValuePair<Enums.ReportingStatus, string>[] = [
            { Key: Enums.ReportingStatus.Open, Value: "Chưa xử lý" },
            { Key: Enums.ReportingStatus.Processing, Value: "Đang xử lý" },
            { Key: Enums.ReportingStatus.Fail, Value: "Lỗi" },
            { Key: Enums.ReportingStatus.Success, Value: "Hoàn thành" },
        ];
        static readonly dicStyle: iKeyValuePair<Enums.ReportingStatus, string>[] = [
            { Key: Enums.ReportingStatus.Open, Value: "#000000" },
            { Key: Enums.ReportingStatus.Processing, Value: "#FFCC00" },
            { Key: Enums.ReportingStatus.Fail, Value: "#FF0000" },
            { Key: Enums.ReportingStatus.Success, Value: "#0000FF" },
        ];
    };

    static BanTin = class {
        static dicLoai: iKeyValuePair<Enums.BanTin_Loai, string>[] = [
            { Key: Enums.BanTin_Loai.Text, Value: 'Text' },
            { Key: Enums.BanTin_Loai.Image, Value: 'Image' },
            { Key: Enums.BanTin_Loai.Video, Value: 'Video' },
        ]

        static dicTrangThai: iKeyValuePair<Enums.BanTin_TrangThai, string>[] = [
            { Key: Enums.BanTin_TrangThai.MoiTao, Value: 'Mới tạo' },
            { Key: Enums.BanTin_TrangThai.GuiDuyet, Value: 'Gửi duyệt' },
            { Key: Enums.BanTin_TrangThai.DaDuyet, Value: 'Đã duyệt' },
            { Key: Enums.BanTin_TrangThai.DaXuatBan, Value: 'Đã xuất bản' },
            { Key: Enums.BanTin_TrangThai.NgungSuDung, Value: 'Ngừng sử dụng' },
        ]

        static dicTrangThai_Color: iKeyValuePair<Enums.BanTin_TrangThai, string>[] = [
            { Key: Enums.BanTin_TrangThai.MoiTao, Value: "#000000" },
            { Key: Enums.BanTin_TrangThai.GuiDuyet, Value: "#FFCC00" },
            { Key: Enums.BanTin_TrangThai.DaDuyet, Value: "#0000FF" },
            { Key: Enums.BanTin_TrangThai.DaXuatBan, Value: "#10B300" },
            { Key: Enums.BanTin_TrangThai.NgungSuDung, Value: "#FF0000" },
        ]
    }

    static LichLamViec = class {
        static dicTrangThai: iKeyValuePair<Enums.LichLamViec_TrangThai, string>[] = [
            { Key: Enums.LichLamViec_TrangThai.MoiTao, Value: 'Mới tạo' },
            { Key: Enums.LichLamViec_TrangThai.GuiDuyet, Value: 'Gửi duyệt' },
            { Key: Enums.LichLamViec_TrangThai.DaDuyet, Value: 'Đã duyệt' },
            { Key: Enums.LichLamViec_TrangThai.DaXuatBan, Value: 'Đã xuất bản' },
            { Key: Enums.LichLamViec_TrangThai.NgungSuDung, Value: 'Ngừng sử dụng' },
        ]

        static dicTrangThai_Color: iKeyValuePair<Enums.LichLamViec_TrangThai, string>[] = [
            { Key: Enums.LichLamViec_TrangThai.MoiTao, Value: "#000000" },
            { Key: Enums.LichLamViec_TrangThai.GuiDuyet, Value: "#FFCC00" },
            { Key: Enums.LichLamViec_TrangThai.DaDuyet, Value: "#0000FF" },
            { Key: Enums.LichLamViec_TrangThai.DaXuatBan, Value: "#10B300" },
            { Key: Enums.LichLamViec_TrangThai.NgungSuDung, Value: "#FF0000" },
        ]
    }

    static Traffic_PaperStatus = class {
        static dicTrangThai: iKeyValuePair<Enums.Traffic_PaperStatus, string>[] = [
            { Key: Enums.Traffic_PaperStatus.MoiTao, Value: 'Mới tạo' },
            { Key: Enums.Traffic_PaperStatus.ChoDuyet, Value: 'Chờ duyệt' },
            { Key: Enums.Traffic_PaperStatus.DaDuyet, Value: 'Đã duyệt' },
            { Key: Enums.Traffic_PaperStatus.DaTuChoi, Value: 'Đã từ chối' },
        ]

        static dicTrangThai_Color: iKeyValuePair<Enums.Traffic_PaperStatus, string>[] = [
            { Key: Enums.Traffic_PaperStatus.MoiTao, Value: "#000000" },
            { Key: Enums.Traffic_PaperStatus.ChoDuyet, Value: "#FFCC00" },
            { Key: Enums.Traffic_PaperStatus.DaDuyet, Value: "#0000FF" },
            { Key: Enums.Traffic_PaperStatus.DaTuChoi, Value: "#FF0000" },
        ]
    }

    static ImportCollateralREQStatus = class {
        static dicTrangThai: iKeyValuePair<Enums.EImportCollateralREQStatus, string>[] = [
            { Key: Enums.EImportCollateralREQStatus.MoiTao, Value: 'Tạo mới' },
            { Key: Enums.EImportCollateralREQStatus.ChoDuyet, Value: 'Trình phê duyệt' },
            { Key: Enums.EImportCollateralREQStatus.DaDuyet, Value: 'Phê duyệt' },
            { Key: Enums.EImportCollateralREQStatus.TuChoi, Value: 'Từ chối' },
        ]

        static dicTrangThai_Color: iKeyValuePair<Enums.EImportCollateralREQStatus, string>[] = [
            { Key: Enums.EImportCollateralREQStatus.MoiTao, Value: "#000000" },
            { Key: Enums.EImportCollateralREQStatus.ChoDuyet, Value: "#FFCC00" },
            { Key: Enums.EImportCollateralREQStatus.DaDuyet, Value: "#0000FF" },
            { Key: Enums.EImportCollateralREQStatus.TuChoi, Value: "#FF0000" },
        ]
    }

    // Trạng thái Yes/No
    static YesNo = class {
        static Yes = true;
        static No = false;

        static dicName: iKeyValuePair<boolean, string>[] = [
            { Key: true, Value: "Có" },
            { Key: false, Value: "Không" },
        ];

        static dicIsValid: iKeyValuePair<boolean, string>[] = [
            { Key: true, Value: "Còn hiệu lực" },
            { Key: false, Value: "Hết hiệu lực" },
        ];
    };

    static Du_KhongDu = class {
        static Du = true;
        static KhongDu = false;

        static dicName: iKeyValuePair<boolean, string>[] = [
            { Key: true, Value: "Đủ " },
            { Key: false, Value: "Không đủ" },
        ];
    };

    // Trạng thái Yes/No kiểu int (1:Có, 0:Không)
    static YesNoInt = class {
        static Yes = 1;
        static No = 0;

        static dicName: iKeyValuePair<number, string>[] = [
            { Key: 1, Value: "Có" },
            { Key: 0, Value: "Không" },
        ];
    };
    //cấu hình các phím tắt tương ứng vs giá trị
    static MoneyFast = class {
        static readonly dicName: iKeyValuePair<string, number>[] = [
            { Key: "m", Value: 1000000 },
            { Key: "b", Value: 1000000000 },
        ];
    };
    // Giới tính
    static Gender = class {
        static readonly dicName: iKeyValuePair<Enums.Gender, string>[] = [
            { Key: Enums.Gender.Male, Value: "Nam" },
            { Key: Enums.Gender.Female, Value: "Nữ" },
            { Key: Enums.Gender.Other, Value: "Khác" },
        ];
    };
    // loại KH
    static CustomerType = class {
        static readonly dicName: iKeyValuePair<number, string>[] = [
            { Key: Enums.CustomerType.Person, Value: "Cá nhân" },
            { Key: Enums.CustomerType.Company, Value: "Doanh nghiệp" },
        ];
    };
    // loại nguồn
    static AttachmentSource = class {
        static readonly dicName: iKeyValuePair<number, string>[] = [
            { Key: Enums.AttachmentSource.ECM, Value: "ECM" },
            { Key: Enums.AttachmentSource.BPM, Value: "BPM" },
        ];
    };

    //Loại chủ sở hữu 
    static OwnerType = class {
        static readonly dicName: iKeyValuePair<number, string>[] = [
            { Key: Enums.OwnerType.CaNhan, Value: "Cá nhân" },
            { Key: Enums.OwnerType.HoGiaDinh, Value: "Hộ gia đình" },
            { Key: Enums.OwnerType.HoKinhDoanh, Value: "Hộ kinh doanh" },
            { Key: Enums.OwnerType.DoanhNghiep, Value: "Doanh nghiệp" },
        ];
    }

    static Emp_AuthenticationType = class {
        static readonly dicName: iKeyValuePair<Enums.AuthenticationType, string>[] = [
            { Key: Enums.AuthenticationType.AD, Value: "AD" },
            { Key: Enums.AuthenticationType.Local, Value: "Local" },
        ];
    };

    //booking room
    static LichHop_TrangThai = class {
        static readonly dicName: iKeyValuePair<Enums.LichHop_TrangThai, string>[] = [
            { Key: Enums.LichHop_TrangThai.TaoMoi, Value: "Mới tạo" },
            { Key: Enums.LichHop_TrangThai.DangDuyet, Value: "Đang duyệt" },
            { Key: Enums.LichHop_TrangThai.DaDuyet, Value: "Đã duyệt" },
            { Key: Enums.LichHop_TrangThai.Huy, Value: "Hủy" },
        ];
        static readonly dicColor: iKeyValuePair<Enums.LichHop_TrangThai, string>[] = [
            { Key: Enums.LichHop_TrangThai.TaoMoi, Value: "#000000" },
            { Key: Enums.LichHop_TrangThai.DangDuyet, Value: "#FFCC00" },
            { Key: Enums.LichHop_TrangThai.DaDuyet, Value: "#0000FF" },
            { Key: Enums.LichHop_TrangThai.Huy, Value: "#FF0000" },
        ];
    };
    // Bộ trạng thái kích hoạt
    static ActiveStatus = class {
        static readonly dicColor: iKeyValuePair<Enums.ActiveStatus, string>[] = [
            { Key: Enums.ActiveStatus.Active, Value: "#10B300" },
            { Key: Enums.ActiveStatus.InActivate, Value: "#e7090f" },
        ];

        static readonly dicName: iKeyValuePair<Enums.ActiveStatus, string>[] = [
            { Key: Enums.ActiveStatus.Active, Value: "Đang hoạt động" },
            { Key: Enums.ActiveStatus.InActivate, Value: "Không hoạt động" },
        ];

        static readonly dicSearchItem: iKeyValuePair<Enums.ActiveStatus | null, string>[] = [
            { Key: null, Value: "--- Tất cả ---" },
            { Key: Enums.ActiveStatus.Active, Value: "Đang hoạt động" },
            { Key: Enums.ActiveStatus.InActivate, Value: "Không hoạt động" },
        ];

        static readonly dctSearchNotarizingStatus: iKeyValuePair<number | null, string>[] = [
            { Key: null, Value: "--- Tất cả ---" },
            { Key: 1, Value: "Đang hoạt động" },
            { Key: 0, Value: "Không hoạt động" },
        ];
    };

    static ConfigRight = class {
        static readonly dicName: iKeyValuePair<Enums.ConfigRight, string>[] = [
            { Key: Enums.ConfigRight.GroupUser, Value: "Nhóm người dùng" },
            { Key: Enums.ConfigRight.User, Value: "Người dùng" },
        ];
    };

    static MessageCode = class {
        //header
        static headerWarn = "Cảnh báo!";
        static headerInfo = "Thông báo!";
        //type
        static success: string = "success";
        static info = "info";
        static warn = "warn";
        static error = "error";
    };


    static CalendarSheet_Dictionary = class {

        static readonly Months: iKeyValuePair<number, string>[] = [
            { Key: 1, Value: "1" },
            { Key: 2, Value: "2" },
            { Key: 3, Value: "3" },
            { Key: 4, Value: "4" },
            { Key: 5, Value: "5" },
            { Key: 6, Value: "6" },
            { Key: 7, Value: "7" },
            { Key: 8, Value: "8" },
            { Key: 9, Value: "9" },
            { Key: 10, Value: "10" },
            { Key: 11, Value: "11" },
            { Key: 12, Value: "12" }
        ]

        static readonly Days: iKeyValuePair<number, string>[] = [
            { Key: 1, Value: "1" },
            { Key: 2, Value: "2" },
            { Key: 3, Value: "3" },
            { Key: 4, Value: "4" },
            { Key: 5, Value: "5" },
            { Key: 6, Value: "6" },
            { Key: 7, Value: "7" },
            { Key: 8, Value: "8" },
            { Key: 9, Value: "9" },
            { Key: 10, Value: "10" },
            { Key: 11, Value: "11" },
            { Key: 12, Value: "12" },
            { Key: 13, Value: "13" },
            { Key: 14, Value: "14" },
            { Key: 15, Value: "15" },
            { Key: 16, Value: "16" },
            { Key: 17, Value: "17" },
            { Key: 18, Value: "18" },
            { Key: 19, Value: "19" },
            { Key: 20, Value: "20" },
            { Key: 21, Value: "21" },
            { Key: 22, Value: "22" },
            { Key: 23, Value: "23" },
            { Key: 24, Value: "24" },
            { Key: 25, Value: "25" },
            { Key: 26, Value: "26" },
            { Key: 27, Value: "27" },
            { Key: 28, Value: "28" },
            { Key: 29, Value: "29" },
            { Key: 30, Value: "30" },
            { Key: 31, Value: "31" }

        ]

        static readonly Hours: iKeyValuePair<number, string>[] = [
            { Key: 0, Value: "0" },
            { Key: 1, Value: "1" },
            { Key: 2, Value: "2" },
            { Key: 3, Value: "3" },
            { Key: 4, Value: "4" },
            { Key: 5, Value: "5" },
            { Key: 6, Value: "6" },
            { Key: 7, Value: "7" },
            { Key: 8, Value: "8" },
            { Key: 9, Value: "9" },
            { Key: 10, Value: "10" },
            { Key: 11, Value: "11" },
            { Key: 12, Value: "12" },
            { Key: 13, Value: "13" },
            { Key: 14, Value: "14" },
            { Key: 15, Value: "15" },
            { Key: 16, Value: "16" },
            { Key: 17, Value: "17" },
            { Key: 18, Value: "18" },
            { Key: 19, Value: "19" },
            { Key: 20, Value: "20" },
            { Key: 21, Value: "21" },
            { Key: 22, Value: "22" },
            { Key: 23, Value: "23" },
        ]

        static readonly Minutes: iKeyValuePair<number, string>[] = [
            { Key: 0, Value: "00" },
            { Key: 1, Value: "01" },
            { Key: 2, Value: "02" },
            { Key: 3, Value: "03" },
            { Key: 4, Value: "04" },
            { Key: 5, Value: "05" },
            { Key: 6, Value: "06" },
            { Key: 7, Value: "07" },
            { Key: 8, Value: "08" },
            { Key: 9, Value: "09" },
            { Key: 10, Value: "10" },
            { Key: 11, Value: "11" },
            { Key: 12, Value: "12" },
            { Key: 13, Value: "13" },
            { Key: 14, Value: "14" },
            { Key: 15, Value: "15" },
            { Key: 16, Value: "16" },
            { Key: 17, Value: "17" },
            { Key: 18, Value: "18" },
            { Key: 19, Value: "19" },
            { Key: 20, Value: "20" },
            { Key: 21, Value: "21" },
            { Key: 22, Value: "22" },
            { Key: 23, Value: "23" },
            { Key: 24, Value: "24" },
            { Key: 25, Value: "25" },
            { Key: 26, Value: "26" },
            { Key: 27, Value: "27" },
            { Key: 28, Value: "28" },
            { Key: 29, Value: "29" },
            { Key: 30, Value: "30" },
            { Key: 31, Value: "31" },
            { Key: 32, Value: "32" },
            { Key: 33, Value: "33" },
            { Key: 34, Value: "34" },
            { Key: 35, Value: "35" },
            { Key: 36, Value: "36" },
            { Key: 37, Value: "37" },
            { Key: 38, Value: "38" },
            { Key: 39, Value: "39" },
            { Key: 40, Value: "40" },
            { Key: 41, Value: "41" },
            { Key: 42, Value: "42" },
            { Key: 43, Value: "43" },
            { Key: 44, Value: "44" },
            { Key: 45, Value: "45" },
            { Key: 46, Value: "46" },
            { Key: 47, Value: "47" },
            { Key: 48, Value: "48" },
            { Key: 49, Value: "49" },
            { Key: 50, Value: "50" },
            { Key: 51, Value: "51" },
            { Key: 52, Value: "52" },
            { Key: 53, Value: "53" },
            { Key: 54, Value: "54" },
            { Key: 55, Value: "55" },
            { Key: 56, Value: "56" },
            { Key: 57, Value: "57" },
            { Key: 58, Value: "58" },
            { Key: 59, Value: "59" },

        ]
    }

    static DayOfWeek = class {
        static readonly dicName: iKeyValuePair<Enums.DayOfWeek, string>[] = [
            { Key: Enums.DayOfWeek.Thu2, Value: "Thứ 2" },
            { Key: Enums.DayOfWeek.Thu3, Value: "Thứ 3" },
            { Key: Enums.DayOfWeek.Thu4, Value: "Thứ 4" },
            { Key: Enums.DayOfWeek.Thu5, Value: "Thứ 5" },
            { Key: Enums.DayOfWeek.Thu6, Value: "Thứ 6" },
            { Key: Enums.DayOfWeek.Thu7, Value: "Thứ 7" },
            { Key: Enums.DayOfWeek.ChuNhat, Value: "Chủ Nhật" },
        ];
    };

    static OrganizationLevelType = class {
        static readonly dicName: iKeyValuePair<Enums.OrganizationLevel, string>[] = [
            { Key: Enums.OrganizationLevel.Compary, Value: "Công ty" },
            { Key: Enums.OrganizationLevel.BusinessUnit, Value: "Cấp ban" },
            { Key: Enums.OrganizationLevel.Division, Value: "Cấp phòng" },
            { Key: Enums.OrganizationLevel.Team, Value: "Cấp tổ" },
            { Key: Enums.OrganizationLevel.SubTeam, Value: "Cấp nhóm" },
        ];
    };

    static DynamicReport_KhoGiay = class {
        static readonly dicName: iKeyValuePair<Enums.DynamicReport_KhoGiay, string>[] = [
            { Key: Enums.DynamicReport_KhoGiay.A4, Value: "A4" },
            { Key: Enums.DynamicReport_KhoGiay.A5, Value: "A5" },
        ];
    };

    static DynamicReport_HuongGiay = class {
        static readonly dicName: iKeyValuePair<Enums.DynamicReport_HuongGiay, string>[] = [
            { Key: Enums.DynamicReport_HuongGiay.Landscape, Value: "Ngang" },
            { Key: Enums.DynamicReport_HuongGiay.Portrait, Value: "Dọc" },
        ];
    };

    static DynamicReport_Status = class {
        static readonly dicName: iKeyValuePair<Enums.DynamicReport_Status, string>[] = [
            { Key: Enums.DynamicReport_Status.SuDung, Value: "Sử dụng" },
            { Key: Enums.DynamicReport_Status.NgungSuDung, Value: "Không sử dụng" },
        ];
        static readonly dicColor: iKeyValuePair<Enums.DynamicReport_Status, string>[] = [
            { Key: Enums.DynamicReport_Status.SuDung, Value: "#10B300" },
            { Key: Enums.DynamicReport_Status.NgungSuDung, Value: "#e7090f" },
        ];
    };

    static QueryStringParams = class {
        static CommandType = "commandType";
        static FundID = "fundID";
        static ID = "ID";
        static Type = "type";
    };

    static TransactionDeclareOutsidePermission_Status = class {
        static readonly dicName: iKeyValuePair<boolean | null, string>[] = [
            { Key: null, Value: "Tất cả" },
            { Key: true, Value: "Còn hiệu lực" },
            { Key: false, Value: "Hết hiệu lực" },
        ];
    }

    static ApiActionCode = class {
        static SetupViewForm = "SetupViewForm";
        static SetupAddNewTTB1Form = "SetupAddNewTTB1Form";
        static GetListEquipmentType = "GetListEquipmentType";
        static SearchData = "SearchData";
        static ExportExcel = "ExportExcel";
        static ExportWord = "ExportWord";
        static ImportExcel = "ImportExcel";
        static CanhBaoBKTam_DeNghi = "CanhBaoBKTam_DeNghi";
        static CanhBaoBKThat_DeNghi = "CanhBaoBKThat_DeNghi";
        static SetupAddNewForm = "SetupAddNewForm";
        static AddNewItem = "AddNewItem";
        static GetDenomination = "GetDenomination";
        static GetCommand = "GetCommand";
        static SetupEditForm = "SetupEditForm";
        static UpdateItem = "UpdateItem";
        static SetupFinish = "SetupFinish";
        static Finish = "Finish";
        static BanInHachToanThuPhi = "BanInHachToanThuPhi";
        static BanInHachToanTaiSanNhapKho = "BanInHachToanTaiSanNhapKho";
        static BanInHachToanTaiSanXuatKho = "BanInHachToanTaiSanXuatKho";

        static SetupDisplay = "SetupDisplay";
        static DeleteItem = "DeleteItem";
        static ChangeStatus = "ChangeStatus";
        static AddStoreEmloyee = "AddStoreEmloyee";
        static DeleteStoreEmloyee = "DeleteStoreEmloyee";
        static ChangeStore = "ChangeStore";
        static RequestDeleteItem = "RequestDeleteItem";
        static BorrowDocument = "BorrowDocument";
        static ReturnDocument = "ReturnDocument";
        //organization

        static GetOrganizationManager = "GetOrganizationManager";
        static GetOrganizationEmployee = "GetOrganizationEmployee";
        static GetOrganizationSupporter = "GetOrganizationSupporter";
        static AddOrganizationManager = "AddOrganizationManager";
        static AddOrganizationEmployee = "AddOrganizationEmployee";
        static AddOrganizationSupporter = "AddOrganizationSupporter";
        static DeleteOrganizationEmployee = "DeleteOrganizationEmployee";
        static DeleteOrganizationManager = "DeleteOrganizationManager";
        static DeleteOrganizationSupporter = "DeleteOrganizationSupporter";

        static UpdateItemHMFinal = "UpdateItemHMFinal";//dùng cho hạn mức atm cho trung tâm thẻ quản lý

        static CheckHubInfo = "CheckHubInfo"; //kiểm tra Hub chức năng display trên HO luồng 3
        static Reception = "Reception"; //tiếp nhận
        static Resubmit = "Resubmit";
        public onResubmitFlexCash = "onResubmitFlexCash";
        static GetCommandQueue = "GetCommandQueue";
        static CheckTSDamBaoT24 = "CheckTSDamBaoT24";
        static SaveImage = "SaveImage";
        static SetupPermissionItemViewForm = "SetupPermissionItemViewForm";
        //command
        static SetupViewForm_DanhSachYeuCau = "SetupViewForm_DanhSachYeuCau";
        static SearchData_DanhSachYeuCau = "SearchData_DanhSachYeuCau";
        static SetupDisplay_DanhSachYeuCau = "SetupDisplay_DanhSachYeuCau";
        //command fund - TabFundInfo component
        static GetCommandFundForHubInfo = "GetCommandFundForHubInfo";
        static GetCommandDetailForHubAndFundInfo = "GetCommandDetailForHubAndFundInfo";
        //luong nội bộ
        static SetupAddNewForm_GDV = "SetupAddNewForm_GDV";
        static AddNewItem_GDV = "AddNewItem_GDV";
        static AddNewItems_GDV_MidDay = "AddNewItems_GDV_MidDay";
        static AddNewItems_GDV_EndDay = "AddNewItems_GDV_EndDay";

        //CreditLimit -extend
        static SetupListLimitLineCode = "SetupListLimitLineCode";
        static ImportCreditLimit = "ImportCreditLimit";
        static ListCreditLimitMain = "ListCreditLimitMain";
        static ViewCreditLimitMain = "ViewCreditLimitMain";
        static SetUpMapProductToCollateral = "SetUpMapProductToCollateral";
        static MapProductToCollateral = "MapProductToCollateral";
        static DeleteMapProductToCollateral = "DeleteMapProductToCollateral";
        static ViewDetailMainCreditLimit = "ViewDetailMainCreditLimit";
        static SetUpUseCreditLimitDetail = "SetUpUseCreditLimitDetail";
        static SaveCreditLimitDetail = "SaveCreditLimitDetail";
        static RefreshCollateral = "RefreshCollateral";

        static ExportCreditLimitMain = "ExportCreditLimitMain";

        //đảo chấp 
        static GetListDetailForReplace = "GetListDetailForReplace";
        static GetCollateralForReplace = "GetCollateralForReplace";
        static UseCollateralForReplace = "UseCollateralForReplace";
        static SaveCreditLimitReplace = "SaveCreditLimitReplace";
        static StoreExport = "StoreExport";

        static SetupFormDetailMainCreditLimit = "SetupFormDetailMainCreditLimit";
        static SaveDetailMainCreditLimit = "SaveDetailMainCreditLimit";

        static SearchCreditLimitBPM = "SearchCreditLimitBPM";
        static SaveDataOnBPM = "SaveDataOnBPM";

        static SearchCollateralLimit = "SearchCollateralLimit";
        static AddCollateralContract = "AddCollateralContract";
        static ListUnBalanceCollateral = "ListUnBalanceCollateral";
        static SearchUnBalanceCollateral = "SearchUnBalanceCollateral";
        static ListWaitingAdjustment = "ListWaitingAdjustment";
        static SearchWaitingAdjustment = "SearchWaitingAdjustment";
        static ListContractNoneMortgage = "ListContractNoneMortgage";
        static SearchContractNoneMortgage = "SearchContractNoneMortgage";
        static ExportExcelCollateral = "ExportExcelCollateral";
        static ExportExcelCustomer = "ExportExcelCustomer";

        //MortgageContractCustomer 
        static CheckCustomerByCode = "CheckCustomerByCode";
        static CheckCustomerByIdentification = "CheckCustomerByIdentification";

        //PrintingRole
        static ExportTemplatePrintingRole = "ExportTemplatePrintingRole";

        //Collateral Document 
        static LoadDocumentData = "LoadDocumentData";
        static LoadDocumentDataCollateralInit = "LoadDocumentDataCollateralInit";
        static LoadDocumentDataImportCollateraREQ = "LoadDocumentDataImportCollateraREQ";
        static LoadDocumentApprovingImportCollateraREQ = "LoadDocumentApprovingImportCollateraREQ";
        static LoadDocumentDataExportCollateral = "LoadDocumentDataExportCollateral";
        static GetListDocumentDetail = "GetListDocumentDetail";
        static UpdateFileDetail = "UpdateFileDetail";
        static GetdetailMedia = "GetdetailMedia";
        static UploadFile = "UploadFile";
        static UploadSingleFile = "UploadSingleFile";
        static UploadSingleFileImage = "UploadSingleFileImage";
        static DeleteFile = "DeleteFile";
        static GetAttachmentInfo = "GetAttachmentInfo";
        static GetAttachmentInfoImage = "GetAttachmentInfoImage";

        //Bank info
        static GetOfficeByOrgID = "GetOfficeByOrgID";
        static GetEmployeeInfo = "GetEmployeeInfo";
        static GetRepresentativeInfo = "GetRepresentativeInfo";
        static GetListRepresentativeMC = "GetListRepresentativeMC";
        static GetListRepresentativeCC = "GetListRepresentativeCC";
        static GetListRepresentativeOT = "GetListRepresentativeOT";

        //SigningContract
        static GetSigningDisplay = "GetSigningDisplay";
        static ShowUpDateSigning = "ShowUpDateSigning";
        static UpdateResult = "UpdateResult";
        static GetListDistrict = "GetListDistrict";
        static GetListEmployee = "GetListEmployee";
        //Notarizing 
        static GetNotarizingDisplay = "GetNotarizingDisplay";
        static ShowUpDateNotarizing = "ShowUpDateNotarizing";
        static UpdateNotarizingResult = "UpdateNotarizingResult";
        static GetCompanyInfo = "GetCompanyInfo";

        //MortgageRegistration 
        static SetUpOnlineForm = "SetUpOnlineForm";
        static SetUpOfflineForm = "SetUpOfflineForm";
        static SetUpFormByMethod = "SetUpFormByMethod";
        static ShowUpDateRegistration = "ShowUpDateRegistration";
        static UpdateRegistrationResult = "UpdateRegistrationResult";

        // Block Collateral
        static ShowUpDateBlockCollateral = "ShowUpDateBlockCollateral";
        static GetBlockCollateralDisplay = "GetBlockCollateralDisplay";
        static UpdateBlockCollateralResult = "UpdateBlockCollateralResult";

        //OtherMortgageMethod 
        static ShowUpDateOtherMethod = "ShowUpDateOtherMethod";
        static GetOtherMethodDisplay = "GetOtherMethodDisplay";
        static UpdateOtherMethodResult = "UpdateOtherMethodResult";

        //static SearchCollateralContract = "";

        //yeu cau
        static Approve_YeuCau = "Approve_YeuCau";
        static Reject_YeuCau = "Reject_YeuCau";
        static Reject_DeNghi = "Reject_DeNghi";

        // Arrange Car
        static SetupViewTransportTracking = "SetupViewTransportTracking";
        static TrackingDisplay = "TrackingDisplay";
        static TransportTracking = "TransportTracking";
        static SearchData_CommandsByRoute = "SearchData_CommandsByRoute";
        static SearchData_CommandsGiuaCacHub = "SearchData_CommandsGiuaCacHub";
        static SetupPopupRouteSelect = "SetupPopupRouteSelect";
        static SetupPopupEmployeeSelect = "SetupPopupEmployeeSelect";

        //route
        static SetupDisplayMap = "SetupDisplayMap";
        //  static GetFundByHubID = "GetFundByHubID";
        static GetFundNotConfigured = "GetFundNotConfigured";

        //email template
        static GetEmailTemplateByID = "GetEmailTemplateByID";
        static DeleteEmailtemplate = "DeleteEmailtemplate";

        //organization
        static GetOrganizationTreeData = "GetOrganizationTreeData";

        // right
        static GetItemsForView = "GetItemsForView";
        static SaveItem = "SaveItem";

        // Committee
        static SearchCommittee = "SearchCommittee";
        static DeleteCommittee = "DeleteCommittee";
        static UpdateCommittee = "UpdateCommittee";
        static AddNewCommittee = "AddNewCommittee";

        // Employee
        static SearchData_Approximate = "SearchData_Approximate";

        static SearchAll = "SearchAll";
        static SearchByFund = "SearchByFund";
        static SearchByFund_EmployeeType = "SearchByFund_EmployeeType";
        static GetInchargingAuthorities = "GetInchargingAuthorities";
        static SearchEmployeeByOrganization = "SearchEmployeeByOrganization";
        static SearchByStore = "SearchByStore";

        static SearchOrganizationByCurrentUser = "SearchOrganizationByCurrentUser";
        static SearchCMCEmployee = "SearchCMCEmployee";
        static SearchCBAT = "SearchCBAT";

        // UC employee cho phê duyệt nhập kho
        static XuatKho_NguoiPheDuyetTinDung = "XuatKho_NguoiPheDuyetTinDung";
        static XuatKho_NguoiPheDuyetXuatKho = "XuatKho_NguoiPheDuyetXuatKho";

        // UC Collateral - tìm tài sản
        static SearchCollateal_ByStatus = "SearchCollateal_ByStatus";

        // Command Transport
        static KhoiHanh = "KhoiHanh";
        static XacNhanChuyen = "XacNhanChuyen"; // Nhận lệnh
        static XacNhanNiemPhong = "XacNhanNiemPhong"; // Trả lệnh

        // Attachment
        static Upload = "Upload";
        static UploadLimitationATM = "UploadLimitationATM";

        static Report_NSLD_TheoCaNhan = "Report_NSLD_TheoCaNhan";
        static Report_NSLD_TongHopTheoCaNhan = "Report_NSLD_TongHopTheoCaNhan";
        static Report_NSLD_TongHopToanHang = "Report_NSLD_TongHopToanHang";
        static Upload_Price = "Upload_Price";
        static GetListAttachment = "GetListAttachment";
        static UpdateAttachment = "UpdateAttachment";
        static DeleteAttachment = "DeleteAttachment";

        // TransportBox
        static GetCommandBoxDetail = "GetCommandBoxDetail";
        static UpdateCommandBoxDetail = "UpdateCommandBoxDetail";

        static LuuBKTienThua = "LuuBKTienThua";
        static XemBKTienThua = "XemBKTienThua";

        static XacNhanBBBangKe = "XacNhanBBBangKe";
        static PheDuyetBBBangKe = "PheDuyetBBBangKe";
        static GuiXacNhanBB = "GuiXacNhanBB";

        static SetupFormXacNhanBangKe = "SetupFormXacNhanBangKe";
        static XacNhanBangKe = "XacNhanBangKe";
        static XemBangKe = "XemBangKe";
        static SuaBangKe = "SuaBangKe";
        static XuatBieuMau = "XuatBieuMau";
        static DownloadTemplate = "DownloadTemplate";
        static DownloadSavedFile = "DownloadSavedFile";
        static InPhieuDenghiTiep = "InPhieuDenghiTiep";
        static InPhieuDenghiHoan = "InPhieuDenghiHoan";
        static InPhieuBBKiemQuyCuoiNgay = "InPhieuBBKiemQuyCuoiNgay";
        static XuatBieuMauTCTD = "XuatBieuMauTCTD";
        static PL_08_Lenh_DieuChuyen_ACQT = "PL_08_Lenh_DieuChuyen_ACQT";
        static MB3a = "MB3a";
        static XuatPhieuNhapKho = "XuatPhieuNhapKho";
        static XuatPhieuXuatKho = "XuatPhieuXuatKho";
        static XuatChiTietBK = "XuatChiTietBK";

        //Bảng kê
        static NhapBangKe = "NhapBangKe";
        static GuiPheDuyetBK = "GuiPheDuyetBK";
        static DuyetBangKe = "DuyetBangKe";
        //Bảng kê cũ
        static NhapBangKeCu = "NhapBangKeCu";
        static GuiPheDuyetBKCu = "GuiPheDuyetBKCu";
        static DuyetBangKeCu = "DuyetBangKeCu";

        static XemBangKeTam = "XemBangKeTam";
        static NhapBangKeTam = "NhapBangKeTam";

        //từ chối
        static TuChoiXacNhanBB = "TuChoiXacNhanBB";
        static TuChoiDuyetBK = "TuChoiDuyetBK";
        static TuChoiDuyetBKCu = "TuChoiDuyetBKCu";
        static ChotSoDu = "ChotSoDu";
        static XemSoDu = "XemSoDu";
        // Transport
        static SetupPopupCommandSelect = "SetupPopupCommandSelect";
        static SetupPopupCarSelect = "SetupPopupCarSelect";
        static LuuChonNhanSuXe = "LuuChonNhanSuXe";
        static HoanThanhChonNhanSuXe = "HoanThanhChonNhanSuXe";

        // Bộ phê duyệt - BEGIN
        static SetupBeforeSubmit = "SetupBeforeSubmit"; // Setup dữ liệu trước khi yêu cầu duyệt
        static RequestForAppoval = "RequestForAppoval"; // Thực hiện yêu cầu phê duyệt
        static SetupBeforeApprove = "SetupBeforeApprove"; // Setup dữ liệu trước khi duyệt
        static Approve = "Approve"; // Thực hiện duyệt
        static Reject = "Reject"; // Thực hiện từ chối
        static Cancel = "Cancel"; // Thực hiện Hủy (VD: Hủy ĐN đã được phê duyệt)
        static ChiDinhHub = "ChiDinhHub";
        static Confirm = "Confirm"; // Xác nhận
        // Bộ phê duyệt - END

        // ImportStore 
        static HTTDApprove = "HTTDApprove";
        static HTTDReject = "HTTDReject";
        static DVKHApprove_KhoDVKD = "DVKHApprove_KhoDVKD";
        static DVKHApprove_KhoQuyCoDVKH = "DVKHApprove_KhoQuyCoDVKH";
        static DVKHReject = "DVKHReject";
        static NhapTemNiemPhong = "NhapTemNiemPhong";
        static DuyetLuu = "DuyetLuu";
        static BGCanBoPhuTrachTS = "BGCanBoPhuTrachTS";
        static BanGiaoHSChoCBAT = "BanGiaoHSChoCBAT";
        static DoiKhoLuu = "DoiKhoLuu";
        static StoreImport = "StoreImport";
        static TuChoiLuuKho = "TuChoiLuuKho";

        // ExportStore 
        static BanGiaoChoKhachHang = "BanGiaoChoKhachHang";
        static CanBoTPBNhanBanGiao = "CanBoTPBNhanBanGiao";
        static DVKHTiepNhan = "DVKHTiepNhan";
        static QLKhoApprove = "QLKhoApprove"; // Thực hiện duyệt
        static QLKhoReject = "QLKhoReject"; // Thực hiện từ chối
        static HoanTraBiCu = "HoanTraBiCu"; // Thực hiện từ chối

        // Lấy danh sách ấn chỉ hỏng
        // static LayAnChiHongT24 = "LayAnChiHongT24";
        static CallHuyAnChi = "CallHuyAnChi";
        static GetT24Trans = "GetT24Trans";
        // tính hạn mức atm
        static TinhHanMuc = "TinhHanMuc";

        // lấy danh sách TTB của Đơn vị và HO
        static SearchDataReportEquipmentDonVi = "SearchDataReportEquipmentDonVi";
        static SearchDataReportEquipmentHO = "SearchDataReportEquipmentHO";

        static UploadLimitationHubDoanhSoChi = "UploadLimitationHubDoanhSoChi";
        static UploadLimitationHub = "UploadLimitationHub";

        static GetAllChiNhanh = "GetAllChiNhanh";
        //footer
        static GetAppInfomation = "GetAppInfomation";

        // report
        static SetupForPopupDownloadReport = "SetupForPopupDownloadReport";
        static DownloadReport = "DownloadReport";
        static DownloadImport = "DownloadImport";
        static DownloadExcelImportErrorTemplate = "DownloadExcelImportErrorTemplate";
        static DownloadImport_Price = "DownloadImport_Price";
        static SetupListFundForFormDownloadReport = "SetupListFundForFormDownloadReport";
        static SetupListFundAndGDVForFormDownloadReport = "SetupListFundAndGDVForFormDownloadReport";
        static SetupListFundForFormDownloadReport_HUB_HO = "SetupListFundForFormDownloadReport_HUB_HO";

        static Report_LietKeGiaoDich = "Report_LietKeGiaoDich";
        static CheckT24DoiNgoaiTe = "CheckT24DoiNgoaiTe";
        static LuuThongTinTTTaoDien = "LuuThongTinTTTaoDien";
        static GetLstCurrencyFormDownloadReport = "GetLstCurrencyFormDownloadReport";
        static GetLstCommodityFormDownloadReport = "GetLstCommodityFormDownloadReport";
        static CheckT24ThongTinTTTaoDien = "CheckT24ThongTinTTTaoDien";

        static CheckVietMapPlate = "CheckVietMapPlate";

        static UploadBangKeHub = "UploadBangKeHub";

        // utility
        static CheckT24 = "CheckT24";
        static DongBoT24 = "DongBoT24";
        static DongBoAllT24 = "DongBoAllT24";
        static XacNhan = "XacNhan";

        static GetUserInfoLogging = "GetUserInfoLogging";
        static SetupTellerID = "SetupTellerID";
        static UpdateTellerID = "UpdateTellerID";
        static UpdatePass = "UpdatePass";

        static UploadImageSign = "UploadImageSign";
        static LaySoDuCuoiNgay = "LaySoDuCuoiNgay";

        // Captcha
        static Captcha = "Captcha";

        // DownloadLog
        static DownloadLog = "DownloadLog";
        static GetCarInfo = "GetCarInfo";
        static GetPhongHop = "GetPhongHop";

        // Transport Setting
        static GetActiveTransportSetting = "GetActiveTransportSetting";
        static HuyCauHinh = "HuyCauHinh";

        static GetFundChild = "GetFundChild";
        static DisplayHOView = "DisplayHOView";

        // ProcessMoneySurplus
        static AddProcess = "AddProcess";
        static EditProcess = "EditProcess";
        static DeleteProcess = "DeleteProcess";
        static GetTransactionTallyer = "GetTransactionTallyer";

        static ImportDSHangHoa = "ImportDSHangHoa";

        static KeepMonitorAlive = "KeepMonitorAlive";

        static DisplayMedia = "DisplayMedia";
        static RequestMedia = "RequestMedia";
        static UpdateMedia = "UpdateMedia";

        static Publish = "Publish";
        // DisplayCreditContractByMortgageContract
        static DisplayInMortgageContract = "DisplayInMortgageContract";
        static SetupEditFormByMortgageContractId = "SetupEditFormByMortgageContractId";
        static UpdateByMortgageContractId = "UpdateByMortgageContractId";

        //Sync Data From Mortgage Contract To Credit Contract
        static SyncBankInfo = "SyncBankInfo";
        static SyncCustomerInfo = "SyncCustomerInfo";

        // Action History
        static GetHistoryActionUrl = "GetHistoryActionUrl";
        //Insurance History
        static GetHistoryInsurance = "GetHistoryInsurance";

        //TrafficPaperHistory
        static GetHistoryTrafficPaper = "GetHistoryTrafficPaper";

        //Upload Collateral Document
        static UploadClientToServer = "UploadClientToServer";

        // lưu nháp trình nhập kho
        static SaveDraftTrinhNhapKho = "SaveDraftTrinhNhapKho";

        //Chức năng trình nhập kho ở chỉnh sửa tài sản
        static TrinhNhapKho = "TrinhNhapKho";

        //list Collateral by code (Release_Collateral)
        static CollateralByCode = "CollateralByCode";
        static ExportCollateralREQDocument = "ExportCollateralREQDocument";

        //RemoveCollateralDocument
        static RemoveCollateralDocument = "RemoveCollateralDocument";

        // Từ chối trình nhập kho
        static RejectTrinhNhapKho = "RejectTrinhNhapKho";

        // Phê duyệt trình nhập kho
        static ApprovalTrinhNhapKho = "ApprovalTrinhNhapKho";

        // trình duyệt tài sản
        static TrinhDuyetTaiSan = "TrinhDuyetTaiSan"

        // Phê duyệt tài sản
        static ApprovalCollateral = "ApprovalCollateral";

        // Từ chối phê duyệt tài sản
        static RejectCollateral = "RejectCollateral";

        // Tạo bì
        static CreateBriefCase = "CreateBriefCase";

        // Mượn tài sản - Tìm kiếm tài sản theo mã
        static GetCollateralInfor = "GetCollateralInfor";
        static AddCollateralInfor = "AddCollateralInfor";
        static GetRecipientEmployeeInfo = "GetRecipientEmployeeInfo";

        //Mượn trả: Export Excel yêu cầu mượn
        static ExportExcelReturnDocument = "ExportExcelReturnDocument";

        //trả TL -ReturnDocument
        static SelectBorrowDocument = "SelectBorrowDocument";
        static GetReturnDocumentSystemParam = "GetReturnDocumentSystemParam";

        // Kho - DS Đề nghị nhập kho chờ duyệt
        static SearchDataApproving = "SearchDataApproving";
        //Cabinet 
        static GetListStore = "GetListStore";

        // pop up tìm tài sản đưa vào hợp đồng
        static SearchCollateralToContract = "SearchCollateralToContract";

        // pop up tìm tài sản định giá đưa vào hợp đồng
        static SearchMortgageAssetToContract = "SearchMortgageAssetToContract";

        // tạo tài sản bảo đảm từ tài sản đã định giá
        static CreateCollateralFromMortgageAsset = "CreateCollateralFromMortgageAsset";

        // tạo tài sản bảo đảm từ tài sản đã định giá
        static GetListCollateralInformation = "GetListCollateralInformation";

        //upload tài liệu của hợp đồng
        static UploadDocumentContract = "UploadDocumentContract";

        // set up display tài sản trong hợp đồng
        static SetupDisplayCollateralMortgageContract = "SetupDisplayCollateralMortgageContract";

        // xem thông tin tài sản trong hợp đồng
        static GetSingleCollateralInforInContract = "GetSingleCollateralInforInContract";

        // set up add new tài sản trong Hợp đồng
        static SetupAddNewCollateralMortgageContract = "SetupAddNewCollateralMortgageContract";

        // set up edit form chỉnh sửa tài sản trong hợp đồng
        static SetupEditCollateralMortgageContract = "SetupEditCollateralMortgageContract";

        // add new tài sản trong hợp đồng
        static AddNewCollateralMortgageContract = "AddNewCollateralMortgageContract";

        //  edit tài sản trong hợp đồng
        static EditCollateralMortgageContract = "EditCollateralMortgageContract";

        // Set up display cho tài sản STK từ FCC
        static SetupDisplayFCC = "SetupDisplayFCC";

        // tạo HĐ từ Dialog
        static AddNewMortgageContractFromDialog = "AddNewMortgageContractFromDialog";

        // tạo HĐ từ Dialog
        static GetMortgageContractTemplate = "GetMortgageContractTemplate";

        //Lọc loại bảo hiểm theo nhóm tài sản mua bảo hiểm
        static GetInsuranceType = "GetInsuranceType";

        // upload bản in tùy chỉnh hợp đồng
        static UploadBanInTuyChinh = "UploadBanInTuyChinh";

        // Kiểm kê
        static StartStoreCheck = "StartStoreCheck";
        static EndStoreCheck = "EndStoreCheck";
        static GetBriefcaseByCode = "GetBriefcaseByCode";
        static SaveBriefcase = "SaveBriefcase";
        static Send_HTTD = "Send_HTTD";
        static SetupReview = "SetupReview";
        static SaveReview = "SaveReview";
        static Send_Result = "Send_Result";
        static TaiKetQuaKiemKe = "TaiKetQuaKiemKe";

        //Borrow Document
        static SetUpAddnewExtend = "SetUpAddnewExtend";
        static AddBorrowExtend = "AddBorrowExtend";
        static SetupBorrowWaiting = "SetupBorrowWaiting";
        static SearchBorrowWaiting = "SearchBorrowWaiting";
        static SetupBorrowExtend = "SetupBorrowExtend";
        static SearchBorrowExtend = "SearchBorrowExtend";

        static SetUpSearchReturnWaiting = "SetUpSearchReturnWaiting";
        static SearchReturnWaiting = "SearchReturnWaiting";

        static RequestForAppovalExtend = "RequestForAppovalExtend";
        static ApproveBorrowExtend = "ApproveBorrowExtend";
        static RejectBorrowExtend = "RejectBorrowExtend";
        static GetListBorrowLog = "GetListBorrowLog";
        // xuất  kho
        static SearchCollateralToExportREQ = "SearchCollateralToExportREQ";

        // UC lấy thông tin chung xuất tài sản
        static GetExportCollateralREQInfo = "GetExportCollateralREQInfo";

        // danh sách xuất kho chờ duyệt
        static SearchListREQApproving = "SearchListREQApproving";

        // export collateral
        static ExportCollateral_GetOfficeByOrgID = "ExportCollateral_GetOfficeByOrgID";
        static ExportCollateral_GetEmpInfo = "ExportCollateral_GetEmpInfo";

        // UC xem thông tin tài liệu theo tài sản gốc
        static DisplayCollateralDocumentUC = "DisplayCollateralDocumentUC";

        // lấy thông tin khách hàng theo indetification
        static SearchCustomerByIdentification = "SearchCustomerByIdentification";

        // lấy thông tin khách hàng theo CIF
        static SearchCustomerByCIF = "SearchCustomerByCIF";

        // search thông tin CSH theo identificatiton
        static SearchOwnerByIdentification = "SearchOwnerByIdentification";

        // Lấy Danh sách yêu cầu nhập kho chờ duyệt 
        static GetTempImportApprovingList = "GetTempImportApprovingList";

        // Lấy Danh sách yêu cầu xuất kho chờ duyệt 
        static GetTempExportApprovingList = "GetTempExportApprovingList";
        static SearchTempImport = "SearchTempImport";

        // lấy thông tin nhan vien theo ID
        static SearchEmployeeInfo = "SearchEmployeeInfo";

        static SetupApprovingImportCollateral = "SetupApprovingImportCollateral";

        static DisplayUpdateItem = "DisplayUpdateItem";

        static DoiChieu = "DoiChieu";

        //Credit Document
        static GetListDocumentType = "GetListDocumentType";
        static SetUpYeuCauLuuKho = "SetUpYeuCauLuuKho";
        static YeuCauLuuKho = "YeuCauLuuKho";
        static SetUpChuyenFolder = "SetUpChuyenFolder";
        static ChuyenFolder = "ChuyenFolder";

        static UploadNewFile = "UploadNewFile";

        // update loại chủ sở hữu tài sản chờ soạn
        static ChangeOwnerType = "ChangeOwnerType";

        static SetUpPostCheckConfig = "SetUpPostCheckConfig";
        static EditPostCheckConfig = "EditPostCheckConfig";
        static DeletePostCheckConfig = "DeletePostCheckConfig";

        static SetupDetailPostCheckProcess = "SetupDetailPostCheckProcess";

        static CapNhatHauKiem = "CapNhatHauKiem";

        static StartCheckProcess = "StartCheckProcess";

        static EndCheckProcess = "EndCheckProcess";

        static AddCreditOutSideEmployee = "AddCreditOutSideEmployee";

        static DeleteCreditOutSideEmloyee = "DeleteCreditOutSideEmloyee";

        //Action cấu hình mẫu bản in
        static GetSubTypeByTemplateType = "GetSubTypeByTemplateType";

        static InVoBi = "InVoBi";

        static SearchCustomerByIdentify = "SearchCustomerByIdentify";

        static SearchOwnerByIdentify = "SearchOwnerByIdentify";
        //Nhận việc phân giao
        static NhanViecPhanGiao = "NhanViecPhanGiao";
        static TraViecPhanGiao = "TraViecPhanGiao";
        static NhanTaiLieuPhanCong = "NhanTaiLieuPhanCong";
        static TraTaiLieuPhanCong = "TraTaiLieuPhanCong";

        static CheckValidDetailColl_AddNew = "CheckValidDetailColl_AddNew";

        static CheckValidDetailCollateral_Edit = "CheckValidDetailCollateral_Edit";

        //Export template import danh sách người đại diện
        static DownloadListRepresentativeTemplate = "DownloadListRepresentativeTemplate";
        //Import danh sách người đại diện
        static ImportExcel_ListRepresentative = "ImportExcel_ListRepresentative";

        //Import phân quyền xuất bản in
        static ImportListPrintingRole = "ImportListPrintingRole";
    };
    static MapInfo = class {
        static Color = "#116fbf";
        static Attribution = "SOFTMART";
        static Zoom = 13;
        static DefaultLatLng: LatLngTuple = [21.028072, 105.852193];
        static MapKey = "1b9c23fce7628b38841f481a14dc93d0b18067741a518d45";
        static TileLayer = "https://maps.vietmap.vn/api/tm/{z}/{x}/{y}.png?apikey=";
        static ApiRequest = "https://maps.vietmap.vn/api/route?api-version=1.1&apikey=";
        static ApiSearch = "https://maps.vietmap.vn/api/search?api-version=1.1&apikey=";
    };
    static MapFuntion = class {
        static search = "search";
        static route = "route";
    };
    // Email Template type
    static TemplateType = class {
        static readonly dicName: iKeyValuePair<Enums.TemplateType, string>[] = [
            { Key: Enums.TemplateType.Email, Value: "Email" },
            { Key: Enums.TemplateType.SMS, Value: "SMS" },
        ];
    };

    // Email Template transform
    static TransformType = class {
        static readonly dicName: iKeyValuePair<Enums.TransformType, string>[] = [
            { Key: Enums.TransformType.EmailDirect, Value: "Sinh trực tiếp" },
            { Key: Enums.TransformType.EmailHTML, Value: "Sinh qua file mẫu dạng html" },
            { Key: Enums.TransformType.EmailWord, Value: "Sinh qua file mẫu dạng word" },
        ];
    };

    // Email Template triggle
    static TriggerType = class {
        static readonly dicName: iKeyValuePair<Enums.TriggerType, string>[] = [
            { Key: Enums.TriggerType.EmailEvent, Value: "Sự kiện" },
            { Key: Enums.TriggerType.EmailDaily, Value: "Hàng ngày" },
            { Key: Enums.TriggerType.EmailWeekly, Value: "Hàng tuần" },
            { Key: Enums.TriggerType.EmailMonthly, Value: "Hàng tháng" },
        ];
    };

    static ValidateExpression = class {
        static EmailExpression = new RegExp(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
        static CodeExpression = new RegExp(/^[0-9A-Za-z-.]+$/);
        static LatitudeValidation = new RegExp(/^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}/);
        static LongitudeValidation = new RegExp(/^(\-?([1]?[0-7]?[0-9](\.\d+)?|180((.[0]+)?)))$/);
        static SerialPrefix = (charNumber: string) => {
            switch (charNumber) {
                case "2":
                    return new RegExp(/^[A-Z]{2}$/);
                case "3":
                    return new RegExp(/^[A-Z]{3}$/);
                case "4":
                    return new RegExp(/^[A-Z]{4}$/);
            }
        };
    };

    static ValidateMessage = class {
        static RequiredField = "Thông tin này phải nhập.";
        static EmailInvalid = "Địa chỉ email không đúng định dạng.";
        static CodeInvalid = "Mã không đúng định dạng.";
        static LatitudeInvalid = "Vĩ độ không đúng định dạng.";
        static LongitudeInvalid = "Kinh độ không đúng định dạng.";
    };

    static GeneralSetting = class {
        static readonly dicLoaiHanMuc: iKeyValuePair<string, string>[] = [
            { Key: "VND", Value: "VND" },
            { Key: "USD", Value: "USD và ngoại tệ quy đổi theo USD" },

        ];
        static readonly dicName: iKeyValuePair<Enums.GeneralSetting, string>[] = [
            { Key: Enums.GeneralSetting.host, Value: "Domain deploy ứng dụng" },
            { Key: Enums.GeneralSetting.HO, Value: "Mã của HO" },
            { Key: Enums.GeneralSetting.AccountNumber_Treo_HO, Value: "STK tiền treo của HO" },

            { Key: Enums.GeneralSetting.Commodity_SEC, Value: "Mã hàng hóa Séc" },
            { Key: Enums.GeneralSetting.CountChar_Number_SEC, Value: "Số ký tự của phần số SEC" },
            { Key: Enums.GeneralSetting.CountChar_Prefix_SEC, Value: "Số ký tự của tiền tố SEC" },

            { Key: Enums.GeneralSetting.Commodity_STK, Value: "Mã hàng hóa Sổ tiết kiệm trắng" },
            { Key: Enums.GeneralSetting.CountChar_Number_STK, Value: "Số ký tự của phần số STK" },
            { Key: Enums.GeneralSetting.CountChar_Prefix_STK, Value: "Số ký tự của tiền tố STK" },

            { Key: Enums.GeneralSetting.Commodity_CCTG, Value: "Mã hàng hóa Chứng chỉ tiền gửi" },
            { Key: Enums.GeneralSetting.CountChar_Number_CCTG, Value: "Số ký tự của phần số CCTG" },
            { Key: Enums.GeneralSetting.CountChar_Prefix_CCTG, Value: "Số ký tự của tiền tố CCTG" },

            { Key: Enums.GeneralSetting.Commodity_PHOI, Value: "Mã hàng hóa Phôi thẻ" },
            { Key: Enums.GeneralSetting.CountChar_Number_PHOI, Value: "Số ký tự của phần số PHOI" },
            { Key: Enums.GeneralSetting.CountChar_Prefix_PHOI, Value: "Số ký tự của tiền tố PHOI" },

            { Key: Enums.GeneralSetting.CurrencyVND, Value: "Mã tiền VNĐ" },
            { Key: Enums.GeneralSetting.CurrencyUSD, Value: "Mã tiền USD" },
            { Key: Enums.GeneralSetting.RouteBufferTime, Value: "Thời gian dừng xe trung bình" },

            // { Key: Enums.GeneralSetting.AccountType_TienMat, Value: "Mã nhóm TK Tiền mặt" },
            // { Key: Enums.GeneralSetting.AccountType_DiDuong, Value: "Mã nhóm TK Đi đường" },
            // { Key: Enums.GeneralSetting.AccountType_DiDuong_NHNN, Value: "Mã nhóm TK Đi đường với NHNN" },

            // { Key: Enums.GeneralSetting.AccountType_Nostro, Value: "Mã nhóm TK Nostro" },
            // { Key: Enums.GeneralSetting.AccountType_TreoDi, Value: "Mã nhóm TK Treo đi với TCTD" },
            // { Key: Enums.GeneralSetting.AccountType_TreoDen, Value: "Mã nhóm TK Treo đến với TCTD" },

            // { Key: Enums.GeneralSetting.AccountType_TienMat_ATM, Value: "Mã nhóm TK Tiền mặt (ATM)" },
            // { Key: Enums.GeneralSetting.AccountType_TienThieu, Value: "Mã nhóm TK Tiền thiếu (ATM)" },
            // { Key: Enums.GeneralSetting.AccountType_TienThua, Value: "Mã nhóm TK Tiền thừa (ATM)" },

            { Key: Enums.GeneralSetting.RegulationCode, Value: "Số quyết định (Mẫu biểu)" },
            { Key: Enums.GeneralSetting.RegulationDTG, Value: "Ngày quyết định (Mẫu biểu)" },

            { Key: Enums.GeneralSetting.KiemTra_CCTG_T24, Value: "Kiểm tra CCTG trên T24" },
            { Key: Enums.GeneralSetting.KiemTra_PHOI_T24, Value: "Kiểm tra PHOI trên T24" },
            { Key: Enums.GeneralSetting.KiemTra_SEC_T24, Value: "Kiểm tra SEC trên T24" },
            { Key: Enums.GeneralSetting.KiemTra_STK_T24, Value: "Kiểm tra STK trên T24" },
            { Key: Enums.GeneralSetting.KiemTra_TSDB_T24, Value: "Kiểm tra TSDB trên T24" },

            //  { Key: Enums.GeneralSetting.HuyAnChi_Inputer, Value: "Code Hủy ấn chỉ Inputer" },
        ];

        static readonly dicAnChi: {
            Key: Enums.GeneralSetting;
            PrefixValue: Enums.GeneralSetting;
            NumberValue: Enums.GeneralSetting;
        }[] = [
                {
                    Key: Enums.GeneralSetting.Commodity_CCTG,
                    PrefixValue: Enums.GeneralSetting.CountChar_Prefix_CCTG,
                    NumberValue: Enums.GeneralSetting.CountChar_Number_CCTG,
                },
                {
                    Key: Enums.GeneralSetting.Commodity_PHOI,
                    PrefixValue: Enums.GeneralSetting.CountChar_Prefix_PHOI,
                    NumberValue: Enums.GeneralSetting.CountChar_Number_PHOI,
                },
                {
                    Key: Enums.GeneralSetting.Commodity_SEC,
                    PrefixValue: Enums.GeneralSetting.CountChar_Prefix_SEC,
                    NumberValue: Enums.GeneralSetting.CountChar_Number_SEC,
                },
                {
                    Key: Enums.GeneralSetting.Commodity_STK,
                    PrefixValue: Enums.GeneralSetting.CountChar_Prefix_STK,
                    NumberValue: Enums.GeneralSetting.CountChar_Number_STK,
                },
            ];
    };



    // Bộ từ điển quy trình
    static FlowCategory = class {
        static readonly dicColor: iKeyValuePair<Enums.FlowCategory, string>[] = [
            { Key: Enums.FlowCategory.PDDeNghi, Value: "#10B300" },
            { Key: Enums.FlowCategory.PDXepXe, Value: "#e7090f" },
        ];

        static readonly dicName: iKeyValuePair<Enums.FlowCategory, string>[] = [
            { Key: Enums.FlowCategory.PDDeNghi, Value: "Luồng phê duyệt đề nghị" },
            { Key: Enums.FlowCategory.PDXepXe, Value: "Luồng phê duyệt xếp xe" },
        ];

        static readonly dicSearchItem: iKeyValuePair<Enums.FlowCategory | null, string>[] = [
            { Key: null, Value: "--- Tất cả ---" },
            { Key: Enums.FlowCategory.PDDeNghi, Value: "Luồng phê duyệt đề nghị" },
            { Key: Enums.FlowCategory.PDXepXe, Value: "Luồng phê duyệt xếp xe" },
        ];
    };

    // Cách xử lý khi từ chối
    static RejectAction = class {
        static readonly dicName: iKeyValuePair<Enums.RejectAction, string>[] = [
            { Key: Enums.RejectAction.QuayVeNgTrinh, Value: "Trả lại người trình" },
            { Key: Enums.RejectAction.QuayVePD, Value: "Quay về cấp phê duyệt" },
            { Key: Enums.RejectAction.HuyLuong, Value: "Hủy luồng" },
        ];
    };

    // Cách xử lý khi từ chối
    static BussinerTypeProcessActivity = class {
        static readonly dicName: iKeyValuePair<Enums.BussinerType, string>[] = [
            { Key: Enums.BussinerType.ThucHienNhapHachToan, Value: "Người nhập hạch toán T24" },
            { Key: Enums.BussinerType.ThucHienDuyetHachToan, Value: "Người duyệt hoạch toán T24" },
        ];
    };

    // Loại lịch (thu hay chi)
    static CollectionType = class {
        static readonly dicName: iKeyValuePair<Enums.CollectionType, string>[] = [
            { Key: Enums.CollectionType.Thu, Value: "Thu" },
            { Key: Enums.CollectionType.Chi, Value: "Chi" },
        ];
    };

    // Các quý trong năm
    static QuaterOfYear = class {
        static readonly dicName: iKeyValuePair<Enums.QuaterOfYear, string>[] = [
            { Key: Enums.QuaterOfYear.Quater1, Value: "Quý 1" },
            { Key: Enums.QuaterOfYear.Quater2, Value: "Quý 2" },
            { Key: Enums.QuaterOfYear.Quater3, Value: "Quý 3" },
            { Key: Enums.QuaterOfYear.Quater4, Value: "Quý 4" },
        ];
    };

    static LichDatPhong_Dic = class {
        static readonly ListHour: iKeyValuePair<number, string>[] = [
            //   { Key: 7, Value: "07" },
            { Key: 8, Value: "08" },
            { Key: 9, Value: "09" },
            { Key: 10, Value: "10" },
            { Key: 11, Value: "11" },
            { Key: 12, Value: "12" },
            { Key: 13, Value: "13" },
            { Key: 14, Value: "14" },
            { Key: 15, Value: "15" },
            { Key: 16, Value: "16" },
            { Key: 17, Value: "17" },
            //{ Key: 18, Value: "18" },
            // { Key: 19, Value: "19" },
            // { Key: 20, Value: "20" },
        ];
        static readonly ListMinute: iKeyValuePair<number, string>[] = [
            { Key: 0, Value: "00" },
            { Key: 15, Value: "15" },
            { Key: 30, Value: "30" },
            { Key: 45, Value: "45" },
        ];
    };


    static ListMonth = class {
        static readonly dicMonth: iKeyValuePair<Enums.ListMonth, string>[] = [
            { Key: Enums.ListMonth.Thang1, Value: "01" },
            { Key: Enums.ListMonth.Thang2, Value: "02" },
            { Key: Enums.ListMonth.Thang3, Value: "03" },
            { Key: Enums.ListMonth.Thang4, Value: "04" },
            { Key: Enums.ListMonth.Thang5, Value: "05" },
            { Key: Enums.ListMonth.Thang6, Value: "06" },
            { Key: Enums.ListMonth.Thang7, Value: "07" },
            { Key: Enums.ListMonth.Thang8, Value: "08" },
            { Key: Enums.ListMonth.Thang9, Value: "09" },
            { Key: Enums.ListMonth.Thang10, Value: "10" },
            { Key: Enums.ListMonth.Thang11, Value: "11" },
            { Key: Enums.ListMonth.Thang12, Value: "12" },
        ];
    };


    // Loại input báo cáo
    static ReportInputType = class {
        static readonly dicName: iKeyValuePair<Enums.ReportInputType, string>[] = [
            { Key: Enums.ReportInputType.InputChonMotNgay, Value: "Chọn 1 ngày" },
            {
                Key: Enums.ReportInputType.InputChonThang,
                Value: "Chọn 1 tháng",
            },
            { Key: Enums.ReportInputType.InputChonFundThangNam, Value: "Chọn 1 Hub/CN/PGD, tháng" },
            {
                Key: Enums.ReportInputType.InputChon_HubDVKDGDV_TuNgayDenNgay,
                Value: "Chọn 1 FundID: Hub/CN/PGD/GDV, từ ngày đến ngày",
            },
            { Key: Enums.ReportInputType.InputChonMotHoacNhieuFund_ThangNam, Value: "Chọn 1 hoặc nhiều ĐV: Hub/CN/PGD, Tháng" },
            { Key: Enums.ReportInputType.InputChonTuNgayDenNgay_Hub, Value: "Chọn từ ngày đến ngày, Hub" },
            { Key: Enums.ReportInputType.InputChonNgay_LoaiTien_DVKD, Value: "Chọn 1 ngày, loại tiền, ĐVKD: CN/PGD" },
            { Key: Enums.ReportInputType.InputChonDVKDNam_Currency, Value: "Chọn ĐVKD, Năm và loại tiền" },
            { Key: Enums.ReportInputType.InputChonDVKDThangNam, Value: "Chọn ĐVKD, tháng, năm" },
            { Key: Enums.ReportInputType.InputChonThangNamDVKDLoaiAnChi, Value: "Chọn tháng, đơn vị, loại ấn chỉ" },
            { Key: Enums.ReportInputType.Input_Chon_1_Quy, Value: "Chọn một HUB/CN/ĐVKD có quyền xem" },
            {
                Key: Enums.ReportInputType.InputChonTrangthai_TuNgayDenNgay,
                Value: "Chọn trạng thái, từ ngày - đến ngày và quỹ",
            },
            { Key: Enums.ReportInputType.InputChonFundNgay, Value: "Chọn 1 FundID: Hub/CN/PGD, ngày" },
            { Key: Enums.ReportInputType.InputNhapCommandCode_ChonLoaiDeNghi, Value: "Nhập mã lệnh và chọn loại đề nghị" },
            { Key: Enums.ReportInputType.InputChonCN_PGD_Ngay, Value: "Chọn CN/PGD và 1 ngày" },
            {
                Key: Enums.ReportInputType.InputChonTrangthaiHachToan_TuNgayDenNgay_Quy,
                Value: "Chọn trạng thái hạch toán, từ ngày - đến ngày và quỹ",
            },
            {
                Key: Enums.ReportInputType.InputChonTuNgayDenNgay_MotOrNhieuQuy,
                Value: "Chọn từ ngày - đến ngày, một or nhiều quỹ",
            },
            {
                Key: Enums.ReportInputType.InputNhapMotNgay_Quy_LoaiTien,
                Value: "Chọn một ngày, một quỹ và loại tiền",
            },
            {
                Key: Enums.ReportInputType.Input_KiemKeQuy,
                Value: "Kiểm kê quỹ",
            },
        ];
    };

    static LoaiXacNhan_Inputter = class {
        static BangKe = 1;
        static BBXN = 2;
    }

    static DynamicReport = class {
        static ComboBox = "ComboBox";  // ComboBox
        static MultiSelect = "MultiSelect";  // ComboCheckBox
        static ComboTreeView = "ComboTreeView"; // ViewableFundUC
        static TextInput = "TextInput"; // TextInput
        static NumberInput = "NumberInput"; // NumberInput
        static DecimalInput = "DecimalInput"; // NumberInput
        static DatePicker = "DatePicker"; // DatePicker
        static MonthPicker = "MonthPicker"; // MonthPicker
        static YearPicker = "YearPicker"; // YearPicker
    }

    static RecordMode = class {
        static AddNew = 1;
        static Edit = 2;
        static Display = 3
    }

    static UploadMode = class {
        static Upload = 1;
        static View = 2;
        static EditInfo = 3;
    }
    static Upload_RefType = class {
        //chức năng, nghiệp vụ
        static SendMail = 1;
        static AutoVoi = 2;

        static CollateralDocument = 3;
    }

    static CollateralDocumentSourceType = class {
        /// <summary>
        /// Khởi tạo tài sản
        /// </summary>
        static CollateralInit = 1;
        /// <summary>
        /// Ký hợp đồng
        /// </summary>
        static SigningContract = 2;
        /// <summary>
        /// Công chứng
        /// </summary>
        static NotarizingContract = 3;
        /// <summary>
        /// Giao dịch TSĐB
        /// </summary>
        static MARegistration = 4;
        /// <summary>
        /// Phong tỏa TS
        /// </summary>
        static BlockCollateral = 5;
        /// <summary>
        /// Biện pháp BĐ khác
        /// </summary>
        static OtherMortgageMethod = 6;
        /// <summary>
        /// Nhập kho tài sản
        /// </summary>
        static ImportCollateralREQ = 7;
        /// <summary>
        /// Gỡ phong tỏa TS
        /// </summary>
        static UnblockCollateral = 8;
        /// <summary>
        /// Xóa DK GDBĐ
        /// </summary>
        static MortgageUnregistration = 9;
    }

    static CollateralDocumentStage = class {
        static IN = 1;
        static OUT = 2;
    }

    static MortgageRegistrationMethod = class {
        static Online = 1;
        static Offline = 2;
    }

    static PageType = class {
        static Collateral = "Collateral";
        static IB = "IB";

        static CMC = "cmc";
        static HTTD = "httd";
    }

    static RegionPosition = class {
        static TruongHUB = 1;
        static HanhChinh = 2;
        static ApTai = 3;

        static readonly dict: iKeyValuePair<number, string>[] = [
            { Key: 1, Value: "Trưởng HUB" },
            { Key: 2, Value: "Hành chính" },
            { Key: 3, Value: "Áp tải" },
        ];
    }

    static CompartmentStatus = class {
        static readonly dict: iKeyValuePair<number, string>[] = [
            { Key: 1, Value: "Hoạt động" },
            { Key: 2, Value: "Không hoạt động" },
        ];
    }

    static IbbchargeUnitTpye = class {
        static readonly dict: iKeyValuePair<number, string>[] = [
            { Key: 1, Value: "Hỗ trợ tín dụng" },
            { Key: 2, Value: "Kho quỹ" },
        ];
    }

    static ExportReasonType = class {
        static HetNghiaVu = 1;
        static DaoChap = 2;
        static HoiSo = 3;

        static readonly dict: iKeyValuePair<number, string>[] = [
            { Key: 1, Value: "Hết nghĩa vụ của tài sản" },
            { Key: 2, Value: "Đảo chấp" },
            { Key: 3, Value: "Xuất theo yêu cầu của đơn vị Hội sở" },
        ];
    }

    static CheckingType = class {
        static SoLuong = 1;
        static ChiTiet = 2;

        static readonly dict: iKeyValuePair<number, string>[] = [
            { Key: 1, Value: "Số lượng" },
            { Key: 2, Value: "Chi tiết" },
        ];
    }

    static MortgageUnregistrationResult = class {
        static TraGiayHen = 1;
        static TraKetQua = 2;
        static ThatBai = 3
    }
    static LogIntegrate = class {
        static MoTaiSan = 1;
        static PhongToaTS = 2;
        static DK_GDBD = 3;
        static GiayLuuHanhXe = 4;
        static DongTaiSan = 5;
        static XoaDK_GDBD = 6
    }

    static Reporting_Status = class {
        static Open = 1;
        static Processing = 2;
        static Success = 64;
        static Fail = 256;
    }

    static PostCheckProcessDetail = class {
        static readonly dict: iKeyValuePair<number, string>[] = [
            { Key: Enums.PostCheckDetailStatus.Dat, Value: "Đạt" },
            { Key: Enums.PostCheckDetailStatus.Loi, Value: "Lỗi" }
        ];

        static readonly dicColor: iKeyValuePair<Enums.PostCheckDetailStatus, string>[] = [
            { Key: Enums.PostCheckDetailStatus.ChuaHauKiem, Value: "#000000" },
            { Key: Enums.PostCheckDetailStatus.DangHauKiem, Value: "#FFCC00" },
            { Key: Enums.PostCheckDetailStatus.Dat, Value: "#0000FF" },
            { Key: Enums.PostCheckDetailStatus.Loi, Value: "#FF0000" },
        ];
    }


}
