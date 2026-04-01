import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    console.log('RESEND_API_KEY exists:', !!process.env.RESEND_API_KEY);

    const body = await req.json();
    console.log('Received form data:', body);

    const { name, email, phone, business_name,
            message, service_interest, client_type } = body;

    const { data, error } = await resend.emails.send({
      from: 'Finesse Accounts <info@finesseaccounts.com>',
      to: ['info@finesseaccounts.com'],
      subject: `New Lead: ${business_name} - ${service_interest}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #334155;">
          <h2 style="color: #059669;">New Professional Inquiry</h2>
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
            Submitted via finesseaccounts.com
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    console.log('Email sent successfully! ID:', data?.id);
    return NextResponse.json(
      { success: true, id: data?.id },
      { status: 200 }
    );

  } catch (error) {
    console.error('Route error:', String(error));
    return NextResponse.json(
      { error: 'Internal server error', details: String(error) },
      { status: 500 }
    );
  }
}
