export interface TheButtonProps {
  className?: string;
  type?: 'solid' | 'outline' | 'filled';
  color?: 'black';
  icon?: React.ReactNode;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
