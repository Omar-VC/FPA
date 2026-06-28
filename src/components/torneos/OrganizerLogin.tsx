type Props = {
  organizerMode: boolean;
  codigo: string;
  setCodigo: React.Dispatch<React.SetStateAction<string>>;
  handleLoginOrganizer: () => void;
};

export default function OrganizerLogin({
  organizerMode,
  codigo,
  setCodigo,
  handleLoginOrganizer,
}: Props) {
  if (organizerMode) return null;

  return (
    <>
      {!organizerMode && (
          <div className="card">
            <h3 className="card-title">Acceso organizador</h3>

            <div className="flex gap-2">
              <input
                type="password"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                placeholder="Ingresar código"
                className="input"
              />

              <button
                onClick={handleLoginOrganizer}
                className="px-4 py-2 rounded-md font-semibold"
                style={{
                  background: "var(--color-primary)",

                  color: "#000",
                }}
              >
                Soy organizador
              </button>
            </div>
          </div>
        )}
    </>
  );
}