const { Resend } = require("resend");
const dotenv = require("dotenv");
dotenv.config();

// initialize the client with API key from .env
const resend = new Resend(process.env.RESEND_API_KEY);

async function sendHealthReportEmail(report, pdfBase64) {
  try {
    await resend.emails.send({
      from: "medverse@whisperandvault.xyz",
      to: report.email,
      subject: "Your Medverse Health Report",
      html: `<p>Dear Patient,</p>
             <p>Please find attached your Medverse health report summary.</p>
             <p>Stay well,<br/>The Medverse Team</p>`,
      attachments: [
        {
          filename: "Medverse_Report.pdf",
          content: pdfBase64,
        },
      ],
    });

    console.log(`Email sent to ${report.email}`);
  } catch (err) {
    console.error("Failed to send report email:", err);
    throw err;
  }
}

module.exports = { sendHealthReportEmail };
