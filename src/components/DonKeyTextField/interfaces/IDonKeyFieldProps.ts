
export interface IDonKeyFieldInfoState {
     type: "error" | "success";
     msg: string;
}

export interface IDonKeyFieldProps {
     label: string;
     value: string;
     onChange: (value: string) => void;
     placeholder?: string;
     multiline?: boolean;
     rows?: number;
     className?: string;
     loading?: boolean;
     isRequired?: boolean;
     info?: IDonKeyFieldInfoState;
     onFocus?: (value: string) => void;
     onBlur?: (value: string) => void;
}