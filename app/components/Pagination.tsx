'use client';
import React from 'react';
import { Button, Flex, Text } from '@radix-ui/themes';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons';
import { useRouter, useSearchParams } from 'next/navigation';

interface Props {
  itemsCount: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = ({ itemsCount, pageSize, currentPage }: Props) => {
  const router = useRouter();
  const pageCount = Math.ceil(itemsCount / pageSize);
  const searchParams = useSearchParams();

  const changePage = (pageNum: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNum.toString());
    router.push('?' + params.toString());
  };

  return (
    <Flex align='center' gap='2'>
      <Text size='2'>
        Page {currentPage} of {pageCount}
      </Text>
      <Button
        onClick={() => changePage(1)}
        color='gray'
        variant='soft'
        disabled={currentPage === 1}>
        <DoubleArrowLeftIcon />
      </Button>
      <Button
        onClick={() => changePage(currentPage - 1)}
        color='gray'
        variant='soft'
        disabled={currentPage === 1}>
        <ChevronLeftIcon />
      </Button>

      <Button
        onClick={() => changePage(currentPage + 1)}
        color='gray'
        variant='soft'
        disabled={currentPage === pageCount}>
        <ChevronRightIcon />
      </Button>
      <Button
        onClick={() => changePage(pageCount)}
        color='gray'
        variant='soft'
        disabled={currentPage === pageCount}>
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  );
};

export default Pagination;
