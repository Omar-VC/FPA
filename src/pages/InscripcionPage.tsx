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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    registrarJugador({
      nombre: formData.nombre,
      apodo: formData.apodo || undefined,
      ciudad: formData.ciudad,
      genero: formData.sexo as "masculino" | "femenino",
      nivel: formData.nivel as "iniciado" | "intermedio" | "avanzado",
    });

    alert("Jugador inscripto correctamente");

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
      <div className="w-full max-w-2xl mx-auto flex flex-col gap-6">

        {/* HEADER */}
        <div
          className="rounded-xl p-5"
          style={{
            background: "var(--gradient-main)",
            border: "1px solid var(--color-border)",
          }}
        >
          <h1 className="text-2xl font-bold">
            Inscripción de Jugadores
          </h1>
          <p className="text-sm opacity-70">
            Registro oficial en la federación
          </p>
        </div>

        {/* FORM CARD */}
        <form
          onSubmit={handleSubmit}
          className="rounded-xl p-6 flex flex-col gap-4"
          style={{
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
          }}
        >

          {/* INPUT */}
          <Input
            label="Nombre completo"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />

          <Input
            label="Apodo"
            name="apodo"
            value={formData.apodo}
            onChange={handleChange}
          />

          <Input
            label="DNI"
            name="dni"
            value={formData.dni}
            onChange={handleChange}
            required
          />

          <Input
            label="Ciudad"
            name="ciudad"
            value={formData.ciudad}
            onChange={handleChange}
            required
          />

          <Select
            label="Sexo"
            name="sexo"
            value={formData.sexo}
            onChange={handleChange}
            options={["masculino", "femenino"]}
          />

          <Select
            label="Nivel"
            name="nivel"
            value={formData.nivel}
            onChange={handleChange}
            options={["iniciado", "intermedio", "avanzado"]}
          />

          <Select
            label="Lado"
            name="lado"
            value={formData.lado}
            onChange={handleChange}
            options={["revez", "drive"]}
          />

          {/* BOTÓN */}
          <button
            type="submit"
            className="mt-2 py-3 rounded-lg font-semibold"
            style={{
              background: "var(--color-accent)",
              color: "#000",
            }}
          >
            Inscribirse
          </button>
        </form>
      </div>
    </PublicLayout>
  );
}

/* COMPONENTES INTERNOS */

function Input({
  label,
  ...props
}: any) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-[var(--color-text-muted)]">
        {label}
      </label>
      <input
        {...props}
        className="px-3 py-2 rounded-md bg-transparent border outline-none"
        style={{
          borderColor: "var(--color-border)",
          color: "var(--color-text)",
        }}
      />
    </div>
  );
}

function Select({
  label,
  options,
  ...props
}: any) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-[var(--color-text-muted)]">
        {label}
      </label>
      <select
        {...props}
        className="px-3 py-2 rounded-md bg-transparent border"
        style={{
          borderColor: "var(--color-border)",
          color: "var(--color-text)",
        }}
      >
        {options.map((op: string) => (
          <option key={op} value={op}>
            {op}
          </option>
        ))}
      </select>
    </div>
  );
}