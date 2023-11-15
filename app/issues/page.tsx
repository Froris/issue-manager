import prisma from '@/prisma/client';
import { IssueActions } from '@/app/components';
import { Status } from '@prisma/client';
import Pagination from '@/app/components/Pagination';
import IssueTable, { columnValues, SearchQuery } from '@/app/issues/IssueTable';
import { Flex } from '@radix-ui/themes';
import { Metadata } from 'next';

// TODO сделать соритровку по desc

export default async function Home({
  searchParams,
}: {
  searchParams: SearchQuery;
}) {
  const pageSize = 10;
  const currentPage = parseInt(searchParams.page) || 1;

  const statuses = Object.values(Status);

  // SORT by STATUS
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  // SORT by ORDER
  const orderBy = columnValues.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: 'asc' }
    : undefined;

  // Fetching issues with queries.
  // If the "status" parameter is "undefined", Prisma will return all issues.
  const issues = await prisma.issue.findMany({
    where: {
      status,
    },
    orderBy,
    skip: (currentPage - 1) * pageSize,
    take: pageSize,
  });

  // Calculating the amount of issues with the corresponding status
  const issuesCount = await prisma.issue.count({ where: { status } });

  return (
    <Flex direction='column' gap='3'>
      <IssueActions />
      <IssueTable issues={issues} searchParams={searchParams} />
      <Pagination
        currentPage={currentPage}
        pageSize={pageSize}
        itemsCount={issuesCount}
      />
    </Flex>
  );
}

export const metadata: Metadata = {
  title: 'Issue Tracker - List',
  description: 'View all of project issues',
};
