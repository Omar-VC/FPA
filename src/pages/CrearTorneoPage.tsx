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
    if (validarLlave(codigo)) {
      setHabilitado(true);
      alert("Código válido. Ya puedes crear tu torneo.");
    } else {
      alert("Código inválido.");
    }
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
      alert(`Torneo creado: ${torneo.nombre}`);
      // limpiar inputs
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
      <div className="flex flex-col items-center py-8">
        <h1 className="text-2xl font-bold text-accent mb-6">Crear Torneo</h1>

        {/* Validación de código */}
        <div className="mb-6 flex gap-2">
          <input
            type="text"
            placeholder="Ingrese código de organizador"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            className="p-2 rounded-md"
          />
          <button
            onClick={handleValidarCodigo}
            className="px-4 py-2 bg-primary text-light rounded-md hover:bg-accent"
          >
            Validar
          </button>
        </div>

        {/* Formulario de creación */}
        {habilitado && (
          <div className="mt-6 w-3/4 bg-dark border border-accent rounded-lg p-4">
            <h2 className="text-light font-semibold mb-2">Nuevo torneo</h2>
            <div className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="Nombre del torneo"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="p-2 rounded-md"
              />
              <input
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                className="p-2 rounded-md"
              />
              <input
                type="text"
                placeholder="Lugar"
                value={lugar}
                onChange={(e) => setLugar(e.target.value)}
                className="p-2 rounded-md"
              />

              {/* Puntos */}
              <h3 className="text-light mt-4">Asignar puntos</h3>
              <input
                type="number"
                placeholder="Campeón"
                value={puntosCampeon}
                onChange={(e) => setPuntosCampeon(Number(e.target.value))}
                className="p-2 rounded-md"
              />
              <input
                type="number"
                placeholder="Finalista"
                value={puntosFinalista}
                onChange={(e) => setPuntosFinalista(Number(e.target.value))}
                className="p-2 rounded-md"
              />
              <input
                type="number"
                placeholder="Semifinal"
                value={puntosSemifinal}
                onChange={(e) => setPuntosSemifinal(Number(e.target.value))}
                className="p-2 rounded-md"
              />
              <input
                type="number"
                placeholder="Cuartos"
                value={puntosCuartos}
                onChange={(e) => setPuntosCuartos(Number(e.target.value))}
                className="p-2 rounded-md"
              />

              {/* Jugadores */}
              <h3 className="text-light mt-4">Agregar jugadores (por DNI)</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="DNI Jugador 1"
                  value={dni1}
                  onChange={(e) => setDni1(e.target.value)}
                  className="p-2 rounded-md"
                />
                <input
                  type="text"
                  placeholder="DNI Jugador 2"
                  value={dni2}
                  onChange={(e) => setDni2(e.target.value)}
                  className="p-2 rounded-md"
                />
                <button
                  onClick={handleAgregarPareja}
                  className="px-4 py-2 bg-secondary text-light rounded-md hover:bg-accent"
                >
                  Agregar pareja
                </button>
              </div>

              {/* Lista de parejas */}
              <ul className="text-light mt-2">
                {parejas.map((p, i) => (
                  <li key={i}>
                    {p.dni1} & {p.dni2}
                  </li>
                ))}
              </ul>

              <button
                onClick={handleCrearTorneo}
                className="mt-4 px-4 py-2 bg-primary text-light rounded-md hover:bg-accent"
              >
                Confirmar creación
              </button>
            </div>
          </div>
        )}
      </div>
    </PublicLayout>
  );
}
