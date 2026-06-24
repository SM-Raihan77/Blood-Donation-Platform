import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL: "http://localhost:3000", // 👈 এখানে কমা (,) মিসিং ছিল
    user: {
        additionalFields: {
            phone: { type: "string" },
            gender: { type: "string" },
            bloodGroup: { type: "string" },
            district: { type: "string" },
            upazila: { type: "string" },
        },
    },
});

// 👈 নিচের ভুল এক্সপোর্ট লাইনটি ডিলিট করে এটি ব্যবহার করুন:
export const { signIn, signUp, useSession } = authClient;