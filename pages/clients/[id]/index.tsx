import { useRouter } from "next/router";

export default function ClientProjectsPage() {
  const router = useRouter();
  console.log(router.query);
  return (
    <div>
      <h1>The Projects of Given client</h1>
    </div>
  );
}
