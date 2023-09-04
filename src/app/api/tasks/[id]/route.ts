import { NextResponse } from "next/server";

interface Params {
  params: {
    id: string;
  };
}
export function GET(request: Request, { params }: Params) {
  return NextResponse.json({
    message: `Getting task with id ${params.id}`,
  });
}

export function DELETE(request: Request, { params }: Params) {
  return NextResponse.json({
    message: `Geting task with id ${params.id}`,
  });
}

export function PUT(request: Request, { params }: Params) {
  return NextResponse.json({
    message: `Updating task with id ${params.id}`,
  });
}
