import connect from "@/libs/mongodb";
import Brand from "@/models/brand";
import Mobile from "@/models/mobile";
import { NextResponse } from "next/server";

export async function POST(request: any) {
  const { mobile, quantity, storage, ram, brand } = await request.json();
  await connect();

  const existing = await Mobile.findOne({ mobile, storage, ram, brand });

  if (!existing) {
    await Mobile.create({ mobile, quantity, storage, ram, brand });
    return NextResponse.json({ message: "New Mobile Saved!" }, { status: 201 });
  }

  return NextResponse.json(
    { message: "Mobile already exist with combinations" },
    { status: 400 }
  );
}

export async function GET(request: any) {
  await connect();
  const { searchParams } = request.nextUrl;
  const mobile = searchParams.get("mobile");
  const storage = searchParams.get("storage");
  const ram = searchParams.get("ram");
  const brand = searchParams.get("brand");

  let query: {} | MobileSearch = {};
  if (mobile) {
    (query as MobileSearch).mobile = mobile;
  }
  if (storage) {
    (query as MobileSearch).storage = storage;
  }
  if (ram) {
    (query as MobileSearch).ram = ram;
  }
  if (brand) {
    (query as MobileSearch).brand = brand;
  }
  const mobiles = await Mobile.find({ ...query });
  const mobilesWithQuantity = mobiles.filter((m) => m.quantity > 0);
  for (let mobile of mobilesWithQuantity) {
    const brandRequest = await Brand.findOne({ _id: mobile.brand });
    const { brand } = brandRequest;
    mobile.brand = brand;
  }
  return NextResponse.json(mobiles);
}

// export async function DELETE(request) {
//   // const id = request.nextUrl.searchParams.get("id");
//   // await connect();
//   // await Mobile.findByIdAndDelete(id);
//   // return NextResponse.json({ message: "Mobile deleted!" }, { status: 200 });
// }
