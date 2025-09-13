import { TableProps } from 'antd';
import { ReactNode } from 'react';

export interface TheTableProps extends TableProps {
  children?: ReactNode;
}
