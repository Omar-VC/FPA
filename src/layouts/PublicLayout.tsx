import Navbar from "../components/Navbar";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-dark text-light font-main">
      <Navbar />
      <main>{children}</main>
    </div>
  );
}
