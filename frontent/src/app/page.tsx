
import Product from "@/components/Product";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Home',
  description: '',
}

export default function Home() {
  return (
    <div className="flex justify-center w-full min-h-screen items-center">
      <Product />
    </div>
  );
}
