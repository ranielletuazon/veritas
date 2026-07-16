import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

// const resend = new Resend(process.env.RESEND_API_KEY);
const resend = new Resend("re_SnnLB3NE_3ngvanaE6kS89Laj68qQpkTq");

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { inquiry, name, email, phone, company, message, website } = req.body;

    if (website) {
        return res.status(200).json({ ok: true });
    }

    if (!name || !email || !message) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        const { data, error } = await resend.emails.send({
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

        if (error) {
            console.error("Resend rejected the send:", error);
            return res.status(500).json({ error: error.message });
        }

        console.log("Email sent:", data?.id);
        return res.status(200).json({ ok: true });
    } catch (err) {
        console.error("Unexpected error:", err);
        return res.status(500).json({ error: "Failed to send message" });
    }
}
