import { useState } from "react";
import PublicLayout from "../layouts/PublicLayout";
import { registrarJugador } from "../modules/ranking/data";

export default function InscripcionPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    apodo: "",
    dni: "",
    ciudad: "",
    sexo: "masculino",
    nivel: "iniciado",
    lado: "revez",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // registrar jugador en el ranking
    registrarJugador({
      nombre: formData.nombre,
      apodo: formData.apodo || undefined, // opcional
      ciudad: formData.ciudad,
      genero: formData.sexo as "masculino" | "femenino",
      nivel: formData.nivel as "iniciado" | "intermedio" | "avanzado",
    });

    alert("Jugador inscripto correctamente en el ranking!");
    setFormData({
      nombre: "",
      apodo: "",
      dni: "",
      ciudad: "",
      sexo: "masculino",
      nivel: "iniciado",
      lado: "revez",
    });
  };

  return (
    <PublicLayout>
      <div className="flex flex-col items-center py-8">
        <h1 className="text-2xl font-bold text-accent mb-6">Inscripción de Jugadores</h1>

        <form
          onSubmit={handleSubmit}
          className="w-3/4 max-w-md bg-dark border border-accent rounded-lg shadow-lg p-6 space-y-4"
        >
          {/* Nombre */}
          <div className="flex flex-col">
            <label className="text-light font-semibold mb-1">Nombre completo</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              className="px-3 py-2 rounded-md bg-primary text-light focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          {/* Apodo (opcional) */}
          <div className="flex flex-col">
            <label className="text-light font-semibold mb-1">Apodo</label>
            <input
              type="text"
              name="apodo"
              value={formData.apodo}
              onChange={handleChange}
              placeholder="Ej: El Toro"
              className="px-3 py-2 rounded-md bg-primary text-light focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          {/* DNI (obligatorio) */}
          <div className="flex flex-col">
            <label className="text-light font-semibold mb-1">DNI</label>
            <input
              type="text"
              name="dni"
              value={formData.dni}
              onChange={handleChange}
              required
              placeholder="Ej: 12345678"
              className="px-3 py-2 rounded-md bg-primary text-light focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          {/* Ciudad */}
          <div className="flex flex-col">
            <label className="text-light font-semibold mb-1">Ciudad</label>
            <input
              type="text"
              name="ciudad"
              value={formData.ciudad}
              onChange={handleChange}
              required
              placeholder="Ej: Añatuya"
              className="px-3 py-2 rounded-md bg-primary text-light focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          {/* Sexo */}
          <div className="flex flex-col">
            <label className="text-light font-semibold mb-1">Sexo</label>
            <select
              name="sexo"
              value={formData.sexo}
              onChange={handleChange}
              className="px-3 py-2 rounded-md bg-primary text-light focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
            </select>
          </div>

          {/* Nivel */}
          <div className="flex flex-col">
            <label className="text-light font-semibold mb-1">Nivel</label>
            <select
              name="nivel"
              value={formData.nivel}
              onChange={handleChange}
              className="px-3 py-2 rounded-md bg-primary text-light focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="iniciado">Iniciado</option>
              <option value="intermedio">Intermedio</option>
              <option value="avanzado">Avanzado</option>
            </select>
          </div>

          {/* Lado */}
          <div className="flex flex-col">
            <label className="text-light font-semibold mb-1">Lado</label>
            <select
              name="lado"
              value={formData.lado}
              onChange={handleChange}
              className="px-3 py-2 rounded-md bg-primary text-light focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="revez">Revez</option>
              <option value="drive">Drive</option>
            </select>
          </div>

          {/* Botón */}
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
