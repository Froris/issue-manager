import React from 'react';
import { Avatar, Card, Flex, Heading, Table } from '@radix-ui/themes';
import prisma from '@/prisma/client';
import NextLink from 'next/link';
import { StatusBadge } from '@/app/components';

const LatestIssue = async () => {
  const latestIssues = await prisma.issue.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    take: 5,
    include: {
      assignedToUser: true,
    },
  });

  return (
    <Card>
      <Heading size='4' className='mb-5'>
        Latest Issues
      </Heading>
      <Table.Root>
        {latestIssues.map((issue) => (
          <Table.Row key={issue.id}>
            <Table.Cell>
              <Flex justify='between'>
                <Flex direction='column' align='start' gap='2'>
                  <NextLink href={`/issues/${issue.id}`}>
                    {issue.title}
                  </NextLink>
                  <StatusBadge status={issue.status} />
                </Flex>
                {issue.assignedToUser && (
                  <Flex align='center' justify='end'>
                    <Avatar
                      src={issue.assignedToUser.image!}
                      fallback='?'
                      size='2'
                      radius='full'
                      className='cursor-pointer'
                      referrerPolicy='no-referrer'
                    />
                  </Flex>
                )}
              </Flex>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Root>
    </Card>
  );
};

export default LatestIssue;
