import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL: process.env.BETTER_AUTH_URL,// 
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


export const { signIn, signUp, useSession } = authClient;