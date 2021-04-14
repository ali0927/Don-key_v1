
export interface IDeveloperCubeModalProps {
    show: boolean;
    headerIcon: React.ReactNode;
    size: "lg" | "sm" | "xl";
    heading: string;
    onClose: () => void;
}