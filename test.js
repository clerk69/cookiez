const axios = require("axios");

async function sendSTKPush() {
  try {
    const response = await axios.post(
      "https://5ba77ad8063b.ngrok-free.app/stkpush", // your ngrok forwarding URL
      {
        BusinessShortCode: "174379",
        TransactionType: "CustomerPayBillOnline",
        Amount: "1",
        PartyA: "254708374149", // replace with your phone number in international format
        PartyB: "174379",
        PhoneNumber: "254708374149", // same number as above
        CallBackURL: "https://5ba77ad8063b.ngrok-free.app/callback",
        AccountReference: "Test",
        TransactionDesc: "Test Payment"
      }
    );

    console.log("✅ Success:", response.data);
  } catch (error) {
    console.error("❌ Error:", error.response?.data || error.message);
  }
}

sendSTKPush();
