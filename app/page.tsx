import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Link href="/new" className="p-4 rounded-lg bg-neutral-900 text-white">Add New Question</Link>
    </div>
  );
}
