import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';
import { createIssueSchema } from '@/app/validationSchemas';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const isValid = createIssueSchema.safeParse(body);

  if (!isValid.success) {
    return NextResponse.json({ error: isValid.error.errors }, { status: 400 });
  }

  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(newIssue, { status: 201 });
}
