import connect from "@/libs/mongodb";
import Mobile from "@/models/mobile";
import { NextResponse } from "next/server";

export async function PUT(request: any, { params }: any) {
  const { id } = params;
  const { mobile, quantity, brand, storage, ram } = await request.json();

  await connect();
  await Mobile.findByIdAndUpdate(id, { mobile, quantity, brand, storage, ram });

  return NextResponse.json(
    { message: "Mobile details updated!" },
    { status: 200 }
  );
}

export async function GET(request: any, { params }: any) {
  const { id } = params;
  await connect();

  const mobile = await Mobile.findOne({ _id: id });
  return NextResponse.json({ mobile }, { status: 200 });
}
