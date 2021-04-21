import { AxiosResponse } from "axios";

export interface IWithDrawPopupProps {
    open: boolean;
    poolAddress: string;
    onSuccess:  () => void;
    onError: (err?: AxiosResponse<any>) => void;
    onClose: () => void;
}