import { BaseDTO, BaseFilter } from '../BaseParam';
import { adm_Role } from '../../entities/Administration/adm_Role';
import iKeyValuePair from '../../Interfaces/iKeyValuePair';

class adm_RoleDTO extends BaseDTO {
    public RoleID?: number;
    public Role?: adm_Role;
    public Roles?: Array<adm_Role>;
    public RoleFilter?: adm_RoleFilter;

    public ListActiveStatus?: Array<iKeyValuePair<boolean, string>>;
    public ListSpecialPowers?: Array<iKeyValuePair<number, string>>;

    public fileContentString?: string;

}

class adm_RoleFilter extends BaseFilter {
    public Name?: string;
    public Active?: boolean;
}

export { adm_RoleDTO, adm_RoleFilter }