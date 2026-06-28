"use client";

import { authClient } from "@/lib/auth-client";
import {
  Button,
  FieldError,
  Fieldset,
  Form,
  Input,
  Label,
  Surface,
  TextField,
} from "@heroui/react";
import { Mail, Lock } from "lucide-react"; 
import React from "react";
import Link from "next/link"; // 💡 Navigation-এর জন্য Link ইমপোর্ট করা হলো

export default function SignInPage() {
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    await authClient.signIn.email({
      email: user.email,
      password: user.password,
      callbackURL: "/",
    });
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12">
        
        <div className="text-center mb-8">
          {/* Confirmed blood-red color using inline styles */}
          <h1 
            className="text-3xl md:text-4xl font-bold mb-2" 
            style={{ color: "#b91c1c" }}
          >
            Welcome Back to Community
          </h1>
          <p className="text-gray-500 text-sm md:text-base">
            Sign in to your account to continue saving lives
          </p>
        </div>

        <Surface className="w-full bg-transparent">
          <Form onSubmit={onSubmit} className="space-y-6">
            <Fieldset className="w-full space-y-5">
              
              {/* Email Field */}
              <TextField isRequired name="email" type="email" className="w-full">
                <Label className="text-gray-700 font-medium mb-1.5 block">
                  Email Address <span className="text-red-500">*</span>
                </Label>
                <Input 
                  placeholder="kasem@vai.com" 
                  variant="bordered"
                  startContent={
                    <Mail className="text-gray-400 w-5 h-5 mr-1 flex-shrink-0" />
                  }
                  className="w-full bg-slate-50 h-12 rounded-xl"
                />
                <FieldError className="text-xs text-[#b91c1c] mt-1" />
              </TextField>

              {/* Password Field */}
              <TextField isRequired name="password" type="password" className="w-full">
                <Label className="text-gray-700 font-medium mb-1.5 block">
                  Password <span className="text-red-500">*</span>
                </Label>
                <Input 
                  placeholder="••••••••" 
                  variant="bordered"
                  startContent={
                    <Lock className="text-gray-400 w-5 h-5 mr-1 flex-shrink-0" />
                  }
                  className="w-full bg-slate-50 h-12 rounded-xl"
                />
                <FieldError className="text-xs text-[#b91c1c] mt-1" />
              </TextField>

            </Fieldset>

            {/* Custom styled red submit button */}
            <Button 
              type="submit" 
              className="w-full text-white font-semibold h-12 rounded-xl text-base shadow-sm transition-all mt-4"
              style={{ backgroundColor: "#b91c1c" }}
            >
              Sign In
            </Button>
          </Form>
        </Surface>

        {/* 💡 Register redirect link section added below the form */}
        <div className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{" "}
          <Link 
            href="/register" 
            className="font-semibold hover:underline transition-colors"
            style={{ color: "#b91c1c" }}
          >
            Register here
          </Link>
        </div>

      </div>
    </div>
  );
}