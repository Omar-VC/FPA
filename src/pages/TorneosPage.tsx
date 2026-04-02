import PublicLayout from "../layouts/PublicLayout";

export default function TorneosPage() {
  return (
    <PublicLayout>
      <div className="flex flex-col items-center py-8">
        <h1 className="text-2xl font-bold text-accent mb-6">Torneos FPA</h1>

        <div className="w-3/4 bg-dark border border-accent rounded-lg shadow-lg p-6">
          <ul className="space-y-4">
            <li className="flex justify-between items-center border-b border-accent pb-2">
              <span className="text-light font-semibold">Torneo Apertura 2026</span>
              <span className="text-accent">12/04/2026</span>
            </li>
            <li className="flex justify-between items-center border-b border-accent pb-2">
              <span className="text-light font-semibold">Torneo Provincial</span>
              <span className="text-accent">20/05/2026</span>
            </li>
          </ul>
        </div>

        <button
          className="mt-6 px-6 py-2 bg-primary text-light rounded-md 
                     hover:bg-accent hover:shadow-[0_0_8px_#408A71] transition-all"
        >
          Crear Torneo
        </button>
      </div>
    </PublicLayout>
  );
}
