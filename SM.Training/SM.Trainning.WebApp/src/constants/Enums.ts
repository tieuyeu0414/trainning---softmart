enum FunctionCodes {

    // CRUD
    VIEW = "VIEW",
    ADD = "ADD",
    EDIT = "EDIT",
    DELETE = "DELETE",
    DISPLAY = "DISPLAY",
    COPY = "COPY",

    // Approval Flow
    RequestApproval = "RequestApproval", // Yêu cầu phê duyệt
    Approve = "Approve", // Phê duyệt
    Reject = "Reject", // Phê duyệt
    Cancel = "Cancel", // Hủy

    // Common function
    Lock = "Lock",
    Confirm = "Confirm", // Xác nhận
    Perform = "Perform",
    Finish = "Finish",
    Unlock = "Unlock",

    BanInHachToan = "BanInHachToan",

    // Niêm phong
    Seal = "Seal",

    // Mượn trả
    BorrowDoucument_Extend = "BorrowDoucument_Extend",
    BorrowDocument_Approve_Reject = "BorrowDocument_Approve_Reject",

    // Nhập/Xuất Kho tài liệu
    StoreImport = "StoreImport", // Nhập kho
    StoreExport = "StoreExport", // Xuất kho
    CBAT_NhanBanGiao = "CBAT_NhanBanGiao", // CBAT Nhận bàn giao
    NhanBanGiaoTu_CBAT = "NhanBanGiaoTu_CBAT", // CBAT Nhận bàn giao
    DVKH_NhanTaiLieu = "DVKH_NhanTaiLieu", // DVKH Nhận tài liệu
    HTTD_NhanTaiLieu = "HTTD_NhanTaiLieu", // HTTD Nhận tài liệu
    HoanTraBiCu = "HoanTraBiCu",
    HTTD_Approve = "HTTD_Approve",
    HTTD_Reject = "HTTD_Reject",

    // Kiểm kê
    StoreCheck_Start = "StoreCheck_Start", // Bắt đầu kiểm kê
    StoreCheck_Perform = "StoreCheck_Perform", // Thực hiện kiểm kê
    StoreCheck_Finish = "StoreCheck_Finish", // Kết thúc kiểm kê
    StoreCheck_SendHTTD = "StoreCheck_SendHTTD", // Gửi HTTD
    StoreCheck_UpdateReview = "StoreCheck_UpdateReview", // Cập nhật kết quả rà soát sau kiểm kê

    //nhận việc trả việc, phân công 
    NhanViec = "NhanViec",
    TraViec = "TraViec",
    NhanTaiLieuPhanCong = "NhanTaiLieuPhanCong",
    TraTaiLieuPhanCong = "TraTaiLieuPhanCong",

    //Thêm NV vào kho 
    AddStoreEmloyee = "AddStoreEmloyee",
}

enum RouteLinkSymbol {
    LinkSymbol = "->",
}

enum ResponseCode {
    Success = "0",
    Error = "1",
    Fail = "2",
}

enum ConfirmBoxButton {
    OK = "OK",
    NO = "No",
    Cancel = "Cancel",
}

enum ConfigParameter {
    smx_Manually = 1,
    smx_NotManually = 2,

    smx_RecordUpdating = 1,
    smx_RecordApproving = 2,
    smx_RecordFinal = 4,
    smx_RecordCanceled = 8,
    smx_RecordDeleted = 16, // yêu cầu xóa
    smx_RecordApprovedDelete = 32,
    smx_RecordRejectDelete = 64,
    smx_RequestAdditionalDocument = 128, //Yêu cầu bổ sung hồ sơ
}

// Giới tính
enum Gender {
    Female = 0, // Nữ
    Male = 1, // Nam
    Other = 2, // Khác
}
//nguồn tl
enum AttachmentSource {
    ECM = 1,
    BPM = 2,
}
// Loai khach hang
enum CustomerType {
    Person = 1, // Cá nhân
    Company = 2, // doanh nghiệp
}
// Trạng thái bản ghi
enum ActiveStatus {
    InActivate = 2, // Không hoạt động
    Active = 1, // Đang hoạt động
}

// Trạng thái phê duyệt
enum ApprovalStatus {
    Open = 0, // Mới tạo
    Approving = 8, // Đang phê duyệt
    Approved = 16, // Đã duyệt
    Rejected = 32, // Bị từ chối
    Cancelled = 128, // Đã hủy
}

enum ReportingStatus {
    Open = 1,
    Processing = 2,
    Fail = 4,
    Success = 8,
}

enum ConfigRight {
    GroupUser = "1",
    User = "2",
}

enum OrganizationLevel {
    Compary = 1, // Công ty
    BusinessUnit = 2, // Cấp ban
    Division = 3, // Cấp phòng
    Team = 4, // Cấp tổ
    SubTeam = 5, // Cấp nhóm
}


enum DayOfWeek {
    Thu2 = 2,
    Thu3 = 3,
    Thu4 = 4,
    Thu5 = 5,
    Thu6 = 6,
    Thu7 = 7,
    ChuNhat = 1,
}

enum EmployeeSelectorMode {
    All = 1,
    Fund = 2,
    FundCodeNull = 3,
    Fund_FundEmpType = 4,
    Organization = 5,
    CMC_Employee = 6,
    Store = 7,
    CBAT_Employee = 8,
}

enum ECMRefType {
    // FlexCash - To Remove
    TransportBox = 1,
    XacNhanNiemPhong = 2,
    XacNhanChuyen = 3,
    XacNhanKiemKe = 4,

    // FlexOffice
    BanTin = 1,
}

enum awf_RefType {
    //Chuyển tiền Hub - ĐVKD
    Requisition_HUB_DVKD = 1,

    //Chuyển tiền Hub - Hub tiếp quỹ
    Requisition_HUB_HUB_TiepQuy = 2,

    //Chuyển tiền Hub - Hub tiếp quỹ
    Requisition_HUB_HUB_HoanQuy = 14,

    //Chuyển tiền Hub - ATM
    Requisition_HUB_ATM = 3,

    //Chuyển tiền ĐVKD - ATM ngoài trụ sở
    Requisition_DVKD_ATMNgoaiTruSo = 4,

    //Chuyển tiền ĐVKD - ATM tại trụ sở
    Requisition_DVKD_ATMTaiTruSo = 5,

    //Chuyển tiền nội bộ
    Requisition_NoiBo = 6,

    //Chuyển tiền Hub - TCTD
    Requisition_HUB_TCTD = 7,

    //Chuyển tiền Hub - NHNN
    Requisition_HUB_NHNN = 13,

    //Thu hộ tiền tại điểm thu hộ, chuyển tiền về Đơn vị cùng Hub(là Hub, hoặc ĐVKD hoặc ĐVKD cùng Hub)
    Requisition_ThuHo_ChuyenTien = 8,

    //Thu hộ tiền tại điểm thu hộ, chuyển tiền về Hub khác
    Requisition_ThuHo_ChuyenTien_VeHUBKhac = 9,

    //Chuyến vận chuyển
    Requisition_ChuyenVanChuyen_PD_TaiHUB = 10,

    //Thu tiền hộ
    Requisition_CollectionSchedule = 11,

    //hủy ấn chỉ
    Requisition_RevokeCollateral = 12,

    //Chuyển tiền Hub - TCTD taiABB
    Requisition_HUB_TCTD_TaiABB = 15,
}

// Loại email template
enum TemplateType {
    Email = 1,
    SMS = 2,
}

// Cách thức sinh email
enum TransformType {
    EmailDirect = 4,
    EmailHTML = 1,
    EmailWord = 2,
}

// Tần suất gửi email
enum TriggerType {
    EmailEvent = 1,
    EmailDaily = 2,
    EmailWeekly = 4,
    EmailMonthly = 8,
}

enum GeneralSetting {
    host = "host",
    HO = "HO",
    AccountNumber_Treo_HO = "AccountNumber_Treo_HO",

    RouteBufferTime = "RouteBufferTime",

    CurrencyVND = "CurrencyVND",
    CurrencyUSD = "CurrencyUSD",

    AccountType_TienMat = "AccountType_TienMat",
    AccountType_DiDuong = "AccountType_DiDuong",
    AccountType_TreoDi = "AccountType_TreoDi",
    AccountType_TreoDen = "AccountType_TreoDen",
    AccountType_Nostro = "AccountType_Nostro",
    AccountType_DiDuong_NHNN = "AccountType_DiDuong_NHNN",

    AccountType_TienMat_ATM = "AccountType_TienMat_ATM",
    AccountType_TienThua = "AccountType_TienThua",
    AccountType_TienThieu = "AccountType_TienThieu",

    Commodity_STK = "Commodity_STK",
    CountChar_Number_STK = "CountChar_Number_STK",
    CountChar_Prefix_STK = "CountChar_Prefix_STK",
    KiemTra_STK_T24 = "KiemTra_STK_T24",

    Commodity_SEC = "Commodity_SEC",
    CountChar_Number_SEC = "CountChar_Number_SEC",
    CountChar_Prefix_SEC = "CountChar_Prefix_SEC",
    KiemTra_SEC_T24 = "KiemTra_SEC_T24",

    Commodity_PHOI = "Commodity_PHOI",
    CountChar_Number_PHOI = "CountChar_Number_PHOI",
    CountChar_Prefix_PHOI = "CountChar_Prefix_PHOI",
    KiemTra_PHOI_T24 = "KiemTra_PHOI_T24",

    Commodity_CCTG = "Commodity_CCTG",
    CountChar_Number_CCTG = "CountChar_Number_CCTG",
    CountChar_Prefix_CCTG = "CountChar_Prefix_CCTG",
    KiemTra_CCTG_T24 = "KiemTra_CCTG_T24",

    KiemTra_TSDB_T24 = "KiemTra_TSDB_T24",

    RegulationCode = "RegulationCode",
    RegulationDTG = "RegulationDTG",
    //  HuyAnChi_Inputer = "HuyAnChi_Inputer",
}

enum AlertType {
    Success = "success",
    Warning = "warning",
    Error = "error",
}

enum LoaiPhuongAnTTB5 {
    PCCC = 1,
    PCBL = 2,
}

enum FlowCategory {
    PDDeNghi = 1,
    PDXepXe = 2,
}

enum RejectAction {
    QuayVeNgTrinh = 1,
    QuayVePD = 2,
    HuyLuong = 3,
}

enum BussinerType {
    ThucHienDuyetHachToan = 1,
    ThucHienNhapHachToan = 2,
}
enum AnChiVaTaiSan {
    AnChi = 1,
    TaiSan = 0,
}

enum CollectionType {
    Thu = 1,
    Chi = 2,
}

enum QuaterOfYear {
    Quater1 = 1,
    Quater2 = 2,
    Quater3 = 3,
    Quater4 = 4,
}

enum ListMonth {
    Thang1 = 1,
    Thang2 = 2,
    Thang3 = 3,
    Thang4 = 4,
    Thang5 = 5,
    Thang6 = 6,
    Thang7 = 7,
    Thang8 = 8,
    Thang9 = 9,
    Thang10 = 10,
    Thang11 = 11,
    Thang12 = 12,
}


enum DynamicReport_KhoGiay {
    A4 = 1, // Khổ giấy A4
    A5 = 2, // Khổ giấy A5
}

enum DynamicReport_HuongGiay {
    Landscape = 0, // False
    Portrait = 1, // True
}

enum DynamicReport_Status {
    NgungSuDung = 0, // False
    SuDung = 1, // True
}

enum ImportExceptionType {
    IMPORT_ERROR_WITH_MESSAGE_IN_FILE = "IMPORT_ERROR_WITH_MESSAGE_IN_FILE", // Trả về tên File trong Temporary Folder, trong file đã có msg cụ thể lí do của việc Import lỗi
}


enum ReportInputType {
    /* 1 */ InputChonMotNgay = "InputChonMotNgay",
    /* 2 */ InputChonFundThangNam = "InputChonFundThangNam",
    /* 3 */ InputChonMotHoacNhieuFund_ThangNam = "InputChonMotHoacNhieuFund_ThangNam",
    /* 4 */ InputChonTuNgayDenNgay_Hub = "InputChonTuNgayDenNgay_Hub",
    /* 5 */ InputChonNgay_LoaiTien_DVKD = "InputChonNgay_LoaiTien_DVKD",
    /* 6 */ InputChonDVKDNam_Currency = "InputChonDVKDNam_Currency",
    /* 7 */ InputChonDVKDThangNam = "InputChonDVKDThangNam",
    /* 8 */ InputChonThangNamDVKDLoaiAnChi = "InputChonThangNamDVKDLoaiAnChi",
    /* 9 */ Input_Chon_1_Quy = "Input_Chon_1_Quy", // Chọn 1 quỹ
    /* 11 */ InputChonTrangthai_TuNgayDenNgay = "InputChonTrangthai_TuNgayDenNgay",
    /* 10 */ // KhongCo = 10,
    /* 12 */ InputChonFundNgay = "InputChonFundNgay",
    /* 13 */ InputNhapCommandCode_ChonLoaiDeNghi = "InputNhapCommandCode_ChonLoaiDeNghi",
    /* 14 */ InputChonCN_PGD_Ngay = "InputChonCN_PGD_Ngay",
    /* 15 */ InputChonTrangthaiHachToan_TuNgayDenNgay_Quy = "InputChonTrangthaiHachToan_TuNgayDenNgay_Quy",
    /* 16 */ InputChonTuNgayDenNgay_MotOrNhieuQuy = "InputChonTuNgayDenNgay_MotOrNhieuQuy",
    /* 17 */ InputNhapMotNgay_Quy_LoaiTien = "InputNhapMotNgay_Quy_LoaiTien",
    /* 18 */ InputChon_HubDVKDGDV_TuNgayDenNgay = "InputChon_HubDVKDGDV_TuNgayDenNgay",
    /* 19 */ InputChonThang = "InputChonThang",
    /* 20 */ Input_KiemKeQuy = "Input_KiemKeQuy",
    /* 21 */ Input_ChonThangKhuVucHubDVKD = "Input_ChonThangKhuVucHubDVKD",
    /* 22 */ Input_TheoDoiNhapXuatKhoAnChi = "Input_TheoDoiNhapXuatKhoAnChi",
}

enum AuthenticationType {
    AD = 1,
    Local = 2,
}
enum LichHop_TrangThai {
    TaoMoi = 1,
    DangDuyet = 2,
    DaDuyet = 3,
    Huy = 4,
}

enum Publish_Loai {
    BanTin = 1,
    LichLamViec = 2,
    LichHop = 3,
}

enum BanTin_Loai {
    Text = 1,
    Image = 2,
    Video = 3
}

enum BanTin_TrangThai {
    MoiTao = 1,
    GuiDuyet = 2,
    DaDuyet = 3,
    DaXuatBan = 4,
    NgungSuDung = 5,
}

enum LichLamViec_TrangThai {
    MoiTao = 1,
    GuiDuyet = 2,
    DaDuyet = 3,
    DaXuatBan = 4,
    NgungSuDung = 5,
}

enum CollateralType {
    RealEstate = 1, /* Bất động sản */
    AccountNumber = 2, /* STK/Tiền gửi/Tiền trên TK thanh toán */
    RoadVehicle = 3, /*  Ô tô, phương tiện vận tải đường bộ */
    WaterVehicle = 4, /* Tàu bay, tàu biển */
    Equipment = 5, /* Máy móc thiết bị */
    Commodity = 6, /* Hàng hóa */
    Stock = 7, /* Chứng khoán */
    GiayToCoGiaTri = 8, /* Giấy tờ có giá trị */
    QuyenDoiNo = 9, /* Quyền đòi nợ */
    QuyenTS = 10, /* Quyền TS phát sinh từ HĐ */
    DongSanCamCoKhac = 11, /* Động sản thế chấp/cầm cố khác */
    PhanVonGoi = 12, /* Phần vốn gọi */
    QuyenKhaiThac = 13, /* Quyền khai thác */
    QuyenThue = 14, /* Quyền thuế */
    TaiSanKhac = 20, /* Tài sản khác */

    AccountNumberFCC = 99, /* Tài sản hình thành từ sổ tiết kiệm */
}

enum LoaiKho {
    BenDamBao = 1,
    BenThu3 = 2
}

enum DonViThoiGian {
    Ngay = 1,
    Thang = 2,
    Quy = 4,
    Nam = 8
}

enum ECollateral_State {
    NhapMoi = 1,
    DaHinhThanh = 2,
}

enum ECollateral_AddNewStatus {
    KhoiTao = 1,
    PheDuyetKhoiTao = 2,
    HinhThanhTaiSan = 4,
    CollateralDocument = 5
}

enum EImportCollateralREQStatus {
    MoiTao = 1,
    ChoDuyet = 2,
    DaDuyet = 3,
    TuChoi = 4,
}

enum Contract_Type {
    LD = 1, // khoản vay
    PC = 2, // Thẻ tín dụng
    OD = 3, // Thấu chi
    LC = 4, // Thư bảo lãnh
    MD = 5  // Bảo lãnh
}

enum BorrowDocument_HinhThucXuatKHo {
    XuatCaBi = 1,
    XuatMotPhan = 2
}

enum BorrowDocument_RecipientObject {
    CanBoTpBank = 1,
    ChuTSBD = 2,
    NguoiDuocUyQuyen = 3,
    CanBoTPBankNotUser = 4
}

enum ImportStoreNextAction {
    ChoHTTDDuyet = 1,
    ChoBanGiaoDVKH = 2,
    ChoDVKHDuyet = 3,
    ChoBanGiaoApTai = 4,
    ChoLuuKho = 5,
    // ChoLuuKho = 6,
}

enum ImportStoreStatus {
    DaGuiQLHTTDDuyet = 1,
    HTTDDaDuyet = 2,
    HTTDTuChoi = 3,
    DaBanGiaoDVKH = 4,
    DVKHDaDuyet = 5,
    DVKHTuChoi = 6,
    DaBanGiaoChoApTai = 7,
    DaLuuKho = 8,
}

enum ImportStoreFlowType {
    HTTD = 1,
    DVKD = 2,
    KhoQuyCoDVKH = 3,
    KhoQuyKhongDVKD = 4,

    // Luồng tạo mới yêu cầu nhập kho, ẩn
    TuHTTD = 5,
    TuDVKH = 6,
}

enum ExportStoreNextAction {
    ChoHTTDDuyet = 1,
    ChoQLKhoDuyet = 2,
    ChoXuatKho = 3,
    ChoVanChuyenVeDVKD = 4,
    ChoChuyenVeDVKH = 5,
    ChoBanGiao = 6,
    ChoHoanTra = 7,
}

enum ExportStoreStatus {
    DaGuiQLHTTDDuyet = 1,
    HTTDDaDuyet = 2,
    HTTDTuChoi = 3,
    QLKhoDaDuyet = 4,
    QLKhoTuChoi = 5,
    DangVanChuyen = 6,
    DaBanGiaoDVKH = 7,
    DaXuatKho = 8,
    DaBanGiaoTaiLieu = 9,
}


enum Traffic_PaperStatus {
    MoiTao = 1,
    ChoDuyet = 8,
    DaDuyet = 16,
    DaTuChoi = 32,
}

enum LoaiQuyenTaiSanPhatSinhTuHopDong {
    NhaCanHo = 1,
    TaiSanKhac = 2
}

enum OwnerType {
    CaNhan = 1,
    DoanhNghiep = 2,
    HoGiaDinh = 3,
    HoKinhDoanh = 4,
}

enum STATUS_NAME {
    HieuLuc = "Hiệu lực",
}

enum STR_Export_RecipientObject {
    KhachHang = 2,
    CanBoTPB = 1,
    DVKD = 3,
}

enum ExportStore_HinhThucXuat {
    XuatCaBi = 1,
    Xuat1PhanTaiLieu = 2,
}

enum CollateralSourceType {
    DinhGia = 1,
    HTTD = 2,
    CMC = 3
}

enum AttachmentRefType {
    /* map giống bộ AttachmentRefType ở back-end*/

    // dùng cho upload multi file
    COLLATERAL = 1,
    COLLATERAL_DOCUMENT = 2,
    TrafficPaper_IDCard_MatTruoc = 3,
    TrafficPaper_DocScanFree = 4,
    VanBanDuyetMuon = 5,
    VanBanDuyetGiaHan = 6,
    GuiNhoHoSoXuatKho = 7,

    TrafficPaper_IDCard_MatSau = 9,

    COLLATERAL_INSURANCE_DOCUMENT = 10,
    BaoHiemTS = 11,
    ImportCollateralREQ = 12,
    ExportCollateralREQ = 13,
    MortgageContract = 14,
    Briefcase = 15,
    ExportProposal = 16,
    StoreFolder = 17,
    ImportProposal = 18,
    TrafficPaper_Exception = 19,

    ExportCollateral = 20, // tờ trình xuất kho
    TempImport = 21, // nhập kho gửi nhờ

    // upload single file UC
    BanInTuyChinhHD = 100,
}

enum AttachmentPermisison {
    BorrowDocument = 1,
    TrafficPaper = 2
}

enum MortgageContract_Type {
    HopDongBaoDam = 1,
    HopDongKhung = 2
}

enum EmployeeSelectorExportCollateralMode {
    XuatKho_NguoiPheDuyetTinDung = 1,
    XuatKho_NguoiPheDuyetXuatKho = 2
}

enum CollateralUCMode {
    All = 1,
    SearchByStatus = 2
}

enum ECollateral_Status {
    ChuaNhapKho = 1,
    DaNhapKho = 2,
    DaXuatKho = 3
}

enum StoreType {
    KhoTaiSan_HTTD = 1,
    KhoQuy = 2,
    KhoDVKH = 3,
    KhoKSS = 4,
    KhoBenThuBa = 5,
    KhoTaiLieu_HTTD = 6
}

enum WordTransformExportType {
    Word,
    Pdf,
}

enum ECollateralDocumentStatus {
    NgoaiKho = 1, // 1: Ngoài kho
    TrongKho = 2, // 2: Trong kho
    DaXuatKho = 3, // 3: Dã xuất kho
    ThatLac = 4, // 4: Thất lạc
}

enum ECreditDocumentStatus {
    ChuaLuuKho = 1, // 1: Chưa lưu kho
    DaNhapKho = 2, // 2: Đã nhập kho
    DaChuyenKho = 3, // 3: Đã chuyển kho
    DangChoMuon = 4, // 4: Đang cho mượn
}

enum EMortgageAssetStatus {
    ChuaHinhThanh = 1,
    DaHinhThanh = 2
}

enum DepositoryPlace {
    TPB = 1,
    Khac = 2
}

enum MortgageContract_DanChieuSoTienCapTDBD {
    CoDanChieu = 1,
    KhongDanChieu = 2
}

enum OrganizationSelectorMode {
    All = 1,
    ByCurrentUser = 2
}

enum RATIO_PAYLOAD {
    CHANGE_CONTRACT_VALUE_AMOUNT = 1, // nhập giá trị tài sản trên HĐ
    CHANGE_MAX_MORTGAGE_AMOUNT = 2, // nhập giá trị bảo đảm tối đa
    CHANGE_MAX_MORTGAGE_RATIO = 3, // nhập tỷ lệ
    CHANGE_VALUATION_CURR_AMOUNT = 4 // nhập giá trị định giá
}

enum MortgageContract_ThuTuNghiaVuBD {
    NghiaVu2 = 1,
    Khac = 2,
}

enum NghiepVuHauKiem {
    DuyetNhapKho = 1,
    DuyetXuatKho = 2,
    DaoChap = 4,
    MuonTaiLieu = 8,
    TraTaiLieu = 16
}

enum PostCheckStatus {
    ChuaHauKiem = 1,
    DangHauKiem = 2,
    DaHauKiem = 3
}

enum PostCheckDetailStatus {
    ChuaHauKiem = 1,
    DangHauKiem = 2,
    Dat = 3,
    Loi = 4
}

enum MortgageContractStatus {
    DangSoan = 1,
    DaTrinhKy = 2,
    DaDuyetThongTinHopDong = 3,
    DaTrinhNhapKho = 4,
    DaDuyetNhapKho = 5,
    TuChoiThongTinHopDong = 7,
    TuChoiDuyetNhapKho = 8
}

enum MortgageContractImportStatus {
    // Trạng thái nhập kho
    //1: Đã trình nhập kho
    DaTrinhNhapKho = 1,

    //2: Đã duyệt nhập kho
    DaDuyetNhapKho = 2,

    //3: Từ chối duyệt nhập kho
    TuChoiDuyetNhapKho = 3,

    //4: Đã xuất kho
    DaXuatKho = 4
}

enum EUserActionLogRefType {
    HDBD = 1,
    XuatKhoTaiSanBD = 2,
    NhapKhoTaiLieu = 3,
    XuatKhoTaiLieu = 4,
    BiTaiLieu = 5,
    TaiLieu = 6,
    BiHoSoTinDung = 7
}

enum ETemplateType {
    /// <summary>
    /// Hợp đồng bảo đảm
    /// </summary>
    HDBD = 1,
    /// <summary>
    /// Phụ lục HĐBĐ
    /// </summary>
    HDBD_PhuLuc = 2,
    /// <summary>
    /// Đơn đăng ký giao dịch bảo đảm
    /// </summary>
    DangKyGDBD = 3,
    /// <summary>
    /// Hợp đồng tín dụng
    /// </summary>
    HDTD = 4,
    /// <summary>
    /// Phụ lục HĐTD
    /// </summary>
    HDTD_PhuLuc = 5,
    /// <summary>
    /// Phụ lục HĐTD
    /// </summary>
    GiayNhanNo = 6,
    /// <summary>
    /// Biên bản thỏa thuận định giá
    /// </summary>
    BBThoaThuanDG = 7,
    /// <summary>
    /// GIấy biên nhận HSTSBĐ
    /// </summary>
    GiayBienNhanHSTSBD = 8,
    /// <summary>
    /// Xóa đăng ký giao dịch bảo đảm
    /// </summary>
    XoaDangKyGDBD = 9,
    /// <summary>
    /// Thông báo giải chấp
    /// </summary>
    GiaiChap = 10,
    /// <summary>
    /// GIấy biên nhận thế chấp
    /// </summary>
    GiayBienNhanTheChap = 11,

    /// <summary>
    /// Văn bản khác HĐTD
    /// </summary>
    HDTD_VanBanKhac = 98,
    /// <summary>
    /// Văn bản khác HDBD
    /// </summary>
    HDBD_VanBanKhac = 99
}

enum ESearchCustomerInfo {
    TaiSan = 1,
    HDBD = 2,
    HDTD = 3
}

enum EImportPlacetype {
    DVKD = 1,
    CABDS = 2
}

enum EContractTypePrinting {
    /// <summary>
    /// Hợp đồng bảo dảm
    /// </summary>
    HDBD = 1,
    /// <summary>
    /// Hợp đồng Tín dụng
    /// </summary>
    HDTD = 2,
    /// <summary>
    /// Khác
    /// </summary>
    Khac = 99,
}
enum EMortgageContractAppendixType {
    PhulucHD = 1,
    PhulucTaiSan = 2
}

enum DefaultTextValue {
    HanMucKHDN_CREDIT_DEADLINE = "12 tháng kể từ ngày ký Hợp Đồng Cấp Tín Dụng này",
    VayMonKHCN_HKD_KHDN_LOAN_DURATION = "cho vay từng lần",
    VayMonKHCN_HKD_KHDN_INTEREST_TERM = '- Lãi suất cố định: .......%/ năm áp dụng cho hết thời hạn cho vay; \r\n' +
    '- Lãi suất linh hoạt như sau: ; \r\n' +
    'a.  Lãi suất áp dụng …….. tháng tiếp theo kể từ ngày giải ngân: ……….%/năm\r\n' +
    'b. Lãi suất áp dụng cho thời gian tiếp theo: Lãi suất được điều chỉnh định kỳ………… tháng một lần và bằng Lãi suất cơ sở KHCN kỳ hạn 3 tháng của TPBank tại thời điểm điều chỉnh cộng (+) biên độ …………%/ năm\r\n' +
    '-Lãi suất linh hoạt như sau:  Bằng Lãi suất cơ sở KHCN kỳ hạn 3 tháng  của TPBank cộng (+) biên độ ……….%/ năm. Lãi suất được điều chỉnh khi Lãi suất cơ sở KHCN kỳ hạn 3 tháng của TPBank thay đổi và bằng Lãi suất cơ sở KHCN kỳ hạn 3 tháng của TPBank tại thời điểm điều chỉnh cộng (+) biên độ ………….. năm',
    VayMonKHCN_HKD_KHDN_DISBURSEMENT_METHOD = '- Phương thức khác: Giải ngân vào tài khoản thanh toán của khách hàng số …………….…………mở tại TPBank\r\n' +
    '- Chuyển khoản trực tiếp cho bên thụ hưởng với thông tin chi tiết như sau:\r\n' +
    '- Tên tài khoản: ………………\r\n' +
    '- Số tài khoản: ………………Tại Ngân hàng: ………………\r\n' +
    '- Số tiền: ……………… đồng (Bằng chữ: ……………………………………..)\r\n' +
    '- Nội dung: ………………………………………………………………………………..',
    VayMonKHCN_HKD_KHDN_GUARANTEE_METHOD = '- Theo quy định tại Hợp Đồng Cấp Tín Dụng\r\n' +
    '- Ký quỹ: ……………… (tương đương: ……………… % trị giá thư bảo lãnh) (Bằng chữ: ………………)\r\n' +
    '- Cầm cố/Thế chấp theo Hợp đồng ……………… số ……………… ngày ……………… ký giữa ……………… và ………………',
    VayMonKHCN_HKD_KHDN_LIMIT_TERM = '........... tháng kể từ ngày tiếp theo của ngày giải ngân đầu tiên. Thời gian ân hạn gốc:………tháng kể từ ngày giải ngân đầu tiên',
    VayMonKHCN_HKD_KHDN_PRINCIPAL_PAY_DURATION = '01 tháng/lần vào ngày .....',
    VayMonKHCN_HKD_KHDN_INTEREST_PAY_DURATION = '01 tháng/lần',
    VayMonKHCN_HKD_KHDN_INTEREST_CHANGE_TERM = '03 tháng/lần',
    VayMonKHCN_HKD_KHDN_DEADLINE = '...../...../........',
    VayMonKHCN_HKD_KHDN_DISBURSEMENT_REQUEST_DATE = '...../...../........',
    VayMonKHCN_HKD_KHDN_DEPOSIT_ACCOUNT = '..........................',
    VayHanMucThauChiKHCN_HKD_INTEREST_CHANGE_TERM = 'Thả nổi',
    VayHanMucThauChiKHCN_HKD_LIMIT_TERM = '.... tháng từ ngày ...../...../........ đến ngày ...../..../........'
}

export {
    ResponseCode,
    LichHop_TrangThai,
    AuthenticationType,
    ListMonth,
    LoaiPhuongAnTTB5,
    EmployeeSelectorMode,
    ConfirmBoxButton,
    ReportingStatus,
    ConfigParameter,
    AttachmentSource,
    FunctionCodes,
    Gender,
    ActiveStatus,
    ApprovalStatus,
    CustomerType,
    ConfigRight,
    DayOfWeek,
    OrganizationLevel,
    TemplateType,
    TransformType,
    TriggerType,
    ECMRefType,
    GeneralSetting,
    AlertType,

    FlowCategory,
    awf_RefType,
    RejectAction,
    BussinerType,
    AnChiVaTaiSan,
    CollectionType,
    RouteLinkSymbol,

    QuaterOfYear,
    DynamicReport_KhoGiay,
    DynamicReport_HuongGiay,
    DynamicReport_Status,
    ReportInputType,
    ImportExceptionType,

    // FlexOffice
    BanTin_Loai,
    BanTin_TrangThai,
    Publish_Loai,
    LichLamViec_TrangThai,
    EImportCollateralREQStatus,
    CollateralType,
    LoaiKho,
    DonViThoiGian,
    ECollateral_AddNewStatus,

    Contract_Type,
    BorrowDocument_HinhThucXuatKHo,
    BorrowDocument_RecipientObject,

    ImportStoreNextAction,
    ImportStoreStatus,

    Traffic_PaperStatus,
    LoaiQuyenTaiSanPhatSinhTuHopDong,

    OwnerType,
    ImportStoreFlowType,

    STATUS_NAME,
    STR_Export_RecipientObject,
    ExportStoreNextAction,
    ExportStoreStatus,
    ExportStore_HinhThucXuat,
    CollateralSourceType,
    AttachmentRefType,
    MortgageContract_Type,
    EmployeeSelectorExportCollateralMode,
    CollateralUCMode,
    ECollateral_Status,
    StoreType,
    WordTransformExportType,
    ECollateralDocumentStatus,
    EMortgageAssetStatus,
    DepositoryPlace,
    MortgageContract_DanChieuSoTienCapTDBD,
    OrganizationSelectorMode,
    ECreditDocumentStatus,
    RATIO_PAYLOAD,
    MortgageContract_ThuTuNghiaVuBD,
    NghiepVuHauKiem,
    PostCheckStatus,
    MortgageContractStatus,
    EUserActionLogRefType,
    AttachmentPermisison,
    ETemplateType,
    MortgageContractImportStatus,

    ESearchCustomerInfo,
    EImportPlacetype,
    EContractTypePrinting,
    EMortgageContractAppendixType,
    PostCheckDetailStatus,
    DefaultTextValue
};
