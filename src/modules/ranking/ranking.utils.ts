export function calcularCategoria(puntos: number): string {
  if (puntos >= 1400) return "1ra Categoría";
  if (puntos >= 1200) return "2da Categoría";
  if (puntos >= 1000) return "3ra Categoría";
  if (puntos >= 800) return "4ta Categoría";
  if (puntos >= 600) return "5ta Categoría";
  if (puntos >= 400) return "6ta Categoría";
  if (puntos >= 200) return "7ma Categoría";
  return "8va Categoría";
}