export const useFechas = () => {
  const fechaActual = new Date();
  const fechaDeAyer = new Date(fechaActual);
  fechaDeAyer.setDate(fechaActual.getDate() - 1);
  const fechaDeManiana = new Date(fechaActual);
  fechaDeManiana.setDate(fechaActual.getDate() + 1);

  const fechas = {
    hoy: fechaActual,
    ayer: fechaDeAyer,
    maniana: fechaDeManiana,
  };
  return { fechas: () => fechas };
};
