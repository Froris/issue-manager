import { Table } from '@radix-ui/themes';
import prisma from '@/prisma/client';
import delay from 'delay';
import StatusBadge from '@/app/components/StatusBadge';
import IssueActions from '@/app/components/IssueActions';
import Link from 'next/link';

export default async function Home() {
  const issues = await prisma.issue.findMany();
  await delay(2000);

  return (
    <>
      <IssueActions />
      <Table.Root variant='surface' className='mt-5'>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>
              Created
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}> {issue.title}</Link>
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
    </>
  );
}
