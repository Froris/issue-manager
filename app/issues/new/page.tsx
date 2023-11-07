'use client';
import React from 'react';
import { Button, TextArea, TextField } from '@radix-ui/themes';

const NewIssuePage = () => {
  return (
    <div className='max-w-xl space-y-3'>
      <TextField.Root>
        <TextField.Input placeholder='Search the docs…' />
      </TextField.Root>
      <TextArea placeholder='Reply to comment…' />
      <Button>CREATE</Button>
    </div>
  );
};

export default NewIssuePage;
