import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, business_name, message, service_interest, client_type } = body;

    const data = await resend.emails.send({
      // This sends a professional alert to your new Zoho Mail
      from: 'Finesse Accounts <onboarding@resend.dev>', 
      to: ['info@finesseaccounts.com'],
      subject: `New Lead: ${business_name} - ${service_interest}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #334155;">
          <h2 style="color: #059669;">New Professional Inquiry</h2>
          <p><strong>Managing Partner,</strong> you have a new lead from your website:</p>
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Firm/Business:</strong> ${business_name}</p>
          <p><strong>Client Type:</strong> ${client_type}</p>
          <p><strong>Service Wanted:</strong> ${service_interest}</p>
          <br />
          <p><strong>Message:</strong></p>
          <div style="background: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0;">
            ${message}
          </div>
          <p style="font-size: 10px; color: #94a3b8; margin-top: 30px;">
            This lead was automatically captured and migrated from Finesse Accounts Infrastructure.
          </p>
        </div>
      `,
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Migration failed' }, { status: 500 });
  }
}
