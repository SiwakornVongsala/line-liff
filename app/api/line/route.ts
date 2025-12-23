import { NextRequest, NextResponse } from "next/server";
import axios from "@/config/axios";
import { baseUrlBackend } from "@/app/services/services";
import { log } from "console";

export async function POST(req: NextRequest) {
  try {
    const request = await req.json();

    const { params, body } = request;

    const url = new URL(`${baseUrlBackend}/unilever/event`);

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.set(key, String(value));
      }
    });

    const urlBackend = url?.toString();
    const res = await axios.post(urlBackend, JSON.stringify(body));
    return NextResponse.json(res.data, {
      status: res.status,
    });
  } catch (error) {
    console.error("API FLOW ERROR:", error);
    return NextResponse.json(
      { error: `Failed because of ${error}` },
      { status: 500 },
    );
  }
}
