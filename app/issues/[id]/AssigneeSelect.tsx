'use client';
import React from 'react';
import { Select } from '@radix-ui/themes';
import { Issue, User } from '@prisma/client';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Skeleton from '@/app/components/Skeleton';
import { toast, Toaster } from 'react-hot-toast';

const UNASSIGNED: 'UNASSIGNED' = 'UNASSIGNED';
const ERROR_MESSAGE: string =
  'Changes could not be saved. Please try again later.';

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const { data: users, error, isLoading } = useUsers();

  if (error) return null;

  if (isLoading) return <Skeleton height='2rem' />;

  const assignIssue = (userId: string) => {
    axios
      .patch('/api/issues/' + issue.id, {
        assignedToUserId: userId === UNASSIGNED ? null : userId,
      })
      .catch(() => toast.error(ERROR_MESSAGE));
  };

  return (
    <>
      <Toaster />
      <Select.Root
        defaultValue={issue.assignedToUserId || ''}
        onValueChange={assignIssue}>
        <Select.Trigger placeholder='Assign...' />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value={UNASSIGNED}>Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </>
  );
};

const useUsers = () =>
  useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => axios.get('/api/users').then((response) => response.data),
    staleTime: 60 * 1000,
    retry: 2,
  });

export default AssigneeSelect;
