const ORGANIZER_CODE = "ADMIN123";

export function validateOrganizerCode(
  codigo: string
) {
  return codigo === ORGANIZER_CODE;
}