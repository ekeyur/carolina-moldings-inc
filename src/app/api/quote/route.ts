import { NextResponse } from "next/server";

// TODO: Wire to email delivery (e.g. Resend) — send to info@carolinamoldings.com
// Payload: { name, company, email, phone, message, items: QuoteItem[] }
export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("[Quote Request]", JSON.stringify(body, null, 2));
    // TODO: await sendEmail({ to: "info@carolinamoldings.com", ...body });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Failed to process request" }, { status: 500 });
  }
}
