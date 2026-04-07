import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
        return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: Number(process.env.SMTP_PORT) || 587,
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    try {
        await transporter.sendMail({
            from: `"FORMA Contact Form" <${process.env.SMTP_FROM || 'hello@forma-architects.ch'}>`,
            to: process.env.SMTP_TO || 'hello@forma-architects.ch',
            replyTo: email,
            subject: `[FORMA] ${subject}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #0A0A0A; border-bottom: 2px solid #C9A227; padding-bottom: 1rem;">
                        New Contact Form Submission
                    </h2>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 0.5rem 0; color: #8A8A8A; width: 100px;">Name</td>
                            <td style="padding: 0.5rem 0; font-weight: bold;">${name}</td>
                        </tr>
                        <tr>
                            <td style="padding: 0.5rem 0; color: #8A8A8A;">Email</td>
                            <td style="padding: 0.5rem 0;"><a href="mailto:${email}">${email}</a></td>
                        </tr>
                        <tr>
                            <td style="padding: 0.5rem 0; color: #8A8A8A;">Subject</td>
                            <td style="padding: 0.5rem 0;">${subject}</td>
                        </tr>
                    </table>
                    <h3 style="color: #0A0A0A; margin-top: 1.5rem;">Message</h3>
                    <p style="color: #4A4A4A; line-height: 1.6;">${message.replace(/\n/g, '<br>')}</p>
                </div>
            `,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Contact form email error:', error);
        return NextResponse.json({ error: 'Failed to send message. Please try again.' }, { status: 500 });
    }
}
