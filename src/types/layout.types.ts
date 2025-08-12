export interface ButtonData {
  id: number;
  label: string;
  path: string;
  icon: JSX.Element;
}

export interface SidebarButtonsProps {
  activeButton: number;
  handleButtonClick: (id: number, path: string) => void;
  logout: () => void;
}
