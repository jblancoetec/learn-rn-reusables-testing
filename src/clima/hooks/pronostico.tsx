import { useQuery } from '@tanstack/react-query';
import { DatosClimaticos } from './api';

export const usarPronosticoDelClima = ({
  fecha,
  latitud,
  longitud,
  alConectarmeConElServicioMeteorologico: solicitarPronostico,
}: {
  fecha: Date;
  latitud: number;
  longitud: number;
  alConectarmeConElServicioMeteorologico: () => Promise<DatosClimaticos>;
}) => {
  const consulta = useQuery({
    queryKey: [fecha.getDate(), fecha.getHours(), latitud.toPrecision(4), longitud.toPrecision(4)],
    queryFn: solicitarPronostico,
  });

  return {
    ciudad: () => (consulta.isFetched ? consulta.data?.ciudad : ''),
    pronostico: () => (consulta.isFetched ? consulta.data : undefined),
    seEstaDescargando: () => consulta.isLoading,
    seDescargoConExito: () => consulta.isSuccess,
    seDescargoConError: () => consulta.isError,
    error: () => (consulta.isError ? consulta.error : null),
  };
};
