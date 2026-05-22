export function validateOrganizerCode(
  code: string
) {
  const valid = code === "ADMIN123";

  if (valid) {
    localStorage.setItem(
      "fpa_admin_mode",
      "true"
    );
  }

  return valid;
}

export function isOrganizer() {
  return (
    localStorage.getItem(
      "fpa_admin_mode"
    ) === "true"
  );
}

export function logoutOrganizer() {
  localStorage.removeItem(
    "fpa_admin_mode"
  );
}