import Link from "next/link";

import { Layout } from "@/components/Layout";

export default function Home() {
  return (
    <Layout>
      <ul className="p-10">
        <li>
          <Link href="/tutorial-1" className="text-blue-600 hover:underline">
            チュートリアル①
          </Link>
        </li>
      </ul>
    </Layout>
  );
}
