import { Resend } from 'resend';
import { NextResponse } from 'next/server';

// This tells Next.js NOT to treat this as a pre-built page
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs'; 

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, business_name, message } = body;

    const { data, error } = await resend.emails.send({
      from: 'Finesse Accounts <info@finesseaccounts.com>',
      to: ['info@finesseaccounts.com'],
      subject: `New Lead: ${business_name || name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`, // Using plain text for safety
      html: `<strong>Name:</strong> ${name}<br><strong>Message:</strong> ${message}`,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
