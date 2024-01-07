import Razorpay from "razorpay";

export const PaymentConnect = new Razorpay({
  key_id: process.env.KEY_ID!,
  key_secret: process.env.KEY_SECRET!,
});
