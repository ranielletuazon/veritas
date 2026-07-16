import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

// const resend = new Resend(process.env.RESEND_API_KEY);
const resend = new Resend("re_SnnLB3NE_3ngvanaE6kS89Laj68qQpkTq");

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { inquiry, name, email, phone, company, message, website } = req.body;

    /* Honeypot — if this hidden field is filled, it's a bot. Silently accept, do nothing. */
    if (website) {
        return res.status(200).json({ ok: true });
    }

    /* Minimal server-side validation — never trust the client alone */
    if (!name || !email || !message) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        await resend.emails.send({
            from: "Veritas Website <noreply@veritasorganisation.com>",
            to: "adrianetuazon18@gmail.com",
            replyTo: email,
            subject: `New ${inquiry === "business" ? "Business" : "Recruitment"} Inquiry — ${name}`,
            html: `
                <h2>New ${inquiry === "business" ? "Business" : "Recruitment"} Inquiry</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
                ${company ? `<p><strong>Company:</strong> ${company}</p>` : ""}
                <p><strong>Message:</strong></p>
                <p>${String(message).replace(/\n/g, "<br/>")}</p>
            `,
        });

        return res.status(200).json({ ok: true });
    } catch (err) {
        console.error("Resend error:", err);
        return res.status(500).json({ error: "Failed to send message" });
    }
}
