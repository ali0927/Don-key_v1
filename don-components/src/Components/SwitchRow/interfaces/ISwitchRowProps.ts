export interface ISwitchRowProps {
  heading: string;
  subHeading: string;
  checked: boolean;
  onSwitchChange: () => void;
  className?: string;
}
