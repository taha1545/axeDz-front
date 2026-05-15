"use client";

import LoginForm from "./components/login-form";
import LoginAside from "./components/login-aside";
export default function LoginPage() {
  return (
    <main className="font-space flex flex-col lg:flex-row min-h-screen justify-center items-center bg-gray-50">
      <LoginForm />
      <LoginAside />
    </main>
  );
}
