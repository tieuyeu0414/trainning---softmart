class adm_Role {
    public RoleID?: number;
    public Name?: string;
    public Code?: string;
    public IsPublic?: boolean;
    // public Status?: number;
    public IsSystem?: boolean;
    public IsActive?: boolean;
    public Deleted?: number;
    public Version?: number;
    public CreatedBy?: string;
    public CreatedDTG?: Date;
    public UpdatedBy?: string;
    public UpdatedDTG?: Date;
    public Description?: string;
    public CreatedOn?: string;
    public UpdatedOn?: string;
    public IsSelect?:boolean;
    public AllowToExportExcel?:boolean;
    public AllowToExportPdf?:boolean;
    public ACTIVE_NAME?: string;
}

class RoleFilter {
    public Name?: string = '';
    public IsActive?: boolean;
    public PageIndex: number = 0;
}

export { adm_Role }
export { RoleFilter }

