const express = require("express");
const axios = require("axios");
const moment = require("moment");
const app = express();

app.use(express.json());

const consumerKey = "GnjwVe0wXSYt0EmFtAKivysviPmj3LjmyGGgErc9pXH1cDix";
const consumerSecret = "3AgECykwiiHVyq9gGkBwMq5RqQx2HZX8AMxQQXBiBdQcG7imoN0Dd7HttCpxYvOC";

const shortCode = "174379";  
const passkey = "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919";
const callbackURL = "https://5ba77ad8063b.ngrok-free.app/callback";

async function getAccessToken() {
  const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");
  const response = await axios.get(
    "https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
    { headers: { Authorization: `Basic ${auth}` } }
  );
  return response.data.access_token;
}

app.post("/stkpush", async (req, res) => {
  try {
    const { phone, amount } = req.body; 
    const token = await getAccessToken();

    const timestamp = moment().format("YYYYMMDDHHmmss");
    const password = Buffer.from(shortCode + passkey + timestamp).toString("base64");

    const stkRequest = {
      BusinessShortCode: shortCode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: amount,
      PartyA: phone,
      PartyB: shortCode,
      PhoneNumber: phone,
      CallBackURL: callbackURL,
      AccountReference: "Order123",
      TransactionDesc: "Payment for goods"
    };

    const response = await axios.post(
      "https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      stkRequest,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    res.json(response.data);
  } catch (error) {
    console.error("STK Push Error:", error.response?.data || error.message);
    res.status(500).json({ error: error.response?.data || error.message });
  }
});

app.post("/callback", (req, res) => {
  console.log("M-Pesa Callback:", req.body);
  res.sendStatus(200);
});

app.listen(3000, () => console.log("Server running on port 3000"));

