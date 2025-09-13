/**
 * 价格转换函数, 将价格从分调整为元
 * demo: 1000 => '1,000.00'
 */
function translateAmount(amount?: number) {
  if (typeof amount !== 'number') return '';
  const str = (amount / 100).toLocaleString();
  const [yuan, fen = '0'] = str.split('.');
  return `${yuan}.${fen.padEnd(2, '0')}`;
}

export default translateAmount;
