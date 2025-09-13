import cls from 'classnames';
import { TheButtonProps } from './const';
import styles from './TheButton.module.scss';

function TheButton(props: TheButtonProps) {
  const { children, type = 'solid', color = 'black', className, icon = null, onClick } = props;
  return (
    <button className={cls(styles.btn, styles[`btn-${type}`], styles[`btn-${color}`], className)} onClick={onClick}>
      {icon ? <span className={styles.icon}>{icon}</span> : null}
      {children}
    </button>
  );
}

export default TheButton;
