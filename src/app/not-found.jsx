"use client";

import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";


export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      {/* 404 Heading with subtle opacity */}
      <h1 className="text-9xl font-extrabold text-[#05696E]/20 mb-4">404</h1>
      
      {/* Error Message */}
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Page Not Found</h2>
      <p className="text-gray-500 mb-8 max-w-md">
        Sorry, the page you are looking for does not exist. Please return to the home page to continue.
      </p>
      
      {/* Back to Home Button with consistent styling */}
      <Button 
        onPress={() => router.push("/")}
        className="bg-[#00A896] hover:bg-[#028090] text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 shadow-md"
      >
        Back to Home
      </Button>
    </div>
  );
}