/** 导出表格事件 */
export default function downloadExcel(data: Blob, fileName: string): void {
  const ISSERVER = typeof window === 'undefined';
  if (ISSERVER) return;
  const link = document.createElement('a');
  const blob = new Blob([data], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  link.style.display = 'none';
  link.href = URL.createObjectURL(blob);
  link.download = fileName; // 下载的文件名
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
