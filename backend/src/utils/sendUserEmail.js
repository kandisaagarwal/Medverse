import { Resend } from 'resend';
import dotenv from 'dotenv';
dotenv.config();

// initialize the client with the same API key (from .env now)
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendHealthReportEmail(report, pdfBytes) {
  try {
    // Construct the same kind of message
    const fromEmail = "health-report@whisperandvault.xyz"; // same sender
    const toEmail = report.email;
    const subject = "🩺 Your Medverse Health Report Summary";
    const htmlContent = `
      <html>
        <body>
          <p>Hello,</p>
          <p>Your health report summary is attached below.</p>
          <p>Diagnosis: ${report.diagnosis.join(', ')}</p>
          <p>Recommended Actions:</p>
          <ul>${report.recommendedActions.map(a => `<li>${a}</li>`).join('')}</ul>
          <p>Stay healthy,</p>
          <p><strong>Medverse</strong></p>
        </body>
      </html>
    `;

    // send the email with attachment
    const response = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      subject,
      html: htmlContent,
      attachments: [
        {
          filename: `health_report_${report._id}.pdf`,
          content: pdfBytes.toString("base64"),
        },
      ],
    });

    console.log("Resend response:", response);
    return response;
  } catch (err) {
    console.error("Failed to send email:", err);
    throw err;
  }
}
