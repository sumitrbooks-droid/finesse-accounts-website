import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// MAGIC FIXES: This tells Vercel to treat this as a pure server script.
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, business_name, message, service_interest } = body;

    const { data, error } = await resend.emails.send({
      from: 'Finesse Accounts <info@finesseaccounts.com>',
      to: ['info@finesseaccounts.com'],
      subject: `New Lead: ${business_name || name} - ${service_interest || 'Inquiry'}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #334155;">
          <h2 style="color: #059669;">New Professional Inquiry</h2>
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Firm:</strong> ${business_name}</p>
          <p><strong>Service:</strong> ${service_interest}</p>
          <br />
          <p><strong>Message:</strong></p>
          <div style="background: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0;">
            ${message}
          </div>
          <p style="font-size: 10px; color: #94a3b8; margin-top: 30px;">
            Submitted via finesseaccounts.com infrastructure.
          </p>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, id: data?.id }, { status: 200 });

  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error', details: String(error) },
      { status: 500 }
    );
  }
}
