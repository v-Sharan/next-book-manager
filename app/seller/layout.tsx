import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Seller page",
  description: "Sell your Book",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
}
