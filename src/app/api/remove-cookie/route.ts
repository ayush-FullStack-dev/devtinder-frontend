import { cookies } from "next/headers";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.cookieName)
    return Response.json({
      success: true,
    });

  const cookieStore = await cookies();

  cookieStore.delete({
    name: "approvalId",
    domain: `.${process.env.NEXT_PUBLIC_DOMAIN!}`,
    path: "/",
  });

  return Response.json({
    success: true,
  });
}
