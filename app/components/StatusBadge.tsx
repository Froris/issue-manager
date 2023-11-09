import React from 'react';
import { Status } from '@prisma/client';
import { Badge } from '@radix-ui/themes';

/*
 * The Record type in TypeScript is used to create a dictionary of key-value pairs,
 * where the keys and values can have specific types. A Record type is essentially an object type,
 * but it provides a way to specify the types of the keys and
 * values for better type checking and code readability.
 * */
const statusMap: Record<
  Status,
  {
    label: string;
    color: 'red' | 'violet' | 'green';
  }
> = {
  OPEN: { label: 'Open', color: 'red' },
  IN_PROGRESS: { label: 'In Progress', color: 'violet' },
  CLOSED: { label: 'Closed', color: 'green' },
};

const StatusBadge = ({ status }: { status: Status }) => {
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  );
};

export default StatusBadge;
