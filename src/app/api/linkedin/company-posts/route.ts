/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { getLinkedInCompanyPosts } from "@/app/_utils/getLinkedInCompanyPosts";

export async function GET() {
  try {
    const data = await getLinkedInCompanyPosts();
    return NextResponse.json(data);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
