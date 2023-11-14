import React from 'react';
import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import { Box, Button, Card, Flex, Grid, Heading } from '@radix-ui/themes';
import Markdown from 'react-markdown';
import Link from 'next/link';
import { StatusBadge } from '@/app/components';
import { Pencil2Icon } from '@radix-ui/react-icons';
import IssueConfirmDialog from '@/app/issues/_components/issueConfirmDialog/IssueConfirmDialog';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/authOptions';
import AssigneeSelect from '@/app/issues/[id]/AssigneeSelect';

interface Props {
  params: { id: string };
}

const IssueDetailsPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);

  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!issue) {
    notFound();
  }

  /*
   * Radix's "md" === Tailwind's "lg"
   * */

  return (
    <>
      <Grid columns={{ initial: '1', sm: '5' }} gap='5'>
        <Box className='md:col-span-4'>
          <Heading>{issue.title}</Heading>
          <Flex gap='3' mt='2' mb='5'>
            <StatusBadge status={issue.status} />
            <p>{issue.createdAt.toDateString()}</p>
          </Flex>
          <Card>
            <Markdown className='prose max-w-full'>
              {issue.description}
            </Markdown>
          </Card>
        </Box>
        {session && (
          <Box>
            <Flex direction='column' gap='5'>
              <AssigneeSelect issue={issue} />
              <Button>
                <Pencil2Icon />
                <Link href={`/issues/${issue.id}/edit`}>Edit Issue</Link>
              </Button>
              <IssueConfirmDialog issueId={issue.id} />
            </Flex>
          </Box>
        )}
      </Grid>
    </>
  );
};

export default IssueDetailsPage;
