import { useRouter } from "next/router";

export default function ClientProjectsPage() {
  const router = useRouter();
  const loadProjectHandler = () => {
    router.push("/clients/max/projectA");
  };
  console.log(router.query);
  return (
    <div>
      <h1>The Projects of Given client</h1>
      <button onClick={loadProjectHandler}>Load Project A</button>
    </div>
  );
}
