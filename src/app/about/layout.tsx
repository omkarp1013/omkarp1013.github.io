import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About · Omkar Pathak",
  description: "About Omkar Pathak - trader, technologist, and builder.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
