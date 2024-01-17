import Link from "next/link";
import { DataFetch } from "./components/data-fetch";

const HomeTitle = ({ className = "", children }) => {
  return (
    <div className={className}>
      <div className="max-w-screen-xl mx-auto px-4 md:px-8 text-lg text-center py-16">{children}</div>
    </div>
  );
};

export default function Home() {
  return (
    <>
      <HomeTitle className="font-bold">
        <h1>Bienvenidos a Simbiosis Geo</h1>
      </HomeTitle>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <p>Semillas de colección</p>
        <DataFetch />
      </main>
    </>
  );
}
