import HomePage from "@/components/home/HomePage";
import { Toaster } from "react-hot-toast";
 

export default function Home() {
  return (
    <div className="container mx-auto px-4 mt-6">
      <Toaster/>
      <HomePage />
    </div>
  );
}
