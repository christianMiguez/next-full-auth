import getCurrentUser from "@/utils/getCurrentUser";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma.adapter";
import { Task } from "@prisma/client";

export const dynamic = "force-dynamic";
export async function GET() {
  const currentUser = await getCurrentUser();
  console.log({ currentUser });

  if (!currentUser) {
    return NextResponse.json(
      {
        message: "no user. please login",
      },
      {
        status: 401,
      }
    );
  }
  try {
    const tasks = await prisma.task.findMany({
      orderBy: {
        updatedAt: "desc",
      },
      where: {
        userId: currentUser.id,
      },
    });

    return NextResponse.json(tasks);
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json(
      {
        message: "no user. please login",
      },
      {
        status: 401,
      }
    );
  }

  try {
    const { title, content } = await request.json();

    const task: Task = await prisma.task.create({
      data: {
        title,
        content,
        userId: currentUser.id,
      },
    });

    return NextResponse.json(task);
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
