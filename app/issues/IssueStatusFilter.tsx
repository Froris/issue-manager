'use client';
import { Select } from '@radix-ui/themes';
import React from 'react';
import { Status } from '@prisma/client';
import { useRouter, useSearchParams } from 'next/navigation';

const ALL: 'ALL' = 'ALL';

const statuses: { label: string; value?: Status }[] = [
  { label: ALL },
  { label: 'Open', value: 'OPEN' },
  { label: 'In progress', value: 'IN_PROGRESS' },
  { label: 'Closed', value: 'CLOSED' },
];

const IssueStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectStatus = (status: Status) => {
    const params = new URLSearchParams();

    if (status) {
      params.append('status', status);
    }

    if (searchParams.get('orderBy')) {
      params.append('orderBy', searchParams.get('orderBy')!);
    }

    const query = params.size ? '?' + params.toString() : '';
    router.push('/issues' + query);
  };

  return (
    <Select.Root
      defaultValue={searchParams.get('status') || ''}
      onValueChange={selectStatus}>
      <Select.Trigger placeholder='Filter by status...' />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={status.value} value={status.value || ALL}>
            {status.value}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
