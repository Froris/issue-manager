import React from 'react';
import { Card, Flex, Text } from '@radix-ui/themes';
import { Status } from '@prisma/client';
import Link from 'next/link';

// open, closed, inProgress - amount of issues

const IssuesSummary = ({
  open,
  closed,
  inProgress,
}: {
  open: number;
  closed: number;
  inProgress: number;
}) => {
  const containers: { label: string; value: number; status: Status }[] = [
    {
      label: 'Open',
      value: open,
      status: 'OPEN',
    },
    {
      label: 'Closed',
      value: closed,
      status: 'CLOSED',
    },
    {
      label: 'In-progress',
      value: inProgress,
      status: 'IN_PROGRESS',
    },
  ];

  return (
    <Flex gap='4'>
      {containers.map((container) => (
        <Card key={container.label}>
          <Flex direction='column' gap='1'>
            <Link
              className='text-sm font-medium'
              href={`/issues/?status=${container.status}`}>
              {container.label}
            </Link>
            <Text size='5' className='font-bold'>
              {container.value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default IssuesSummary;
