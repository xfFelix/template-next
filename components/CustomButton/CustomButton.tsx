'use client';
import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
import cls from 'classnames';
import Style from './CustomButton.module.scss';
import ButtonType from '@/constants/enum/ButtonType';

interface CustomButtonProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  type: ButtonType;
  children: string | ReactNode | ReactNode[];
  className?: string;
  disabled?: boolean;
}

function CustomButton(props: CustomButtonProps) {
  const { type, disabled, className, children, ...other } = props;

  return (
    <div
      {...other}
      className={cls(Style['custom-button'], Style[type], className, {
        [Style.disabled]: disabled,
      })}
    >
      {children}
    </div>
  );
}

export default CustomButton;
