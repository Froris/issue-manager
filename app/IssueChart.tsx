'use client';
import React from 'react';
import { Card } from '@radix-ui/themes';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

const IssueChart = ({
  open,
  closed,
  inProgress,
}: {
  open: number;
  closed: number;
  inProgress: number;
}) => {
  const data = [
    {
      label: 'Open',
      value: open,
    },
    {
      label: 'In-progress',
      value: inProgress,
    },
    {
      label: 'Closed',
      value: closed,
    },
  ];

  return (
    <Card>
      <ResponsiveContainer width='100%' height={300}>
        <BarChart data={data}>
          <XAxis dataKey='label' />
          <YAxis />
          <Bar dataKey='value' barSize={60} fill='var(--accent-9)' />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IssueChart;
