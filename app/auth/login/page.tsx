"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [username, setUsername] = useState<string>("");
  const [pass, setPass] = useState<string>("");
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission
    const result = await signIn("credentials", {
      username: username,
      password: pass,
      redirect: false,
      callbackUrl: "/",
    });

    if (result?.error) {
      console.error("Login failed:", result.error);
    } else {
      router.push("/");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        className="px-7 py-4 shadow bg-white rounded-md flex flex-col gap-2"
        onSubmit={onSubmit}
      >
        <label className="mb-2 text-sm font-medium text-gray-700">
          User Name
        </label>
        <input
          className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
          type="text"
          value={username}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUsername(e.target.value)
          }
          required
        />
        <label className="mb-2 mt-4 text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
          type="password"
          value={pass}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPass(e.target.value)
          }
          required
        />
        <button
          type="submit"
          className="mt-4 w-full py-2 px-4 bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 text-white font-semibold rounded-lg shadow-md"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
