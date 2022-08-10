import { observable, action } from "mobx";
import * as Enums from "../constants/Enums";
import { SMXException } from "../models/SMXException";
import {adm_Role} from "../entities/Administration/adm_Role";
import iKeyValuePair from "../Interfaces/iKeyValuePair";

export default class GlobalStore {
    @observable IsLoading: boolean = false;

    @observable Exception?: SMXException;

    // Bật loading
    @action ShowLoading() {
        this.IsLoading = true;
    }

    // Tắt loading
    @action HideLoading() {
        this.IsLoading = false;
    }

    @action HandleException = (ex?: SMXException) => {
        this.Exception = ex;
        // setTimeout((() => this.Exception = undefined), 5000)
    };

    @observable AlertShow: boolean = false;
    @observable AlertType?: string;
    @observable AlertContent?: string;

    @action AlertPopup = (type: string, content: string, timeout: number = 3000) => {
        this.AlertShow = true;
        this.AlertType = type;
        this.AlertContent = content;
        setTimeout(() => (this.AlertShow = false), timeout);
    };

    @action CloseAlertPopup = () => {
        this.AlertShow = false;
    };

    // @action SetCommandFundType(type: Enums.CommandType) {
    //     this.CommandFundType = type;
    // }

    // @action SetCommandHubType(type: Enums.CommandType) {
    //     this.CommandHubType = type;
    // }

    // @observable CommandFundType?: Enums.CommandType;
    // @observable CommandHubType?: Enums.CommandType;

    @observable RoleList?: adm_Role[];

    @observable SearchTrigger: any;


    @observable CountFilterType: number = 0;

    @observable IsSearch: boolean = false;

    @observable DebtEntryCountFilterType: number = 0;
    @observable DebtLCCountFilterType = 0;
    @observable DebtLDNBCountFilterType = 0;
    @observable DebtMDCountFilterType = 0;
    @observable DebtVAMCCountFilterType = 0;
    @observable DebtWOCountFilterType = 0;
    @observable DebtPCCountFilterType = 0;
    @observable DebtBondCountFilterType = 0;

    @observable ActiveMenu?: string = "menu-fund";
    @observable EnlargeMenu?: boolean = false;

    @observable CacheScreen: iKeyValuePair<number, string>[] = [];


    @action
    GetFilter(key: number) {
        console.log('get: ' + key);
        if (key !== null && key !== undefined) {
            let item = this.CacheScreen.find((en) => en.Key === key);
            if (item) {
                let result = item.Value;
                return result;
            } else {
                return null;
            }
        }
        return null;
    }
    @action
    SetFilter(key: number, value: string) {

        if (key !== null && key !== undefined) {
            this.CacheScreen = [];
            let obj: iKeyValuePair<number, string> = { Key: key, Value: value };
            this.CacheScreen.push(obj);
        }
        console.log('set: ' + key);
    }
    @action
    ClearFilter() {
        this.CacheScreen = [];
    }

    // @observable onUploadSignImg?: any;
    //
}
