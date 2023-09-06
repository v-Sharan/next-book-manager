import React from "react";
import { getBookById } from "@/lib/actions/books";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Form from "@/components/Form";

const page = async ({ params: { id } }: { params: { id: number } }) => {
  const data = await getBookById({ bookid: id });

  return (
    <div className="py-10">
      <div className="flex flex-wrap justify-center items-center gap-10 my-5">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle className="my-4">Edit Book</CardTitle>
          </CardHeader>
          <CardContent>
            <Form data={data} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default page;
