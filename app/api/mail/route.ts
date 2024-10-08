import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic'; // defaults to auto

export async function POST(request: NextRequest) {
  
  const { message, email } = await request.json();

  try {
    return NextResponse.json({ message: "Sent Successfully" });

  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error });
  }
}
