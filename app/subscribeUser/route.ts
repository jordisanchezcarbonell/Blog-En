import type { NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: NextApiResponse) {
  const body = await req.json();
  console.log("email", body);
  const email = body.email;
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  const MailchimpKey = process.env.MAILCHIMP_API_KEY;
  const MailchimpServer = process.env.MAILCHIMP_API_SERVER;
  const MailchimpAudience = process.env.MAILCHIMP_AUDIENCE_ID;

  console.log("MailchimpKey", MailchimpKey);
  console.log("MailchimpServer", MailchimpServer);
  console.log("MailchimpAudience", MailchimpAudience);
  const customUrl = `https://${MailchimpServer}.api.mailchimp.com/3.0/lists/${MailchimpAudience}/members?skip_merge_validation=false`;

  const response = await fetch(customUrl, {
    method: "POST",
    headers: {
      Authorization: `apikey ${MailchimpKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email_address: email,
      status: "subscribed",
    }),
  });
  const received = await response.json();

  return NextResponse.json(received);
}
