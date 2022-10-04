import { useRouter } from "next/router";

export interface IPortfolioProjectPageProps {
  projectId: string;
}

export default function PortfolioProjectPage() {
  const router = useRouter();
  console.log(router.pathname, router.query);
  return (
    <div>
      <h1>The roject id Page</h1>
    </div>
  );
}
