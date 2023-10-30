import connect from "@/libs/mongodb";
import Brand from "@/models/brand";
import { NextResponse } from "next/server";

export async function GET(request: any, { params }: any) {
  const { id } = params;
  await connect();
  const brand = await Brand.findById(id);
  return NextResponse.json(brand, { status: 200 });
}

export async function PUT(request: any, { params }: any) {
  const { id } = params;
  const { brand } = await request.json();
  await connect();
  await Brand.findByIdAndUpdate(id, { brand });

  return NextResponse.json(
    { message: "Brand details updated!" },
    { status: 200 }
  );
}
