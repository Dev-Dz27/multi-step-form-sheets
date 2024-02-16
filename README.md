import { google } from "googleapis";

type SheetForm = {
  DateNow: string;
  name: string;
  email: string;
  phone: number;
  age: number;
  carType: string;
  pickupDate: string;
  pickupLocation: string;
  dropOffDate: string;
  dropOffLocation: string;
  note: string;
  babySeatChecked: boolean;
  message: string;
};

export async function POST(
  req: Request,
  res: Response
) {
  if (req.method !== "POST") {
    return new Response (  "Only Post requests are allowed" );
  }

  const message = 'testing !!' 
  const body = await req.json() as SheetForm ;
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
      
      range: `'orders'!A1:M1`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            // "test"
            body.message,
            message,
            // body.email,
           
          ],
        ],
      },
    });

    //   data: response.data,

    return new Response (  "success", {status:(200)} );

  } catch (e) {
    console.error(e);
    return new Response (  "Something went wrong", {status:(500)} );

  }
}
