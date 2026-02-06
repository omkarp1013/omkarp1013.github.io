import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reading · Omkar Pathak",
  description: "Books I'm currently reading and planning to read next.",
};

export default function ReadingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
