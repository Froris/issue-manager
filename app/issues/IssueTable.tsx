import React from 'react';
import { Flex, Table } from '@radix-ui/themes';
import NextLink from 'next/link';
import { ArrowUpIcon } from '@radix-ui/react-icons';
import { Link, StatusBadge } from '@/app/components';
import { Issue, Status } from '@prisma/client';

export interface SearchQuery {
  status: Status;
  orderBy: keyof Issue;
  page: string;
}

interface Props {
  searchParams: SearchQuery;
  issues: Issue[];
}

const IssueTable = ({ searchParams, issues }: Props) => {
  return (
    <Table.Root variant='surface'>
      <Table.Header>
        <Table.Row>
          {columns.map((column) => (
            <Table.ColumnHeaderCell
              key={column.value}
              className={column.className}>
              <Flex direction='row' align='center'>
                <NextLink
                  href={{
                    query: { ...searchParams, orderBy: column.value },
                  }}>
                  {column.label}
                </NextLink>
                {column.value === searchParams.orderBy && <ArrowUpIcon />}
              </Flex>
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {issues.map((issue) => (
          <Table.Row key={issue.id}>
            <Table.Cell>
              <Link url={`/issues/${issue.id}`} label={issue.title} />
              <div className='block md:hidden'>
                <StatusBadge status={issue.status} />
              </div>
            </Table.Cell>
            <Table.Cell className='hidden md:table-cell'>
              <StatusBadge status={issue.status} />
            </Table.Cell>
            <Table.Cell className='hidden md:table-cell'>
              {issue.createdAt.toDateString()}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

const columns: { label: string; value: keyof Issue; className?: string }[] = [
  { label: 'Issue', value: 'title' },
  { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
  { label: 'Created', value: 'createdAt', className: 'hidden md:table-cell' },
];

/*
 * The Page needs column values for validation and sorting,
 * but in order not to duplicate the object and not to violate the encapsulation
 * principle with leaked styles that are related only to the table component,
 * we create a new array with column values only.
 * */
export const columnValues = columns.map((column) => column.value);

export default IssueTable;
