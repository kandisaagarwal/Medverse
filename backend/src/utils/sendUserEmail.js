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


async function sendHealthReportEmailSupervisor(report, pdfBytes, approveLink, rejectLink) {
  try {
    await resend.emails.send({
      from: "medvers@whisperandvault.xyz",
      to: report.supervisorEmail, // send to supervisor
      subject: "Medverse Report Approval Needed",
      html: `<p>Dear Supervisor,</p>
             <p>Please review the attached prescription and take action:</p>
             <p>
               <a href="${approveLink}">Approve</a> | 
               <a href="${rejectLink}">Reject</a>
             </p>`,
      attachments: [
        { filename: "Medverse_Report.pdf", content: pdfBytes }
      ]
    });
    console.log(`Email sent to ${report.supervisorEmail}`);
  } catch (err) {
    console.error("Failed to send email:", err);
    throw err;
  }
}

module.exports = { sendHealthReportEmail, sendHealthReportEmailSupervisor };
