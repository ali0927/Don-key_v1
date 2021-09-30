export interface IMenuDropDownProps {
  label: string;
  listItems: { text: string; href: string; target?: "_blank" | "_self" }[];
  // open: boolean;
  // anchorEl: null | Element | ((element: Element) => Element);
  // onClose: () => void;
}
