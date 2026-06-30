import { NextResponse } from "next/server";

// TODO: Wire to email delivery (e.g. Resend) — send to info@carolinamoldings.com
// Payload: { name, company, email, phone, subject, message }
export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("[Contact Form]", JSON.stringify(body, null, 2));
    // TODO: await sendEmail({ to: "info@carolinamoldings.com", ...body });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Failed to process request" }, { status: 500 });
  }
}
