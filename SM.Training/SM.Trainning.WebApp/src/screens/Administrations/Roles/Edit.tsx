import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ComboBox, ErrorHandler, FieldValidator, SMButton, SMMultiSelect, TextArea, TextBox } from '../../../components/ComponentLib';
import LoadingModal from '../../../components/LoadingModal';
import { ListItem } from '../../../components/SMMultiSelect';
import SMX from "../../../constants/SMX";
import { adm_Role } from '../../../entities/Administration/adm_Role';
import { iBaseProps, iBaseState } from '../../../Interfaces/iBaseComponent';
import iKeyValuePair from '../../../Interfaces/iKeyValuePair';
import { SMXException } from '../../../models/SMXException';
import { Icons } from '../../../themes';
import Utility from '../../../Utils/Utility';
import { RouteUrls } from '../../RouteManager';

interface iProps extends iBaseProps {

}

interface iState extends iBaseState {
    role: adm_Role,
    roleID: number,
    ListActiveStatus: Array<iKeyValuePair<boolean, string>>,
    ListSpecialPowers: ListItem[],
    ListSpecialPowersID: Array<number>,
}

export default class RoleEdit extends Component<iProps, iState> {
    constructor(props: any) {
        super(props);
        this.state = {
            roleID: parseInt(this.props.match.params.id),
            role: {},
            FunctionCodes: [],
            ListActiveStatus: [],
            ListSpecialPowers: [],
            ListSpecialPowersID: [],
        }
    }

    async componentDidMount() {
        LoadingModal.showLoading();
        try {
            await this.setUpEdit();
        }
        catch (ex) {
            ErrorHandler.HandlerException(ex);
        }
        LoadingModal.hideLoading();
    }

    async setUpEdit() {
        // const request = new adm_RoleDTO();
        // request.RoleID = this.state.roleID;
        // const response = await HttpUtils.post<adm_RoleDTO>(
        //     ApiUrl.Role_Execute,
        //     SMX.ApiActionCode.SetupEditForm,
        //     JSON.stringify(request)
        // );
        // this.setState({
        //     role: response.Role || {},
        //     FunctionCodes: response.FunctionCodes,
        //     ListActiveStatus: response.ListActiveStatus!,
        // })
    }

    async saveData() {
        // const request = new adm_RoleDTO();
        // let RoleItem = this.state.role;
        // let Fixed_Rights = 0;

        // this.state.ListSpecialPowersID.forEach((item) => {
        //     Fixed_Rights = item + Fixed_Rights;
        // })

        // request.Role = RoleItem;
        // const response = await HttpUtils.post<adm_RoleDTO>(
        //     ApiUrl.Role_Execute,
        //     SMX.ApiActionCode.UpdateItem,
        //     JSON.stringify(request)
        // );
    }

    async onPressSave() {
        LoadingModal.showLoading();
        try {
            if (FieldValidator.HasError() === true) {
                throw SMXException.CreateDataInvalidException();
            }

            await this.saveData()
            this.props.history.push(`../${RouteUrls.Display}/${this.state.roleID}`)
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
                        <h1>Chỉnh sửa nhóm người dùng</h1>
                    </div>
                    <div className="p-toolbar-group-right">
                        <SMButton className={'sm-button'} onClick={() => this.onPressSave()}>
                            <i className={`${Icons.save}`} /> {' Lưu'}
                        </SMButton>
                        <Link className={'sm-button-link margin-left-5'} to={`../${RouteUrls.Display}/${this.state.roleID}`}>
                            <i className={`${Icons.exit}`} /> {' Thoát'}
                        </Link>
                    </div>
                </div>
                <div className="card card-w-title box-grid-custom">
                    <div className="p-grid">
                        <div className="p-col-4">
                            <span className="title-info required">Tên nhóm</span>
                            <FieldValidator value={role.Name} className="validator"
                                required={true} requiredMessage={SMX.ValidateMessage.RequiredField} />
                            <TextBox
                                className="sm-textbox w-100"
                                maxLength={256}
                                onChange={(e: any) => {
                                    const role = this.state.role;
                                    role.Name = e.target.value;
                                    this.setState({ role })
                                }}
                                value={role.Name || ''}
                            />
                        </div>
                        <div className="p-col-4">
                            <span className="title-info required">Mã nhóm</span>
                            <FieldValidator value={role.Code} className="validator"
                                required={true} requiredMessage={SMX.ValidateMessage.RequiredField} />
                            <TextBox
                                className="sm-textbox w-100"
                                maxLength={64}
                                onChange={(e: any) => {
                                    const role = this.state.role;
                                    role.Code = e.target.value;
                                    this.setState({ role })
                                }}
                                value={role.Code || ''}
                            />
                        </div>
                    </div>
                    <div className="p-grid">
                        <div className="p-col-8">
                            <span className="title-info">Quyền hạn đặc biệt</span>
                            <SMMultiSelect
                                dataSource={this.state.ListSpecialPowers}
                                textField="label"
                                valueField="id"
                                addBlankItem={true}
                                blankItemText={''}
                                filter={true}
                                onChange={(value, item) => {
                                    if (value?.length == 0) {
                                        let lst = this.state.ListSpecialPowersID;
                                        lst.length = 0;
                                        this.setState({ ListSpecialPowersID: lst })
                                    }
                                    else {
                                        this.setState({ ListSpecialPowersID: value! })
                                    }
                                }}
                                selectedValue={this.state.ListSpecialPowersID}
                            />
                        </div>
                    </div>
                    <div className="p-grid">
                        <div className="p-col-8">
                            <span className="title-info">Mô tả</span>
                            <TextArea
                                className="sm-textbox w-100"
                                rows={1}
                                maxLength={512}
                                onChange={(e: any) => {
                                    const role = this.state.role;
                                    role.Description = e.target.value;
                                    this.setState({ role })
                                }}
                                value={role.Description || ''}
                            />
                        </div>
                    </div>
                    <div className="p-grid">
                        <div className="p-col-4">
                            <span className="title-info">Trạng thái</span>
                            <ComboBox dataSource={this.state.ListActiveStatus}
                                textField="Value" valueField="Key"
                                selectedValue={Utility.GetBoolString(role.IsActive)}
                                className="sm-combobox w-100"
                                onChange={(e: string) => {
                                    const role = this.state.role;
                                    role.IsActive = Utility.ParseBool(e);
                                    this.setState({ role });
                                }}
                            />
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}