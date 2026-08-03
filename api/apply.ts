import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const {
        role,
        name,
        email,
        phone,
        videoLink,
        pitch,
        resumeName,
        resumeType,
        resumeData, // base64, no data-URL prefix
        website, // honeypot
    } = req.body;

    if (website) {
        return res.status(200).json({ ok: true });
    }

    if (!name || !email || !phone || !videoLink || !resumeData) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        const { data, error } = await resend.emails.send({
            from: "Veritas Careers <noreply@veritasorganisation.com>",
            to: "adrianetuazon18@gmail.com",
            replyTo: email,
            subject: `Job Application — ${role ?? "General"} — ${name}`,
            attachments: resumeData
                ? [
                      {
                          filename: resumeName || "resume.pdf",
                          content: resumeData,
                          contentType: resumeType || "application/pdf",
                      },
                  ]
                : undefined,
            html: `
                <h2>New Job Application</h2>
                <p><strong>Role:</strong> ${role ?? "Not specified"}</p>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Video introduction:</strong> <a href="${videoLink}">${videoLink}</a></p>
                ${pitch ? `<p><strong>Why them:</strong></p><p>${String(pitch).replace(/\n/g, "<br/>")}</p>` : ""}
                <hr/>
                <p style="color:#64748b;font-size:12px;">Resume attached: ${resumeName || "resume"}</p>
            `,
        });

        if (error) {
            console.error("Resend rejected the send:", error);
            return res.status(500).json({ error: error.message });
        }

        console.log("Application sent:", data?.id);
        return res.status(200).json({ ok: true });
    } catch (err) {
        console.error("Unexpected error:", err);
        return res.status(500).json({ error: "Failed to send application" });
    }
}
