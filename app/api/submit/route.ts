import { FormItems } from "@/app/types/types";
import { google } from "googleapis";
import moment from "moment";

export async function POST(req: Request, res: Response) {
  if (req.method !== "POST") {
    return new Response("Only Post requests are allowed");
  }
  const createdAt = moment().format("DD/MM/YYYY HH:mm");

  const body = (await req.json()) as FormItems;
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: [
        "https://www.googleapis.com/auth/drive",
        "https://www.googleapis.com/auth/drive.file",
        "https://www.googleapis.com/auth/spreadsheets",
      ],
    });

    const sheets = google.sheets({
      auth,
      version: "v4",
    });

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,

      range: `!A2:M2`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            // "test"
            body.name,
            body.email,
            body.phone,
            body.plan,
            body.yearly,
            body.addOns,
            createdAt, // message,
            // body.email,
          ],
        ],
      },
    });

    //   data: response.data,

    return new Response("success", { status: 200 });
  } catch (e) {
    console.error(e);
    return new Response("Something went wrong", { status: 500 });
  }
}
