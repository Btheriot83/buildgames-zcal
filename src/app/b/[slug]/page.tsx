import { BookingPage } from "@/components/BookingPage";

export default async function PublicBookPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <BookingPage slug={slug} />;
}
