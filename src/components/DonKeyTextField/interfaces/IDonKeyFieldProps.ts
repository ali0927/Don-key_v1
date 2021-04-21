
export interface IDonKeyFieldProps {
     label: string;
     value: string;
     onChange: (value: string) => void;
     placeholder?: string;
     multiline?: boolean;
     rows?: number;
     className?: string;
}