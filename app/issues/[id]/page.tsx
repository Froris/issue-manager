import React from 'react';
import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import { Card, Flex, Heading } from '@radix-ui/themes';
import StatusBadge from '@/app/components/StatusBadge';
import Markdown from 'react-markdown';

interface Props {
  params: { id: string };
}

const IssueDetailsPage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!issue) {
    notFound();
  }

  return (
    <>
      <Heading>{issue.title}</Heading>
      <Flex gap='3' mt='2' mb='5'>
        <StatusBadge status={issue.status} />
        <p>{issue.createdAt.toDateString()}</p>
      </Flex>
      <Card>
        <Markdown className='prose'>{issue.description}</Markdown>
      </Card>
    </>
  );
};

export default IssueDetailsPage;
