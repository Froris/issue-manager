'use client';

import Link from 'next/link';
import React from 'react';
import { AiFillBug } from 'react-icons/ai';
import { usePathname } from 'next/navigation';
import classNames from 'classnames';
import { useSession } from 'next-auth/react';
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from '@radix-ui/themes';
import Skeleton from '@/app/components/Skeleton';

const NavBar = () => {
  return (
    <nav className='border-b'>
      <Container>
        <Flex justify='between' className='px-5 py-3'>
          <Flex align='center' gap='3'>
            <Link href='/'>
              <AiFillBug />
            </Link>
            <NavLinks />
          </Flex>
          <Box>
            <AuthStatus />
          </Box>
        </Flex>
      </Container>
    </nav>
  );
};

export const NavLinks = () => {
  const currentPath = usePathname();

  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues' },
  ];

  return (
    <ul className='flex space-x-6 items-center'>
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className={classNames({
              'nav-link': true,
              '!text-zinc-900': currentPath === link.href,
            })}>
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status === 'loading') return <Skeleton width='3rem' />;

  if (status !== 'authenticated') {
    return (
      <Link href='/api/auth/signin' className='nav-link'>
        Log in
      </Link>
    );
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Avatar
          src={session.user!.image!}
          fallback='?'
          size='2'
          radius='full'
          className='cursor-pointer'
          referrerPolicy='no-referrer'
        />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Label>
          <Text size='2'>{session.user!.email}</Text>
        </DropdownMenu.Label>
        <DropdownMenu.Item>
          <Link href='/api/auth/signout'>Log out</Link>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default NavBar;
