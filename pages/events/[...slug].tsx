import { useRouter } from "next/router";

export default function FilteredEventsPage() {
  const router = useRouter();
  const slug = router.query.slug;
  console.log(slug);

  return (
    <div>
      <h1>Filtered Events Page</h1>
    </div>
  );
}
