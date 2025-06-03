"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Burada gerçek doğrulama yerine örnek kontrol yapalım:
    if (email === "user@example.com" && password === "123456") {
      // Giriş başarılı, dashboarda yönlendir
      router.push("/dashboard");
    } else {
      alert("Geçersiz kullanıcı adı veya şifre");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="mb-6 text-3xl font-semibold">Giriş Yap</h2>
      <form onSubmit={handleLogin} className="flex flex-col gap-4 w-80">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="p-2 border rounded"
        />
        <button type="submit" className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Giriş Yap
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
