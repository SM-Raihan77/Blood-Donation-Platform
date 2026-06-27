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
          {/* inline style দিয়ে ব্লাড-রেড কালার নিশ্চিত করা হয়েছে */}
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
              
              {/* ইমেইল ফিল্ড */}
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

              {/* পাসওয়ার্ড ফিল্ড */}
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

            {/* বাটনটি যেন কোনোভাবেই ডিফল্ট ব্লু কালার না পায় তাই inline style ব্যবহার করা হয়েছে */}
            <Button 
              type="submit" 
              className="w-full text-white font-semibold h-12 rounded-xl text-base shadow-sm transition-all mt-4"
              style={{ backgroundColor: "#b91c1c" }}
            >
              Sign In
            </Button>
          </Form>
        </Surface>
      </div>
    </div>
  );
}