import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const {
        inquiryType,
        name,
        email,
        phone,
        company,
        message,
        website,
        productCategory,
        productUnit,
        currentSetup,
        decisionMaker,
        machineAge,
        remainingMonths,
        monthlyRentalFee,
        finalPayment,
        monoVolume,
        colorVolume,
        costPerPrintMono,
        costPerPrintColor,
        quotationType,
        residencyType, // ← new
        billFileName, // ← new
        billFileType, // ← new
        billFileData, // ← new
    } = req.body;

    if (website) {
        return res.status(200).json({ ok: true });
    }

    if (!name || !email) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const isProductInquiry = inquiryType === "product";
    const subject = isProductInquiry
        ? `Product Inquiry — ${productCategory ?? "Unspecified"} — ${name}`
        : `New Website Inquiry — ${name}`;

    const copierSection =
        productCategory === "Copier Solutions"
            ? `
            <hr/>
            <h3>Current Setup</h3>
            ${decisionMaker ? `<p><strong>Decision maker:</strong> ${decisionMaker}</p>` : ""}
            <p><strong>Lease / Owned / Neither:</strong> ${currentSetup ?? "Not specified"}</p>
            ${machineAge ? `<p><strong>Machine age:</strong> ${machineAge}</p>` : ""}
            ${remainingMonths ? `<p><strong>Remaining months on contract:</strong> ${remainingMonths}</p>` : ""}
            ${monthlyRentalFee ? `<p><strong>Current monthly rental fee:</strong> ${monthlyRentalFee}</p>` : ""}
            ${finalPayment ? `<p><strong>Final payment:</strong> ${finalPayment}</p>` : ""}
            ${monoVolume ? `<p><strong>Avg. monthly prints — mono:</strong> ${monoVolume}</p>` : ""}
            ${colorVolume ? `<p><strong>Avg. monthly prints — colour:</strong> ${colorVolume}</p>` : ""}
            ${costPerPrintMono ? `<p><strong>Cost per print — B&W:</strong> ${costPerPrintMono}</p>` : ""}
            ${costPerPrintColor ? `<p><strong>Cost per print — Colored:</strong> ${costPerPrintColor}</p>` : ""}
            ${quotationType ? `<p><strong>Preferred quotation type:</strong> ${quotationType}</p>` : ""}
        `
            : "";

    const energySection =
        productCategory === "Energy Solutions"
            ? `
            <hr/>
            <h3>Energy Inquiry Details</h3>
            ${residencyType ? `<p><strong>Customer type:</strong> ${residencyType}</p>` : ""}
            ${billFileName ? `<p><strong>Bill attached:</strong> ${billFileName}</p>` : "<p><strong>Bill attached:</strong> None</p>"}
        `
            : "";

    try {
        const { data, error } = await resend.emails.send({
            from: "Veritas Organisation <noreply@veritasorganisation.com>",
            to: "adrianetuazon18@gmail.com",
            replyTo: email,
            subject,
            attachments: billFileData
                ? [
                      {
                          filename: billFileName || "electricity-bill",
                          content: billFileData,
                          contentType: billFileType || "application/pdf",
                      },
                  ]
                : undefined,
            html: `
                <h2>${isProductInquiry ? "New Product Inquiry" : "New Website Inquiry"}</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
                ${company ? `<p><strong>Company:</strong> ${company}</p>` : ""}
                ${productCategory ? `<p><strong>Product:</strong> ${productCategory}</p>` : ""}
                ${productUnit ? `<p><strong>Unit:</strong> ${productUnit}</p>` : ""}
                ${copierSection}
                ${energySection}
                ${message ? `<hr/><p><strong>Message:</strong></p><p>${String(message).replace(/\n/g, "<br/>")}</p>` : ""}
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
