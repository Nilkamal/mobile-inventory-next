import connect from "@/libs/mongodb";
import Brand from "@/models/brand";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connect();

    const { brand } = await request.json();

    const b = await Brand.create({ brand });
    if (b._id) {
      return NextResponse.json(
        { message: "New Brands Added!" },
        { status: 201 }
      );
    }
  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: 400 });
  }
}

export async function GET() {
  await connect();
  const brands = await Brand.find({});
  return NextResponse.json({ brands }, { status: 200 });
}
