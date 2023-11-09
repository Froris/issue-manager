'use client';
import 'easymde/dist/easymde.min.css';
import React, { useState } from 'react';
import { Button, Callout, TextField } from '@radix-ui/themes';
import { z } from 'zod';
import axios from 'axios';
import SimpleMDE from 'react-simplemde-editor';
import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/validationSchemas';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';

// У нас есть этот интерфейс и схема zod. В случае изменений нам необходимо будет
// менять и интерфейс и схему. Чтобы избавиться от этого, мы можем с помоьщю zod преварщать схему в тип.
// Таким образом у нас будет один источник для типа - схема.
type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);
      await axios.post('/api/issues', data).then(() => {
        router.push('/');
      });
    } catch (err) {
      setIsSubmitting(false);
      setError('Unexpected error is occurred!');
    }
  });

  return (
    <div className='max-w-xl'>
      {error && (
        <Callout.Root color='red' className='mb-5'>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className='max-w-xl space-y-3' onSubmit={onSubmit}>
        <TextField.Root>
          <TextField.Input
            placeholder='Search the docs…'
            {...register('title')}
          />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name='description'
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder='Description...' {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmitting} type='submit'>
          Submit New Issue {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
