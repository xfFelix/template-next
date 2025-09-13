'use client';
import React from 'react';
import ApiKeyCpn from '@/components/ApiKeyCpn';
import { ApiKeyTableType } from '@/types/ApiKey';

export default function ApiKey({ data }: { data: ApiKeyTableType[] }) {
  return <ApiKeyCpn data={data} />;
}
