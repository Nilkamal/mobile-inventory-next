import connect from "@/libs/mongodb";
import Brand from "@/models/brand";
import Mobile from "@/models/mobile";
import { NextResponse } from "next/server";

export async function POST(request: any) {
  const { mobile, quantity, storage, ram, brand } = await request.json();
  await connect();

  const existing = Mobile.findOne({ mobile, storage, ram, brand });

  if (!existing) {
    await Mobile.create({ mobile, quantity, storage, ram, brand });
    return NextResponse.json({ message: "New Mobile Saved!" }, { status: 201 });
  }

  return NextResponse.json(
    { message: "Mobile already exist with combinations" },
    { status: 400 }
  );
}

export async function GET() {
  await connect();
  const mobiles = await Mobile.find({});
  const mobilesWithQuantity = mobiles.filter((m) => m.quantity > 0);
  for (let mobile of mobilesWithQuantity) {
    const brandRequest = await Brand.findOne({ _id: mobile.brand });
    const { brand } = brandRequest;
    mobile.brand = brand;
  }
  return NextResponse.json(mobiles);
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connect();
  await Mobile.findByIdAndDelete(id);
  return NextResponse.json({ message: "Mobile deleted!" }, { status: 200 });
}
