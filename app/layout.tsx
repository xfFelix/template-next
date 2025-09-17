import '@ant-design/v5-patch-for-react-19';
import type { Metadata } from 'next';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import './globals.css';

export const metadata: Metadata = {
  title: '闪剪AI开放平台',
  description:
    '闪剪智能是国内领先的AI视频工具研发商,全球用户累计达3亿,旗下有闪剪、闪剪智播、Bocalive、团队快剪、飞推、字说等软件,为用户、企业提供简单易用、批量化的AI视频/直播工具及数字人定制服务，轻松搞定IP创业、自媒体、跨境电商、信息流广告、政务、金融、保险等行业客户在主流媒体平台的视频、直播营销需求。',
  keywords:
    '闪剪,闪剪数字人,闪剪智能,数字人定制,数字人分身,声音复刻,形象克隆,ai,数字人,ai数字人,AI数字人一键成片,照片说话,照片数字人,克隆人分身,数字人直播,数字人软件,无人直播,视频数字人,闪剪直播切片,趣推,严华培,闪剪APP,闪剪要钱吗,闪剪破解版,闪剪下载,闪剪免费,闪剪ai数字人,闪剪教程,数字克隆人,ai矩阵,虚拟克隆人,虚拟人,智能剪辑,批量剪辑,,虚拟形象,短视频制作,微剪辑,配音,配音神器,自媒体营销助手,自媒体创作,自媒体必备,口播,直播切片,短视频,复活亲人,声音复刻,形象克隆,声音克隆,AI智能成片,小和尚,一键生成,ai工具,ai视频',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html>
  );
}
