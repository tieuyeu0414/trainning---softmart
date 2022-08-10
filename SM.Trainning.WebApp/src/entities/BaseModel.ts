export default class BaseModel{
    public key?: string | number
    public action_delete?: any;
    public action_update?: any;
    public stt?: number;

    public handleConfirmStatus?: () => void;
    public handleRedoStatus?: () => void;
    public handleDelete?: () => void;
    public handleUpdateTime?: () => void;
    
}