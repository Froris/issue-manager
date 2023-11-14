import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';
import { issueSchema } from '@/app/lib/validationSchemas';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/authOptions';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({}, { status: 401 });
  }

  const body = await req.json();
  // safeParse:  https://zod.dev/?id=safeparse
  const validation = issueSchema.safeParse(body);

  if (!validation.success) {
    const errors = validation.error.format()._errors;
    return NextResponse.json({ error: errors }, { status: 400 });
  }

  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(newIssue, { status: 201 });
}
