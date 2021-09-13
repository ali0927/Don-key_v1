
export interface IFileUploadButtonProps {
    file?: File;
    errorMessage?: string;
    fileExtensions?: string;
    onChange:(file: File) => void;
}