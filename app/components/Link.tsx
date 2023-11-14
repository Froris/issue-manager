import React from 'react';
import NextLink from 'next/link';
import { Link as RadixLink } from '@radix-ui/themes';

interface Props {
  url: string;
  label: string;
}

const Link = ({ url, label }: Props) => {
  return (
    <NextLink href={url} passHref legacyBehavior>
      <RadixLink>{label}</RadixLink>
    </NextLink>
  );
};

export default Link;
