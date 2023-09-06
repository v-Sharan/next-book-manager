import React from "react";
import { Loader2 } from "lucide-react";

const Loader = () => (
  <div role="status" className="min-h-screen flex justify-center items-center">
    <Loader2 className="text-black dark:text-white w-40 h-40 animate-spin" />
  </div>
);

export default Loader;
