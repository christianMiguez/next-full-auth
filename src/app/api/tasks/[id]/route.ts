import getCurrentUser from "@/utils/getCurrentUser";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma.adapter";
import { Task } from "@prisma/client";

interface Params {
  params: {
    id: string;
  };
}
export async function GET(request: Request, { params }: Params) {
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
    const task = await prisma.task.findFirst({
      where: {
        id: params.id,
      },
    });

    if (!task) {
      return NextResponse.json(
        {
          message: "task not found",
        },
        {
          status: 404,
        }
      );
    }

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

export async function DELETE(request: Request, { params }: Params) {
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
    const task = await prisma.task.delete({
      where: {
        id: params.id,
      },
    });

    if (!task) {
      return NextResponse.json(
        {
          message: "task not found",
        },
        {
          status: 404,
        }
      );
    }

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

export async function PUT(request: Request, { params }: Params) {
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
    const { title, content, userId } = await request.json();

    const task: Task = await prisma.task.update({
      where: {
        id: params.id,
      },
      data: {
        title,
        content,
        userId,
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
