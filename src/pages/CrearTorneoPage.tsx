import { useState } from "react";
import PublicLayout from "../layouts/PublicLayout";
import { torneos } from "../modules/torneos/data";
import { validarLlave, crearTorneo } from "../modules/torneos/utils";

export default function CrearTorneoPage() {
  const [codigo, setCodigo] = useState("");
  const [habilitado, setHabilitado] = useState(false);

  const [nombre, setNombre] = useState("");
  const [fecha, setFecha] = useState("");
  const [lugar, setLugar] = useState("");

  const [puntosCampeon, setPuntosCampeon] = useState(200);
  const [puntosFinalista, setPuntosFinalista] = useState(150);
  const [puntosSemifinal, setPuntosSemifinal] = useState(100);
  const [puntosCuartos, setPuntosCuartos] = useState(50);

  const [dni1, setDni1] = useState("");
  const [dni2, setDni2] = useState("");
  const [parejas, setParejas] = useState<{ dni1: string; dni2: string }[]>([]);

  const handleValidarCodigo = () => {
    if (validarLlave(codigo)) setHabilitado(true);
  };

  const handleAgregarPareja = () => {
    if (!dni1 || !dni2) return;
    setParejas([...parejas, { dni1, dni2 }]);
    setDni1("");
    setDni2("");
  };

  const handleCrearTorneo = () => {
    const torneo = crearTorneo(codigo, nombre, fecha, lugar);

    if (torneo) {
      torneo.puntos = {
        campeon: puntosCampeon,
        finalista: puntosFinalista,
        semifinal: puntosSemifinal,
        cuartos: puntosCuartos,
      };

      torneo.parejas = parejas;

      torneos.push(torneo);

      setNombre("");
      setFecha("");
      setLugar("");
      setParejas([]);
      setCodigo("");
      setHabilitado(false);
    }
  };

  return (
    <PublicLayout>
      <div className="w-full max-w-3xl mx-auto flex flex-col gap-6">

        {/* HEADER */}
        <div
          className="rounded-xl p-5"
          style={{
            background: "var(--gradient-main)",
            border: "1px solid var(--color-border)",
          }}
        >
          <h1 className="text-2xl font-bold">Crear Torneo</h1>
          <p className="text-sm opacity-70">
            Panel de organización federativa
          </p>
        </div>

        {/* STEP 1 */}
        <div className="card">
          <h3 className="card-title">1. Código organizador</h3>

          <div className="flex gap-2">
            <input
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              className="flex-1 px-3 py-2 rounded-md bg-transparent border"
              style={{ borderColor: "var(--color-border)" }}
              placeholder="Ingresar código"
            />

            <button
              onClick={handleValidarCodigo}
              className="px-4 py-2 rounded-md font-semibold"
              style={{
                background: "var(--color-primary)",
                color: "#000",
              }}
            >
              Validar
            </button>
          </div>
        </div>

        {/* STEP 2 */}
        {habilitado && (
          <>
            <div className="card">
              <h3 className="card-title">2. Datos del torneo</h3>

              <div className="flex flex-col gap-3">
                <input
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Nombre del torneo"
                  className="input"
                />

                <input
                  type="date"
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                  className="input"
                />

                <input
                  value={lugar}
                  onChange={(e) => setLugar(e.target.value)}
                  placeholder="Lugar"
                  className="input"
                />
              </div>
            </div>

            {/* STEP 3 */}
            <div className="card">
              <h3 className="card-title">3. Puntos</h3>

              <div className="grid grid-cols-2 gap-2">
                <input className="input" type="number" value={puntosCampeon} onChange={(e) => setPuntosCampeon(Number(e.target.value))} placeholder="Campeón" />
                <input className="input" type="number" value={puntosFinalista} onChange={(e) => setPuntosFinalista(Number(e.target.value))} placeholder="Finalista" />
                <input className="input" type="number" value={puntosSemifinal} onChange={(e) => setPuntosSemifinal(Number(e.target.value))} placeholder="Semifinal" />
                <input className="input" type="number" value={puntosCuartos} onChange={(e) => setPuntosCuartos(Number(e.target.value))} placeholder="Cuartos" />
              </div>
            </div>

            {/* STEP 4 */}
            <div className="card">
              <h3 className="card-title">4. Parejas</h3>

              <div className="flex gap-2">
                <input
                  value={dni1}
                  onChange={(e) => setDni1(e.target.value)}
                  placeholder="DNI 1"
                  className="input"
                />
                <input
                  value={dni2}
                  onChange={(e) => setDni2(e.target.value)}
                  placeholder="DNI 2"
                  className="input"
                />

                <button
                  onClick={handleAgregarPareja}
                  className="px-3 py-2 rounded-md font-semibold"
                  style={{
                    background: "var(--color-accent)",
                    color: "#000",
                  }}
                >
                  +
                </button>
              </div>

              <div className="mt-3 flex flex-col gap-1 text-sm opacity-80">
                {parejas.map((p, i) => (
                  <div key={i}>
                    {p.dni1} & {p.dni2}
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={handleCrearTorneo}
              className="py-3 rounded-lg font-semibold"
              style={{
                background: "var(--color-primary)",
                color: "#000",
              }}
            >
              Crear torneo
            </button>
          </>
        )}
      </div>
    </PublicLayout>
  );
}