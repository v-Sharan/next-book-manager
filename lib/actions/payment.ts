"use server";

import crypto from "node:crypto";

import { PaymentConnect } from "../paymentConnect";
import { VerifyPayment } from "@/common.types";

export const IntitateOrder = async ({ amaount }: { amaount: number }) => {
  const data = await PaymentConnect.orders.create({
    amount: amaount * 100,
    currency: "INR",
  });
  return data;
};

export const verifyPayment = async ({
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature,
}: VerifyPayment) => {
  const sign = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSign = crypto
    .createHmac("sha256", process.env.KEY_SECRET!)
    .update(sign.toString())
    .digest("hex");

  if (razorpay_signature != expectedSign) return false;
  return true;
};
