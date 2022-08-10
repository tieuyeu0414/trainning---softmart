import React, { Component } from 'react';
import { Link } from "react-router-dom";
import AlertPopup from '../../../components/AlertPopup';
import { ComboBox, ErrorHandler, FieldValidator, PopupDialog, SMButton, TextBox } from '../../../components/ComponentLib';
import LoadingModal from '../../../components/LoadingModal';
import SMX from "../../../constants/SMX";
import { adm_RoleFilter } from '../../../DtoParams/Administration/RoleDto';
import { adm_Role } from '../../../entities/Administration/adm_Role';
import { iBaseProps, iBaseState } from '../../../Interfaces/iBaseComponent';
import iKeyValuePair from '../../../Interfaces/iKeyValuePair';
import PagingInfo from '../../../models/PagingInfo';
import { Icons } from '../../../themes';
import Utility from '../../../Utils/Utility';
import { RouteUrls } from '../../RouteManager';

interface iProps extends iBaseProps {

}

interface iState extends iBaseState {
    // Filter
    ListActiveStatus: Array<iKeyValuePair<boolean, string>>;
    Filter: adm_RoleFilter,

    // List
    Roles: adm_Role[],
    PagingInfo: PagingInfo,

    isShowImport?: boolean;
    FileContentString?: string;
    fileExcelName?: string;
}

export default class RoleDefault extends Component<iProps, iState> {
    private inputCreateNewRef: React.RefObject<HTMLInputElement>;
    constructor(props: any) {
        super(props);

        this.state = {
            ListActiveStatus: [],
            Filter: new adm_RoleFilter(),
            PagingInfo: new PagingInfo(),
            Roles: [],
            FunctionCodes: [],
        }
        this.inputCreateNewRef = React.createRef();
    }

    async componentDidMount() {
        LoadingModal.showLoading();
        try {
            await this.setupForm();
        }
        catch (ex) {
            ErrorHandler.HandlerException(ex);
        }
        LoadingModal.hideLoading();
    }

    async setupForm() {
        // const request = new adm_RoleDTO();

        // const response = await HttpUtils.post<adm_RoleDTO>(
        //     ApiUrl.Role_Execute,
        //     SMX.ApiActionCode.SetupViewForm,
        //     JSON.stringify(request)
        // );

        // this.setState({
        //     ListActiveStatus: response.ListActiveStatus!
        // }, async () => { await this.loadData(0) })
    }

    async doSearchAction() {
        LoadingModal.showLoading();
        try {
            await this.loadData(0);
        }
        catch (ex) {
            ErrorHandler.HandlerException(ex);
        }
        LoadingModal.hideLoading();
    }

    async doLoadMoreAction() {
        LoadingModal.showLoading();
        try {
            await this.loadData(((this.state.Filter.PageIndex) ?? 0) + 1);
        }
        catch (ex) {
            ErrorHandler.HandlerException(ex);
        }
        LoadingModal.hideLoading();
    }

    async loadData(pageIndex: number) {
        // const request = new adm_RoleDTO();

        // let filter = { ...this.state.Filter! };
        // filter.PageIndex = pageIndex;

        // request.RoleFilter = filter;

        // const response = await HttpUtils.post<adm_RoleDTO>(
        //     ApiUrl.Role_Execute,
        //     SMX.ApiActionCode.SearchData,
        //     JSON.stringify(request)
        // );

        // let finalRole: adm_Role[];
        // if (pageIndex === 0) {
        //     finalRole = response.Roles!;
        // }
        // else {
        //     finalRole = Utility.AppendSearchResult(response.Roles!, this.state.Roles!, "RoleID");
        // }

        // // Chỉ tăng page size khi trả về đủ số bản ghi của 1 page
        // if (response.Roles!.length === SMX.SMX_PageSize) {
        //     this.state.Filter.PageIndex = pageIndex;
        // }

        // this.setState({
        //     Roles: finalRole,
        //     FunctionCodes: response.FunctionCodes,
        //     PagingInfo: response.PagingInfo!
        // });
    }

    onExportFile = async () => {

    }

    async saveDataImport() {
        // const request = new adm_RoleDTO();
        // request.fileContentString = this.state.FileContentString;
        // const response = await HttpUtils.post<adm_RoleDTO>(
        //     ApiUrl.Role_Execute,
        //     SMX.ApiActionCode.ImportExcel,
        //     JSON.stringify(request)
        // );
    }

    async onPressSaveImport() {
        LoadingModal.showLoading();
        try {
            await this.saveDataImport();
            AlertPopup.show('success', 'Import thành công');
            this.setState({
                isShowImport: false
            });
            this.doLoadMoreAction();
        }
        catch (ex) {
            ErrorHandler.HandlerException(ex);
        }

        LoadingModal.hideLoading();
    }

    async onSelectFile(files: FileList | null) {
        if (files && files.length > 0) {
            let file = files[0]; // chỉ upload 1 file
            let base64String = await Utility.getImageBase64(file);

            let FileContentString = base64String.split(",")[1];
            let fileExcelName = file.name;
            this.setState({ FileContentString, fileExcelName });
        }
    }

    async onDownloadTemplate() {

    }

    isInitPage: boolean = true;
    render() {
        // Ẩn layout khi chưa setup form
        if (this.isInitPage === true) {
            this.isInitPage = false;
            return (<></>)
        }

        const filter = this.state.Filter;
        const roles = this.state.Roles!;

        return (
            <div className="layout-main box-grid-custom">
                <div className="toolbar">
                    <div className="p-toolbar-group-left">
                        <h1>Nhóm người dùng</h1>
                    </div>
                    <div className="p-toolbar-group-right">
                        <Link className={'sm-button-link'} to={`./${RouteUrls.AddNew}`}>
                            <i className={`${Icons.add}`} /> {' Tạo mới'}
                        </Link>
                    </div>
                </div>
                <div className="card card-w-title">
                    <table className="search-table">
                        <colgroup>
                            <col width="15%" />
                            <col width="20%" />
                            <col width="15%" />
                            <col width="20%" />
                            <col />
                        </colgroup>
                        <tbody>
                            <tr>
                                <th>Tên nhóm</th>
                                <td>
                                    <TextBox
                                        value={this.state.Filter.Name}
                                        className="sm-textbox w-100"
                                        onChange={(e: any) => {
                                            filter.Name = e.target.value;
                                            this.setState({ Filter: filter });
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                this.doSearchAction()
                                            }
                                        }}
                                    />
                                </td>
                                <th>Trạng thái</th>
                                <td>
                                    <ComboBox dataSource={this.state.ListActiveStatus} textField="Value" valueField="Key"
                                        selectedValue={Utility.GetBoolString(this.state.Filter!.Active)}
                                        className="sm-combobox w-100"
                                        addBlankItem={true} blankItemText="--- Tất cả ---"
                                        onChange={(e) => {
                                            filter.Active = Utility.ParseBool(e);
                                            this.setState({ Filter: filter });
                                        }}
                                    />
                                </td>
                                <td colSpan={3} style={{ whiteSpace: "nowrap" }}>
                                    <SMButton className={'sm-button margin-right-5'} onClick={() => this.doSearchAction()}>
                                        <i className={Icons.search} ></i>  Tìm kiếm
                                    </SMButton>
                                    <SMButton className={'sm-button'} onClick={() => {
                                        let newFilter = new adm_RoleFilter();
                                        newFilter.Name = "";
                                        this.setState({ Filter: newFilter },
                                            () => this.doSearchAction());
                                    }}>
                                        <i className={Icons.reset} ></i>  Reset
                                    </SMButton>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="h-datatable allow-fixheader">
                        <table style={{ width: "100%" }}>
                            <thead>
                                <tr>
                                    <th style={{ width: '40px' }}>
                                        STT
                                    </th>
                                    <th>
                                        Tên nhóm
                                    </th>
                                    <th>
                                        Mã số
                                    </th>
                                    <th>
                                        Mô tả
                                    </th>
                                    <th style={{ width: '150px' }}>
                                        Trạng thái
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    roles.map((item, index) => {
                                        return (
                                            <tr key={item.RoleID}>
                                                <td className="grid-center">
                                                    {index + 1}
                                                </td>
                                                <td>
                                                    {
                                                        <Link className="grid-link"
                                                            to={`./${RouteUrls.Display}/${item.RoleID}`} >
                                                            {item.Name}
                                                        </Link>
                                                    }
                                                </td>
                                                <td>
                                                    {item.Code}
                                                </td>
                                                <td>
                                                    {item.Description}
                                                </td>
                                                <td className="grid-center">
                                                    {item.ACTIVE_NAME}
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="load-more">
                        <SMButton className={'sm-button'} onClick={() => { this.doLoadMoreAction() }}>
                            <i className={`${Icons.repeat}`} /> {' Tải thêm'}
                        </SMButton>
                    </div>
                </div>
                {this.state.isShowImport &&
                    (
                        <PopupDialog
                            header="Import phân quyền"
                            onClose={() => {
                                this.setState({ isShowImport: false })
                            }}
                            popupStyle={{ width: 800, height: 300 }}

                            renderFooter={() => {
                                return (
                                    <div style={{ width: '100%' }}>
                                        <a style={{ cursor: 'pointer', lineHeight: '30px', float: 'left' }}
                                            onClick={() => this.onDownloadTemplate()}>
                                            <i className="fa fa-download" aria-hidden="true"></i> Tải file mẫu</a>
                                        <SMButton className="sm-button" style={{ float: 'right' }} onClick={() =>
                                            this.setState({ isShowImport: false })
                                        }>
                                            <i className={Icons.close}></i>   Đóng</SMButton>
                                        &nbsp;
                                        <SMButton className="sm-button" style={{ float: 'right' }} onClick={() =>
                                            this.onPressSaveImport()

                                        }>
                                            <i className={Icons.upload}></i>   Import</SMButton>
                                    </div>
                                )
                            }}
                        >

                            <div className="card card-w-title box-grid-custom" style={{ paddingBottom: '5px' }}>
                                <div className="p-grid">
                                    <div className="p-col-6">
                                        <span className="title-info required"
                                            style={{ width: '100%' }}>Chọn file</span>
                                    </div>
                                    <div className="p-col-6">
                                        <FieldValidator
                                            value={this.state.FileContentString}
                                            className="validator"
                                            required={true}
                                            requiredMessage={SMX.ValidateMessage.RequiredField}
                                        />
                                    </div>
                                    <div className="p-col-12">
                                        <div className="title-value-white">
                                            <p style={{
                                                display: 'inline',
                                                marginLeft: '5px'
                                            }}>{this.state.fileExcelName}</p>
                                            <span className="grid-link"
                                                style={{ textDecoration: 'underline', float: 'right' }}
                                                onClick={() => this.inputCreateNewRef.current?.click()}>Chọn</span>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="p-grid">
                                    <div className="p-col-6">
                                        <span className="title-info w-100">Log</span>
                                    </div>
                                </div> */}
                            </div>
                            <input type="file" id={`upload-file-create-new`} multiple={false} ref={this.inputCreateNewRef}
                                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                style={{ display: "none" }} onChange={(event) => this.onSelectFile(event.target.files)}
                                onClick={(event: any) => {
                                    // Khi có event onclick, clear giá trị cũ (file cũ) đã chọn
                                    event.target.value = ''
                                    this.setState({ fileExcelName: '', FileContentString: '' })
                                }}
                            />
                        </PopupDialog>

                    )}
            </div>
        )
    }
}