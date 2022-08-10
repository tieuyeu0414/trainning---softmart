import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { DialogMessage, ErrorHandler, SMButton } from '../../../components/ComponentLib';
import LoadingModal from '../../../components/LoadingModal';
import { ListItem } from '../../../components/SMMultiSelect';
import { adm_Role } from '../../../entities/Administration/adm_Role';
import { iBaseProps, iBaseState } from '../../../Interfaces/iBaseComponent';
import iKeyValuePair from '../../../Interfaces/iKeyValuePair';
import { Icons } from '../../../themes';
import { RouteUrls } from '../../RouteManager';

interface iProps extends iBaseProps {

}

interface iState extends iBaseState {
    role: adm_Role,
    roleID: number,
    ListSpecialPowers: ListItem[],
    ListSpecialPowersID: Array<number>,
    Fixed_Rights: number,
}

export default class RoleDefault extends Component<iProps, iState> {
    constructor(props: any) {
        super(props);
        this.state = {
            roleID: parseInt(this.props.match.params.id),
            role: {},
            ListSpecialPowers: [],
            ListSpecialPowersID: [],
            Fixed_Rights: 0,
        }
    }

    async componentDidMount() {
        LoadingModal.showLoading();
        try {
            await this.setUpDisplay();
        }
        catch (ex) {
            ErrorHandler.HandlerException(ex);
        }
        LoadingModal.hideLoading();
    }

    async setUpDisplay() {
        // const request = new adm_RoleDTO();
        // request.RoleID = this.state.roleID;
        // const response = await HttpUtils.get<adm_RoleDTO>(
        //     ApiUrl.Role_Execute,
        //     SMX.ApiActionCode.SetupDisplay,
        //     JSON.stringify(request)
        // );

        // this.setState({
        //     role: response.Role!,
        //     FunctionCodes: response.FunctionCodes,
        // })

    }

    async deleteData() {
        // const request = new adm_RoleDTO();
        // request.Role = this.state.role;

        // await HttpUtils.post<adm_RoleDTO>(
        //     ApiUrl.Role_Execute,
        //     SMX.ApiActionCode.DeleteItem,
        //     JSON.stringify(request)
        // );
    }

    async onAcceptDelete() {
        LoadingModal.showLoading();
        try {
            await this.deleteData();
            this.props.history.push(`../${RouteUrls.Default}`)
        }
        catch (ex) {
            ErrorHandler.HandlerException(ex);
        }
        LoadingModal.hideLoading();
    }

    convertToListItem(listSpecialPowers: Array<iKeyValuePair<number, string>>, ItemFixed_Rights: number): Array<ListItem> {
        let result: Array<ListItem> = [];
        let tempListSpecialPowersID = this.state.ListSpecialPowersID;

        listSpecialPowers?.forEach(org => {
            let item = new ListItem();
            item.id = org.Key;
            item.checked = ((org.Key & ItemFixed_Rights) !== 0) ? true : false;
            item.label = org.Value;

            result.push(item);
        });

        result.forEach(element => {
            if (element.checked === true) {
                tempListSpecialPowersID.push(element.id!);
            }

        });

        this.setState({
            ListSpecialPowersID: tempListSpecialPowersID,
        })


        return result;
    }

    isInitPage: boolean = true;
    render() {
        // Ẩn layout khi chưa setup form
        if (this.isInitPage === true) {
            this.isInitPage = false;
            return (<></>)
        }

        const { role } = this.state;

        return (
            <div className="layout-main box-grid-custom">
                <div className="toolbar">
                    <div className="p-toolbar-group-left">
                        <h1>Chi tiết nhóm người dùng</h1>
                    </div>
                    <div className="p-toolbar-group-right">

                        <Link className={'sm-button-link'} to={`../${RouteUrls.Edit}/${role.RoleID}`}>
                            <i className={`${Icons.edit}`} /> {' Sửa'}
                        </Link>
                        <SMButton className={'sm-delete-button'} onClick={() => {
                            DialogMessage.showConfirm("Xóa nhóm người dùng", "Bạn có chắc muốn xóa nhóm người dùng?",
                                () => {
                                    this.onAcceptDelete();
                                })
                        }}>
                            <i className={`${Icons.trash}`} /> {' Xóa'}
                        </SMButton>
                        <Link className={'sm-button-link margin-left-5'} to={`../${RouteUrls.Default}`}>
                            <i className={`${Icons.exit}`} /> {' Thoát'}
                        </Link>
                    </div>
                </div>
                <div className="card card-w-title box-grid-custom">
                    <div className="p-grid">
                        <div className="p-col-4">
                            <span className="title-info">Tên nhóm</span>
                            <span className="title-value">{role.Name}</span>
                        </div>
                        <div className="p-col-4">
                            <span className="title-info">Mã số</span>
                            <span className="title-value">{role.Code}</span>
                        </div>
                    </div>
                    <div className="p-grid">
                        <div className="p-col-8">
                            <span className="title-info">Quyền hạn đặc biệt</span>
                        </div>
                    </div>
                    <div className="p-grid">
                        <div className="p-col-8">
                            <span className="title-info">Mô tả</span>
                            <span className="title-value">{role.Description}</span>
                        </div>
                    </div>
                    <div className="p-grid">
                        <div className="p-col-4">
                            <span className="title-info">Trạng thái</span>
                            <span className="title-value">
                                {role.ACTIVE_NAME}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}