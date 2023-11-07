'use client';
import React from 'react';
import { Button, TextField } from '@radix-ui/themes';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';

const NewIssuePage = () => {
  return (
    <div className='max-w-xl space-y-3'>
      <TextField.Root>
        <TextField.Input placeholder='Search the docs…' />
      </TextField.Root>
      <SimpleMDE />
      <Button>CREATE</Button>
    </div>
  );
};

export default NewIssuePage;
