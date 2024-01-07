"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { book, AllState, VerifyPayment } from "@/common.types";
import { Button } from "./ui/button";
import { ToastAction } from "./ui/toast";
import { useToast } from "./ui/use-toast";

import { BuyBooks } from "@/lib/actions/books";
import { IntitateOrder, verifyPayment } from "@/lib/actions/payment";

const CustomCard = ({ book_name, image, available, bookid }: book) => {
  const [open, setOpen] = useState<boolean>(false);
  const { toast } = useToast();
  const path = usePathname();
  const [allState, setAllState] = useState<AllState>({
    quantity: 1,
    isLoading: false,
    price: 10,
  });

  const handleIncrement = () => {
    if (allState.quantity != available) {
      setAllState((prev) => {
        return {
          ...prev,
          quantity: prev.quantity + 1,
          price: prev.price + 10,
        };
      });
      return;
    }

    toast({
      title: "Number of books limit reached",
      action: (
        <ToastAction altText="Goto schedule to undo">Dismiss</ToastAction>
      ),
    });
  };

  const handleDecrement = () => {
    if (allState.quantity != 1) {
      setAllState((prev) => {
        return {
          ...prev,
          quantity: prev.quantity - 1,
          price: prev.price - 10,
        };
      });
      return;
    }
    toast({
      title: "Number of books atleast one",
      description: "You can't buy less than one book",
      action: (
        <ToastAction altText="Goto schedule to undo">Dismiss</ToastAction>
      ),
    });
  };

  const handleCallBack = async ({
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  }: VerifyPayment) => {
    const verify = await verifyPayment({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });
    if (!verify) {
      toast({
        title: "Failed to buy because of Transaction failed",
        description: "Contact cutomer service",
        action: (
          <ToastAction altText="Goto schedule to undo">Dismiss</ToastAction>
        ),
      });
      return;
    }
    setOpen(true);
    await BuyBooks({ bookid, quantity: allState.quantity, path });
    toast({
      title: "Purchase successfully",
      description: `Thank you for buying ${book_name.slice(0, 10) + "..."}`,
      action: (
        <ToastAction altText="Goto schedule to undo">Dismiss</ToastAction>
      ),
    });
    setOpen(false);
    setAllState((prev) => {
      return { ...prev, isLoading: false };
    });
  };

  const handleConfirm = async () => {
    setAllState((prev) => {
      return { ...prev, isLoading: true };
    });
    const { id } = await IntitateOrder({ amaount: allState.price });
    var options = {
      key: process.env.NEXT_PUBLIC_KEY_ID, // Enter the Key ID generated from the Dashboard
      amount: allState.price, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Book Application", //your business name
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: (response: VerifyPayment) => handleCallBack(response),
      prefill: {
        name: "Sharan V",
        email: "sampleGmail.com",
        contact: "9999999999", //Provide the customer's phone number for better conversion rates
      },
      theme: {
        color: "#000",
      },
    };
    //@ts-ignore
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  return (
    <Card className="max-h-[40rem] max-sm:max-w-sm max-w-lg">
      <CardHeader>
        <CardTitle>{book_name.slice(0, 30) + "..."}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5 justify-center items-center">
        <Image
          src={image}
          width={200}
          height={100}
          alt="image"
          className="rounded"
        />
        <p
          className={`${
            available === 0 ? "bg-red-600" : "bg-green-700"
          } self-end text-white text-sm my-4 font-bold px-1.5 py-1 rounded-lg`}
        >
          Available {available}
        </p>
        <div className="flex flex-row gap-5 items-center">
          <Button onClick={handleDecrement}>-</Button>
          {allState.quantity}
          <Button onClick={handleIncrement}>+</Button>
        </div>
        <div>Price {allState.price}</div>
      </CardContent>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <CardFooter className="flex justify-center items-center">
          <AlertDialogTrigger asChild>
            <Button className="w-full">Buy Now</Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="sm:max-w-[425px] max-sm:w-[400px]">
            <AlertDialogHeader>
              <AlertDialogTitle className="font-bold text-3xl">
                Your order summary
              </AlertDialogTitle>
              <AlertDialogDescription className="text-lg">
                <span className="text-black dark:text-gray-100 font-bold">
                  Book name:{" "}
                </span>
                {book_name}
              </AlertDialogDescription>
              <AlertDialogDescription className="text-lg">
                <span className="text-black dark:text-gray-100 font-bold">
                  No of books:{" "}
                </span>
                {allState.quantity}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="w-full">Cancle</AlertDialogCancel>
              <Button
                onClick={handleConfirm}
                disabled={allState.isLoading}
                className="w-full"
              >
                {allState.isLoading ? (
                  <Loader2 color="#fff" className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  "Confirm"
                )}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </CardFooter>
      </AlertDialog>
    </Card>
  );
};

export default CustomCard;
