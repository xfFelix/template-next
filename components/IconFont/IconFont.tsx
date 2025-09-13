import cls from 'classnames';
import Style from './IconFont.module.scss';

interface IconfontProps {
  icon: string;
  color?: string;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export default function IconFont(props: IconfontProps) {
  const { className, style, icon, size = 16, color, onClick } = props;

  return (
    <div
      className={cls('iconfont', `icon-${icon}`, Style.icon, className)}
      style={{
        fontSize: `${size}px`,
        lineHeight: `${size}px`,
        color,
        ...style,
      }}
      onClick={onClick}
    />
  );
}
