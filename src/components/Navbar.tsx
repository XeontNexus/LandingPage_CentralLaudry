"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Beranda", href: "/" },
  { label: "Layanan", href: "/layanan" },
  { label: "Tentang Kami", href: "/tentang" },
  { label: "Galeri", href: "/galeri" },
  { label: "Kontak", href: "/kontak" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="header">
      <div className="container nav-container">
        <Link href="/" className="logo">
          Central Laundry Express
        </Link>

        {/* Desktop Navigation */}
        <nav className="nav-menu">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-link ${pathname === item.href ? "active" : ""}`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/admin/login"
            className="nav-admin-btn"
          >
            🔑 Login Admin
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Backdrop */}
      <div
        onClick={() => setMobileMenuOpen(false)}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.4)",
          zIndex: 98,
          opacity: mobileMenuOpen ? 1 : 0,
          pointerEvents: mobileMenuOpen ? "auto" : "none",
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Mobile Navigation Dropdown */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          width: "80%",
          maxWidth: "320px",
          height: "100vh",
          backgroundColor: "white",
          zIndex: 99,
          display: "flex",
          flexDirection: "column",
          padding: "24px",
          boxShadow: mobileMenuOpen ? "-4px 0 24px rgba(0,0,0,0.15)" : "none",
          transform: mobileMenuOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.35s ease",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "40px",
            opacity: mobileMenuOpen ? 1 : 0,
            transform: mobileMenuOpen ? "translateY(0)" : "translateY(-10px)",
            transition: "opacity 0.3s ease 0.15s, transform 0.3s ease 0.15s",
          }}
        >
          <span className="logo">Central Laundry</span>
          <button
            onClick={() => setMobileMenuOpen(false)}
            style={{
              fontSize: "32px",
              color: "var(--text-dark)",
              lineHeight: 1,
              background: "none",
              border: "none",
              cursor: "pointer",
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "8px",
              transition: "background 0.2s",
            }}
          >
            &times;
          </button>
        </div>
        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            fontSize: "20px",
            fontWeight: 600,
            flex: 1,
          }}
        >
          {navItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                color:
                  pathname === item.href
                    ? "var(--primary)"
                    : "var(--text-dark)",
                textDecoration: "none",
                padding: "14px 16px",
                borderRadius: "12px",
                background: pathname === item.href ? "rgba(8,95,128,0.08)" : "transparent",
                opacity: mobileMenuOpen ? 1 : 0,
                transform: mobileMenuOpen ? "translateX(0)" : "translateX(30px)",
                transition: `opacity 0.3s ease ${0.1 + index * 0.05}s, transform 0.3s ease ${0.1 + index * 0.05}s, background 0.2s ease`,
              }}
            >
              {item.label}
            </Link>
          ))}
          {/* Login Admin - right after Kontak */}
          <Link
            href="/admin/login"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "14px 16px",
              borderRadius: "12px",
              color: "var(--primary)",
              textDecoration: "none",
              fontSize: "20px",
              fontWeight: 600,
              opacity: mobileMenuOpen ? 1 : 0,
              transform: mobileMenuOpen ? "translateX(0)" : "translateX(30px)",
              transition: `opacity 0.3s ease ${0.1 + navItems.length * 0.05}s, transform 0.3s ease ${0.1 + navItems.length * 0.05}s`,
            }}
          >
            🔑 Login Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}
