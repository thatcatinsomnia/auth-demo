import Link from "next/link";

export default function Home() {
  return (
    <div className="pt-40 text-white grid place-items-center gap-6">
      <h1 className="text-4xl text-center">WEB</h1>
      <Link className="text-lg text-center text-blue-600 underline" href="/me">Me</Link>
    </div>
  );
}
