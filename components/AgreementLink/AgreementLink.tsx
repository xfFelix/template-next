'use client';
import { LinkProps } from 'antd/es/typography/Link';
import { Typography } from 'antd';

const { Link } = Typography;

interface AgreementLinkProps extends LinkProps {
  url: string;
  desc: string;
  fontSize?: number;
}
function AgreementLink(props: AgreementLinkProps) {
  const { url, desc, fontSize } = props;
  return (
    <Link
      {...props}
      onClick={e => {
        e.preventDefault();
        window.open(url);
      }}
      style={{ fontSize, padding: '0 5px' }}
    >
      {desc}
    </Link>
  );
}
export default AgreementLink;
