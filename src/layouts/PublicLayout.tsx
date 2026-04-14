import Navbar from "../components/Navbar";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen font-main" style={{ backgroundColor: "var(--color-bg)", color: "var(--color-text)" }}>
      <Navbar />

      {/* Espaciado para compensar navbar fijo */}
      <main className="pt-24 px-4 md:px-8">
        {children}
      </main>
    </div>
  );
}