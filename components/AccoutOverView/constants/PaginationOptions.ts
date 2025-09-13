import { TablePaginationConfig } from 'antd';

/** 分页工具 */
const PaginationOptions: TablePaginationConfig = {
  // showTotal: (size) => `共${size}页`,
  showSizeChanger: true,
  showQuickJumper: true,
  showTitle: false,
  locale: {
    jump_to: '跳转',
    items_per_page: '条/页',
    jump_to_confirm: 'string',
    page: '',
  },
};

export default PaginationOptions;
