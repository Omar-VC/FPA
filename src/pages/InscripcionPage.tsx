import PublicLayout from "../layouts/PublicLayout";

export default function InscripcionPage() {
  return (
    <PublicLayout>
      <div className="flex flex-col items-center py-8">
        <h1 className="text-2xl font-bold text-accent mb-6">Inscripción de Jugadores</h1>

        <form className="w-3/4 max-w-md bg-dark border border-accent rounded-lg shadow-lg p-6 space-y-4">
          <div className="flex flex-col">
            <label className="text-light font-semibold mb-1">Nombre completo</label>
            <input
              type="text"
              placeholder="Ej: Juan Pérez"
              className="px-3 py-2 rounded-md bg-primary text-light focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-light font-semibold mb-1">Categoría</label>
            <select
              className="px-3 py-2 rounded-md bg-primary text-light focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-primary text-light rounded-md 
                       hover:bg-accent hover:shadow-[0_0_8px_#408A71] transition-all"
          >
            Inscribirse
          </button>
        </form>
      </div>
    </PublicLayout>
  );
}
