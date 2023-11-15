'use client';
import 'easymde/dist/easymde.min.css';
import React, { useState } from 'react';
import { Button, Callout, TextField } from '@radix-ui/themes';
import { z } from 'zod';
import axios from 'axios';
import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { issueSchema } from '@/app/lib/validationSchemas';
import { ErrorMessage, Spinner } from '@/app/components';
import SimpleMDE from 'react-simplemde-editor';
import { Issue } from '@prisma/client';

/* Иногда мы получаем ошибки, связанные с тем или иным свойством, которое недоступно.
 Основной причиной является пре рендеринг компонентов на сервере, даже если они 'use-client'.
 В таких моменты, если это сторонняя бибилотека, могут появится такие ошибки, поскольку
 библиотеке необходим доступ к браузерным фичам. Чтобы избежать этого, мы можем явно указать
 Next.js НЕ делать пре рендер на сервере.

 ...Но такой подход не совсем "красивый". Инпут с title сразу будет отображен, но
 вот textArea будет подгружена позже из-за dynamic vs static.
 Чтобы это исправить мо сделаем dynamic всю форму целиком (см. issues > new > page)
*/

// const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
//   ssr: false,
// });

// У нас есть этот интерфейс и схема zod. В случае изменений нам необходимо будет
// менять и интерфейс и схему. Чтобы избавиться от этого, мы можем с помоьщю zod преварщать схему в тип.
// Таким образом у нас будет один источник для типа - схема.
type IssueFormData = z.infer<typeof issueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const router = useRouter();
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);

      if (issue) {
        await axios.patch('/api/issues/' + issue.id, data);
      } else {
        await axios.post('/api/issues', data);
      }
      router.push('/issues');
      router.refresh();
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
            defaultValue={issue?.title}
            placeholder='Search the docs…'
            {...register('title')}
          />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name='description'
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE placeholder='Description...' {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button
          disabled={isSubmitting}
          type='submit'
          color='violet'
          variant='solid'>
          {issue ? 'Edit Issue' : 'Submit New Issue'}{' '}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
