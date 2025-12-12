import { NextResponse } from "next/server";
import { calculateTotalPrice } from "@/config/estimator-config";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message, estimate } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const total = estimate ? calculateTotalPrice(estimate) : null;

    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Monolabs <noreply@support.monolabs.site>",
        to: ["theoslater1@gmail.com"],
        reply_to: email,
        subject: `New Quote Request – ${name}`,
        html: `
<!DOCTYPE html>
<html>
  <body style="
    margin:0;
    padding:0;
    background-color:#000000;
    font-family:Roboto, Arial, sans-serif;
    color:#ededed;
  ">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#000000;">
      <tr>
        <td align="center" style="padding:56px 16px;">
          <table width="100%" cellpadding="0" cellspacing="0" style="
            max-width:560px;
            background-color:#0a0a0a;
            border:1px solid rgba(255,255,255,0.08);
            border-radius:18px;
          ">

            <!-- Header -->
            <tr>
              <td style="padding:36px;">
                <div style="
                  font-size:11px;
                  letter-spacing:0.18em;
                  color:#9a9a9a;
                  margin-bottom:14px;
                ">
                  MONOLABS
                </div>

                <div style="
                  font-size:26px;
                  font-weight:100;
                  line-height:1.25;
                  color:#ffffff;
                ">
                  New Quote Request
                </div>
              </td>
            </tr>

            <!-- Divider -->
            <tr>
              <td style="padding:0 36px;">
                <div style="height:1px;background-color:rgba(255,255,255,0.06);"></div>
              </td>
            </tr>

            <!-- Details -->
            <tr>
              <td style="padding:28px 36px;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="font-size:12px;color:#9a9a9a;padding:8px 0;width:110px;">
                      Name
                    </td>
                    <td style="font-size:14px;color:#ededed;padding:8px 0;">
                      ${name}
                    </td>
                  </tr>
                  <tr>
                    <td style="font-size:12px;color:#9a9a9a;padding:8px 0;">
                      Email
                    </td>
                    <td style="font-size:14px;color:#ededed;padding:8px 0;">
                      ${email}
                    </td>
                  </tr>
                  ${
                    message
                      ? `
                  <tr>
                    <td style="font-size:12px;color:#9a9a9a;padding:8px 0;vertical-align:top;">
                      Message
                    </td>
                    <td style="font-size:14px;color:#ededed;padding:8px 0;line-height:1.6;">
                      ${message.replace(/\n/g, "<br />")}
                    </td>
                  </tr>
                  `
                      : ""
                  }
                </table>
              </td>
            </tr>

            ${
              total !== null
                ? `
            <!-- Price -->
            <tr>
              <td style="padding:0 36px 32px 36px;">
                <div style="
                  background-color:#000000;
                  border:1px solid rgba(255,255,255,0.1);
                  border-radius:14px;
                  padding:24px;
                ">
                  <div style="
                    font-size:11px;
                    letter-spacing:0.18em;
                    color:#9a9a9a;
                    margin-bottom:12px;
                  ">
                    ESTIMATED TOTAL
                  </div>

                  <div style="
                    font-size:32px;
                    font-weight:100;
                    color:#ffffff;
                  ">
                    £${total.toLocaleString()}
                  </div>
                </div>
              </td>
            </tr>
            `
                : ""
            }

            ${
              estimate
                ? `
            <!-- Config -->
            <tr>
              <td style="padding:0 36px 32px 36px;">
                <div style="
                  background-color:#000000;
                  border:1px solid rgba(255,255,255,0.06);
                  border-radius:14px;
                  padding:20px;
                ">
                  <div style="
                    font-size:11px;
                    letter-spacing:0.18em;
                    color:#9a9a9a;
                    margin-bottom:12px;
                  ">
                    CONFIGURATION
                  </div>

                  <pre style="
                    margin:0;
                    font-size:12px;
                    line-height:1.6;
                    color:#ededed;
                    white-space:pre-wrap;
                    font-family:Menlo, Consolas, monospace;
                  ">${JSON.stringify(estimate, null, 2)}</pre>
                </div>
              </td>
            </tr>
            `
                : ""
            }

            <!-- Footer -->
            <tr>
              <td style="padding:28px 36px 36px 36px;">
                <div style="
                  font-size:12px;
                  line-height:1.6;
                  color:#666666;
                ">
                  Replying to this email will contact the requester directly.<br />
                  Monolabs · support.monolabs.site
                </div>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
        `,
      }),
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Something broke. Shock." },
      { status: 500 },
    );
  }
}
