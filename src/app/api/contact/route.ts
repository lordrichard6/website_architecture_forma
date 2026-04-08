import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// ── HTML entity escaping — prevents XSS in email body ────
function esc(str: unknown): string {
    if (typeof str !== 'string') return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

// ── Optional field row — omitted when blank ───────────────
function row(label: string, value: unknown): string {
    const v = typeof value === 'string' ? value.trim() : '';
    if (!v) return '';
    return `
        <tr>
            <td style="padding:0.5rem 1rem 0.5rem 0;color:#8A9098;font-size:13px;
                       white-space:nowrap;vertical-align:top;">${esc(label)}</td>
            <td style="padding:0.5rem 0;font-size:14px;">${esc(v)}</td>
        </tr>`;
}

export async function POST(request: NextRequest) {
    const body = await request.json();

    // ── Required fields (shared by both homepage form and contact page) ──
    const name    = typeof body.name    === 'string' ? body.name.trim()    : '';
    const email   = typeof body.email   === 'string' ? body.email.trim()   : '';
    const message = typeof body.message === 'string' ? body.message.trim() : '';

    // ── Optional / contact-page-only fields ──
    const phone       = typeof body.phone       === 'string' ? body.phone.trim()       : '';
    const company     = typeof body.company     === 'string' ? body.company.trim()     : '';
    const projectType = typeof body.projectType === 'string' ? body.projectType.trim() : '';
    const subject     = typeof body.subject     === 'string' ? body.subject.trim()     : ''; // homepage compat
    const location    = typeof body.location    === 'string' ? body.location.trim()    : '';
    const budget      = typeof body.budget      === 'string' ? body.budget.trim()      : '';
    const timeline    = typeof body.timeline    === 'string' ? body.timeline.trim()    : '';

    if (!name || !email || !message) {
        return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
    }

    // ── Email subject line ────────────────────────────────
    const subjectLine = projectType
        ? `[FORMA] ${projectType} — ${name}`
        : subject
        ? `[FORMA] ${subject}`
        : `[FORMA] New enquiry from ${name}`;

    const transporter = nodemailer.createTransport({
        host:   process.env.SMTP_HOST     || 'smtp.gmail.com',
        port:   Number(process.env.SMTP_PORT) || 587,
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    try {
        await transporter.sendMail({
            from:    `"FORMA Contact Form" <${process.env.SMTP_FROM || 'hello@forma-architects.ch'}>`,
            to:      process.env.SMTP_TO   || 'hello@forma-architects.ch',
            replyTo: email,
            subject: subjectLine,
            html: `
                <div style="font-family:Arial,sans-serif;max-width:620px;margin:0 auto;
                            color:#1A2228;line-height:1.6;">

                    <div style="border-bottom:2px solid #6E8C7A;padding-bottom:1rem;
                                margin-bottom:1.5rem;">
                        <h2 style="margin:0;font-size:20px;color:#1A2228;">
                            New Project Enquiry
                        </h2>
                        <p style="margin:0.25rem 0 0;font-size:13px;color:#8A9098;">
                            Received via forma-architects.ch
                        </p>
                    </div>

                    <table style="width:100%;border-collapse:collapse;">
                        ${row('Name',         name)}
                        ${row('Email',        email)}
                        ${row('Phone',        phone)}
                        ${row('Company',      company)}
                        ${row('Project Type', projectType || subject)}
                        ${row('Location',     location)}
                        ${row('Budget',       budget)}
                        ${row('Timeline',     timeline)}
                    </table>

                    <div style="margin-top:1.5rem;padding-top:1.5rem;
                                border-top:1px solid #EDEBE4;">
                        <p style="margin:0 0 0.5rem;font-size:13px;color:#8A9098;
                                  text-transform:uppercase;letter-spacing:1px;">
                            Project Brief
                        </p>
                        <p style="margin:0;font-size:14px;color:#1A2228;
                                  white-space:pre-wrap;">${esc(message)}</p>
                    </div>

                    <div style="margin-top:2rem;padding-top:1rem;
                                border-top:1px solid #EDEBE4;
                                font-size:12px;color:#C2C8CC;">
                        Reply directly to this email to respond to ${esc(name)}.
                    </div>
                </div>
            `,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Contact form email error:', error);
        return NextResponse.json(
            { error: 'Failed to send message. Please try again.' },
            { status: 500 }
        );
    }
}
