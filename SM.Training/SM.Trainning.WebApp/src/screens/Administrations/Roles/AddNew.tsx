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
    ListActiveStatus: Array<iKeyValuePair<boolean, string>>,
    ListSpecialPowers: ListItem[],
    ListSpecialPowersID: Array<number>,
    role: adm_Role,
}

export default class RoleAddNew extends Component<iProps, iState> {
    private roleID?: number;
    constructor(props: iProps) {
        super(props);
        const role = new adm_Role();
        this.state = {
            ListActiveStatus: [],
            ListSpecialPowers: [],
            ListSpecialPowersID: [],
            role: role,
            FunctionCodes: [],
        }
    }

    async componentDidMount() {
        LoadingModal.showLoading();
        try {
            await this.setUpAddnewForm();
        }
        catch (ex) {
            //console.log(ex);
            ErrorHandler.HandlerException(ex);
        }
        LoadingModal.hideLoading();
    }

    async setUpAddnewForm() {
        // let request = new adm_RoleDTO();
        // let res = await HttpUtils.get<adm_RoleDTO>(
        //     ApiUrl.Role_Execute,
        //     SMX.ApiActionCode.SetupAddNewForm,
        //     JSON.stringify(request)
        // );

        // this.setState({
        //     ListActiveStatus: res.ListActiveStatus!,
        //     ListSpecialPowers: this.convertToListItem(res.ListSpecialPowers!),
        // });
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
        //     SMX.ApiActionCode.AddNewItem,
        //     JSON.stringify(request)
        // );

        // this.roleID = response.RoleID;
    }

    async onPressSave() {

        LoadingModal.showLoading();
        try {
            if (FieldValidator.HasError() === true) {
                throw SMXException.CreateDataInvalidException();
            }

            await this.saveData();
            this.props.history.push(`./${RouteUrls.Display}/${this.roleID}`);
        }
        catch (ex) {
            ErrorHandler.HandlerException(ex);
        }

        LoadingModal.hideLoading();
    }

    convertToListItem(listSpecialPowers: Array<iKeyValuePair<number, string>>): Array<ListItem> {
        let result: Array<ListItem> = [];

        listSpecialPowers?.forEach(org => {
            let item = new ListItem();
            item.id = org.Key;
            item.checked = false;
            item.label = org.Value;

            result.push(item);
        });

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
                        <h1>Thêm mới nhóm người dùng</h1>
                    </div>
                    <div className="p-toolbar-group-right">
                        {
                            <SMButton className={'sm-button'} onClick={() => this.onPressSave()}>
                                <i className={`${Icons.save}`} /> {' Lưu'}
                            </SMButton>
                        }
                        <Link className={'sm-button-link margin-left-5'} to={`./${RouteUrls.Default}`}>
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
                                    this.setState({ ListSpecialPowersID: value! })
                                }}
                                selectedValue={this.state.ListSpecialPowersID}
                            />
                        </div>
                    </div>
                    <div className="p-grid">
                        <div className="p-col-8">
                            <span className="title-info">Mô tả</span>
                            <TextArea
                                rows={1}
                                className="sm-textbox w-100"
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
                                    role.IsActive = parseInt(e) === 1 ? true : false;
                                    this.setState({ role })
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}