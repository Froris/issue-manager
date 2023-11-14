import React from 'react';
import dynamic from 'next/dynamic';
import delay from 'delay';
import IssueFormSkeleton from '@/app/issues/_components/IssueFormSkeleton';

const IssueForm = dynamic(() => import('@/app/issues/_components/IssueForm'), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

const NewIssuePage = () => {
  delay(2000);
  return (
    <>
      <IssueForm />
    </>
  );
};

export default NewIssuePage;
