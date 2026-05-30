import { useState } from "react";
import PublicLayout from "../layouts/PublicLayout";
import { createTournamentService } from "../modules/torneos/torneo.service";
import { validateOrganizerCode } from "../modules/torneos/rules";
import { validatePair } from "../modules/torneos/rules";
import { getPlayerNameByDni } from "../modules/jugadores/jugador.utils";

export default function CrearTorneoPage() {
  const [codigo, setCodigo] = useState("");
  const [habilitado, setHabilitado] = useState(false);

  const [nombre, setNombre] = useState("");
  const [fecha, setFecha] = useState("");
  const [lugar, setLugar] = useState("");
  const [categoria, setCategoria] = useState<
    "iniciado" | "intermedio" | "avanzado"
  >("intermedio");
  const [genero, setGenero] = useState<"masculino" | "femenino" | "mixto">(
    "masculino",
  );
  const [tipoFormato, setTipoFormato] = useState<
    "eliminacion-directa" | "zonas-playoff"
  >("eliminacion-directa");
  const [cupoMaximo, setCupoMaximo] = useState(16);

  const [precioInscripcion, setPrecioInscripcion] = useState(0);
  const [telefonoOrganizador, setTelefonoOrganizador] = useState("");

  const [puntosCampeon, setPuntosCampeon] = useState(200);
  const [puntosFinalista, setPuntosFinalista] = useState(150);
  const [puntosSemifinal, setPuntosSemifinal] = useState(100);
  const [puntosCuartos, setPuntosCuartos] = useState(50);

  const [dni1, setDni1] = useState("");
  const [dni2, setDni2] = useState("");
  const [parejas, setParejas] = useState<{ dni1: string; dni2: string }[]>([]);

  // TEMPORAL (después lo movemos a service)
  const handleValidarCodigo = () => {
    if (validateOrganizerCode(codigo)) {
      setHabilitado(true);
    } else {
      alert("Código inválido");
    }
  };

  const handleAgregarPareja = () => {
    if (!dni1 || !dni2) return;

    const torneoTemporal = {
      parejas,
      categoria,
      genero,
    };
    const validation = validatePair(torneoTemporal as any, dni1, dni2);

    if (!validation.valid) {
      alert(validation.reason);
      return;
    }

    setParejas([...parejas, { dni1, dni2 }]);

    setDni1("");
    setDni2("");
  };

  const handleCrearTorneo = () => {
    if (!nombre || !fecha || !lugar) {
      alert("Completá todos los datos");
      return;
    }

    createTournamentService({
      codigo,
      nombre,
      fecha,
      lugar,
      categoria,
      genero,
      tipoFormato,
      puntos: {
        campeon: puntosCampeon,
        finalista: puntosFinalista,
        semifinal: puntosSemifinal,
        cuartos: puntosCuartos,
      },
      parejas,
      cupoMaximo,
      precioInscripcion,
      telefonoOrganizador,
    });

    alert("Torneo creado");

    setNombre("");
    setFecha("");
    setLugar("");
    setCupoMaximo(16);
    setPrecioInscripcion(0);
    setTelefonoOrganizador("");
    setParejas([]);
    setCodigo("");
    setHabilitado(false);
  };

  return (
    <PublicLayout>
      <div className="w-full max-w-3xl mx-auto flex flex-col gap-6">
        <div
          className="rounded-xl p-5"
          style={{
            background: "var(--gradient-main)",
            border: "1px solid var(--color-border)",
          }}
        >
          <h1 className="text-2xl font-bold">Crear Torneo</h1>
          <p className="text-sm opacity-70">Panel de organización federativa</p>
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
                <select
                  value={categoria}
                  onChange={(e) =>
                    setCategoria(
                      e.target.value as "iniciado" | "intermedio" | "avanzado",
                    )
                  }
                  className="input"
                >
                  <option value="iniciado">Iniciado</option>

                  <option value="intermedio">Intermedio</option>

                  <option value="avanzado">Avanzado</option>
                </select>
                <select
                  value={genero}
                  onChange={(e) =>
                    setGenero(
                      e.target.value as "masculino" | "femenino" | "mixto",
                    )
                  }
                  className="input"
                >
                  <option value="masculino">Masculino</option>

                  <option value="femenino">Femenino</option>

                  <option value="mixto">Mixto</option>
                </select>
                <select
                  value={tipoFormato}
                  onChange={(e) =>
                    setTipoFormato(
                      e.target.value as "eliminacion-directa" | "zonas-playoff"
                    )
                  }
                  className="input"
                >
                  <option value="eliminacion-directa">Eliminación Directa</option>
                  <option value="zonas-playoff">Zonas Play-Off</option>
                </select>
                <input
                  type="number"
                  value={cupoMaximo}
                  onChange={(e) => setCupoMaximo(Number(e.target.value))}
                  placeholder="Cupo máximo"
                  className="input"
                />
                <input
                  type="number"
                  value={precioInscripcion}
                  onChange={(e) => setPrecioInscripcion(Number(e.target.value))}
                  placeholder="Precio de inscripcion"
                  className="input"
                />

                <input
                  type="text"
                  value={telefonoOrganizador}
                  onChange={(e) => setTelefonoOrganizador(e.target.value)}
                  placeholder="WhatsApp organizador"
                  className="input"
                />
              </div>
            </div>

            {/* STEP 3 */}
            <div className="card">
              <h3 className="card-title">3. Puntos</h3>

              <div className="grid grid-cols-2 gap-2">
                <input
                  className="input"
                  type="number"
                  value={puntosCampeon}
                  onChange={(e) => setPuntosCampeon(Number(e.target.value))}
                />
                <input
                  className="input"
                  type="number"
                  value={puntosFinalista}
                  onChange={(e) => setPuntosFinalista(Number(e.target.value))}
                />
                <input
                  className="input"
                  type="number"
                  value={puntosSemifinal}
                  onChange={(e) => setPuntosSemifinal(Number(e.target.value))}
                />
                <input
                  className="input"
                  type="number"
                  value={puntosCuartos}
                  onChange={(e) => setPuntosCuartos(Number(e.target.value))}
                />
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
                    {getPlayerNameByDni(p.dni1)} & {getPlayerNameByDni(p.dni2)}
                  </div>
                ))}
              </div>
            </div>

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
