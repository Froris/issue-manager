import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';
import delay from 'delay';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/authOptions';
import { issuePatchSchema } from '@/app/lib/validationSchemas';

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({}, { status: 401 });
  }

  const body = await req.json();
  const { title, description, assignedToUserId } = body;

  // Checking body validity
  // safeParse:  https://zod.dev/?id=safeparse
  const validation = issuePatchSchema.safeParse(body);
  if (!validation.success) {
    const errors = validation.error.format()._errors;
    return NextResponse.json({ error: errors }, { status: 400 });
  }

  // Checking assigned user validity
  if (assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: {
        id: assignedToUserId,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'Invalid user' }, { status: 400 });
    }
  }

  // Checking issue for existing
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!issue) {
    return NextResponse.json({ error: 'Invalid issue' }, { status: 404 });
  }

  // Updating issue
  const updatedIssue = await prisma.issue.update({
    where: {
      id: issue.id,
    },
    data: {
      title,
      description,
      assignedToUserId,
    },
  });

  return NextResponse.json(updatedIssue);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({}, { status: 401 });
  }
  await delay(2000);

  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!issue) {
    return NextResponse.json({ error: 'Invalid issue' }, { status: 404 });
  }

  await prisma.issue.delete({
    where: {
      id: parseInt(params.id),
    },
  });

  return NextResponse.json({});
}
