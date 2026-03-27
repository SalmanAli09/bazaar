"use client";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();
  const hideNavFooter = pathname === '/login' || pathname === '/register' || pathname === '/seller/dashboard' || pathname ===  '/seller/listings' || pathname === '/seller/earnings' || pathname === '/seller/chats' || pathname === '/seller/edit-profile' || pathname.startsWith('/admin');

  return (
    <>
      {!hideNavFooter && <Navbar />}
      {children}
      {!hideNavFooter && <Footer />}
    </>
  );
}
