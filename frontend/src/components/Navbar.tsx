// Sadece giriş yap butonu kalması yeterli.

"use client";

import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  // Geçici kullanıcı durumu, ileride gerçek auth ile değiştirilecek
  const [user, setUser] = useState<{ name: string } | null>(null);

  const handleLogin = () => {
    // Geçici giriş işlemi (ileride JWT/token yapılacak)
    setUser({ name: "Ahmet Yılmaz" });
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-blue-300  text-white p-4 flex justify-between shadow-md z-50">
      <div className="text-xl font-bold text-blue   -900">
        TEMSA Smart Platform
      </div>
      <div className="flex gap-4 items-center">
        {!user ? (
          <>
            <Link href="/login" className="text-blue-600 hover:underline">Giriş Yap</Link>
           <Link href="/register" className="text-blue-600 hover:underline">Kayıt Ol</Link> 
           <Link href="/factory">Fabrika Paneli</Link>
           <Link href="/maintenance">Bakım Paneli</Link>
            <Link href="/dashboard">Otobüs Takip</Link>
            <button
              onClick={handleLogin}
              className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
            >
              (Geçici) Giriş
            </button>
          </>
        ) : (
          <>
            <span className="text-gray-700">👋 Merhaba, {user.name}</span>
            <Link href="/" className="text-blue-600 hover:underline">Otobüsler</Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Çıkış Yap
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
