"use client";

import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useRouter, usePathname } from "next/navigation";
import { form } from "@/common.types";
import { updateBook } from "@/lib/actions/books";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "@/lib/validators/Edit";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";

const EditForm = ({ data }: { data: form[] }) => {
  const router = useRouter();
  const path = usePathname();
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      book_name: data[0]?.book_name,
      available: data[0]?.available,
      image: data[0]?.image,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      await updateBook({
        ...values,
        available: values.available,
        bookid: data[0]?.bookid,
        path,
      });
      router.push("/seller");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        className="grid w-full items-center gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="book_name"
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-3 gap-3">
              <FormLabel className="text-base-semibold text-lg text-light-2">
                Name
              </FormLabel>
              <FormControl>
                <Input type="text" className="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="available"
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-3 gap-3">
              <FormLabel className="text-base-semibold text-lg text-light-2">
                Available count of the Book
              </FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-3 gap-3">
              <FormLabel className="text-base-semibold text-lg text-light-2">
                Image URL
              </FormLabel>
              <FormControl>
                <Input type="text" className="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={loading} type="submit">
          {loading ? (
            <Loader2 color="#fff" className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            "Save"
          )}
        </Button>
        <Button
          variant="outline"
          type="button"
          onClick={() => router.push("/seller")}
        >
          Cancal
        </Button>
      </form>
    </Form>
  );
};

export default EditForm;
