'use client';
import React, { useState } from 'react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { Button } from '@radix-ui/themes';
import './styles.css';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Spinner } from '@/app/components';

const IssueConfirmDialog = ({ issueId }: { issueId: number }) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteIssue = async () => {
    try {
      setIsDeleting(true);
      await axios.delete('/api/issues/' + issueId);
      router.push('/issues');
      router.refresh();
    } catch (err) {
      setIsDeleting(false);
      setError(true);
    }
  };

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger asChild>
          <Button disabled={isDeleting} color='red'>
            Delete Issue {isDeleting && <Spinner />}
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Portal>
          <AlertDialog.Overlay className='AlertDialogOverlay' />
          <AlertDialog.Content className='AlertDialogContent'>
            <AlertDialog.Title className='AlertDialogTitle'>
              Are you sure?
            </AlertDialog.Title>
            <AlertDialog.Description className='AlertDialogDescription'>
              This action cannot be undone. This will permanently delete your
              issue.
            </AlertDialog.Description>
            <div
              style={{
                display: 'flex',
                gap: 25,
                justifyContent: 'flex-end',
              }}>
              <AlertDialog.Cancel asChild>
                <button className='Button mauve'>Cancel</button>
              </AlertDialog.Cancel>
              <AlertDialog.Action asChild>
                <button className='Button red' onClick={deleteIssue}>
                  Yes, delete the issue
                </button>
              </AlertDialog.Action>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>

      <AlertDialog.Root open={error}>
        <AlertDialog.Portal>
          <AlertDialog.Overlay className='AlertDialogOverlay' />
          <AlertDialog.Content className='AlertDialogContent'>
            <AlertDialog.Title className='AlertDialogTitle'>
              Error
            </AlertDialog.Title>
            <AlertDialog.Description className='AlertDialogDescription'>
              This issue could not be deleted.
            </AlertDialog.Description>
            <div
              style={{
                display: 'flex',
                gap: 25,
                justifyContent: 'flex-end',
              }}>
              <AlertDialog.Cancel asChild>
                <button
                  className='Button mauve'
                  onClick={() => setError(false)}>
                  Cancel
                </button>
              </AlertDialog.Cancel>
              <AlertDialog.Action asChild>
                <button className='Button red' onClick={deleteIssue}>
                  Try again
                </button>
              </AlertDialog.Action>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </>
  );
};

export default IssueConfirmDialog;
