import { cookies } from "next/headers";

export async function POST(req: Request) {
  
  return Response.json({
    success: true,
  });
}
