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

import { book } from "@/common.types";
import { Button } from "./ui/button";
import { ToastAction } from "./ui/toast";
import { useToast } from "./ui/use-toast";

import { BuyBooks } from "@/lib/actions/books";

const CustomCard = ({ book_name, image, available, bookid }: book) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [open, setOpen] = useState<boolean>(false);
  const [buy, setBuy] = useState<boolean>(false);
  const { toast } = useToast();
  const path = usePathname();

  const handleIncrement = () => {
    if (quantity === available) {
      toast({
        title: "Number of books limit reached",
        action: (
          <ToastAction altText="Goto schedule to undo">Dismiss</ToastAction>
        ),
      });
      return;
    }
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity === 1) {
      toast({
        title: "Number of books atleast one",
        description: "You can't buy less than one book",
        action: (
          <ToastAction altText="Goto schedule to undo">Dismiss</ToastAction>
        ),
      });
      return;
    }
    setQuantity((prev) => prev - 1);
  };

  const handleConfirm = async () => {
    setBuy(true);
    await BuyBooks({ bookid, quantity, path });
    setOpen(false);
    toast({
      title: "Purchase successfully",
      description: `Thank you for buying ${book_name.slice(0, 10) + "..."}`,
      action: (
        <ToastAction altText="Goto schedule to undo">Dismiss</ToastAction>
      ),
    });
    setBuy(false);
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
          {quantity}
          <Button onClick={handleIncrement}>+</Button>
        </div>
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
                {quantity}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="w-full">Cancle</AlertDialogCancel>
              <Button onClick={handleConfirm} disabled={buy} className="w-full">
                {buy ? (
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
