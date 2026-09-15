import { redirect } from "next/navigation";
import { BookingPage } from "@/components/BookingPage";
import { DEMO_HOST } from "@/lib/seed";

export default async function PublicBookPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  // Retire Brandon smoke URLs without breaking old links
  if (slug === "brandon" || slug === "sample") {
    redirect(`/b/${DEMO_HOST.slug}`);
  }
  return <BookingPage slug={slug} />;
}
