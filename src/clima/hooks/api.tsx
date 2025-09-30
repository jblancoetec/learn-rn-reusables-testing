import axios from 'axios';
// import { api_key_weather } from '../claves';

export interface DatosClimaticos {
  ciudad: string;
  condicion: {
    texto: string;
    codigo: number;
  };
  humedad: number;
  presion: number;
  velocidad_del_viento: number;
  temperatura: number;
}

export const usarApiWeather = ({
  latitud,
  longitud,
  api_key,
}: {
  latitud: number;
  longitud: number;
  api_key: string;
}) => {
  const solicitarPronosticoActual = async (): Promise<DatosClimaticos> => {
    try {
      const respuesta = await axios.get(
        `http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${latitud},${longitud}`
      );

      return {
        ciudad: respuesta.data.location.name,
        condicion: {
          texto: respuesta.data.current.condition.text,
          codigo: respuesta.data.current.condition.code,
        },
        humedad: respuesta.data.current.humidity,
        presion: respuesta.data.current.pressure_mb,
        velocidad_del_viento: respuesta.data.current.wind_kph,
        temperatura: respuesta.data.current.temp_c,
      };
    } catch (error) {
      console.error('Error al descargar los datos climáticos:', error);
      throw new Error('No se pudieron descargar los datos climáticos');
    }
  };

  return {
    solicitarPronosticoActual,
  };
};
