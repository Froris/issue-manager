import IssuesSummary from '@/app/IssuesSummary';
import prisma from '@/prisma/client';
import IssueChart from '@/app/IssueChart';
import { Flex, Grid } from '@radix-ui/themes';
import LatestIssue from '@/app/LatestIssue';
import { Metadata } from 'next';

export default async function Home() {
  // $transition: https://www.prisma.io/docs/concepts/components/prisma-client/transactions#the-transaction-api
  const [open, inProgress, closed] = await prisma.$transaction([
    prisma.issue.count({ where: { status: 'OPEN' } }),
    prisma.issue.count({ where: { status: 'IN_PROGRESS' } }),
    prisma.issue.count({ where: { status: 'CLOSED' } }),
  ]);

  return (
    <main>
      <Grid columns={{ initial: '1', md: '2' }} gap='5' mt='5'>
        <Flex direction='column' gap='5'>
          <IssuesSummary open={open} inProgress={inProgress} closed={closed} />
          <IssueChart open={open} inProgress={inProgress} closed={closed} />
        </Flex>
        <LatestIssue />
      </Grid>
    </main>
  );
}

export const metadata: Metadata = {
  title: 'Issue Tracker - Dashboard',
  description: 'View a summary of project issues',
};
