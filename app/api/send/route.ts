import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// This line is the "Magic Fix" for the Webpack/Server error you saw
export const dynamic = 'force-dynamic';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    // 1. Check if the API key is actually loading in Vercel
    if (!process.env.RESEND_API_KEY) {
      console.error('CRITICAL: RESEND_API_KEY is missing in Vercel Settings');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const body = await req.json();
    const { name, email, phone, business_name, message, service_interest, client_type } = body;

    console.log('API Processing lead for:', email);

    // 2. Dispatch the email via Resend
    const { data, error } = await resend.emails.send({
      from: 'Finesse Accounts <info@finesseaccounts.com>',
      to: ['info@finesseaccounts.com'],
      // We use || to ensure the subject line is never empty, which prevents crashes
      subject: `New Lead: ${business_name || 'Inquiry'} - ${service_interest || 'Bookkeeping'}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #334155;">
          <h2 style="color: #059669;">New Professional Inquiry</h2>
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          <p><strong>Name:</strong> ${name || 'Not provided'}</p>
          <p><strong>Email:</strong> ${email || 'Not provided'}</p>
          <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          <p><strong>Firm/Business:</strong> ${business_name || 'Not provided'}</p>
          <p><strong>Client Type:</strong> ${client_type || 'Not provided'}</p>
          <p><strong>Service Wanted:</strong> ${service_interest || 'Not provided'}</p>
          <br />
          <p><strong>Message:</strong></p>
          <div style="background: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0;">
            ${message || 'No message content.'}
          </div>
          <p style="font-size: 10px; color: #94a3b8; margin-top: 30px;">
            Submitted via finesseaccounts.com infrastructure.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend API Error:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, id: data?.id }, { status: 200 });

  } catch (error) {
    console.error('Final Route Catch:', String(error));
    return NextResponse.json(
      { error: 'Internal server error', details: String(error) },
      { status: 500 }
    );
  }
}
