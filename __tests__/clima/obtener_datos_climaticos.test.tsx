import { usarApiWeather } from '@/src/clima/hooks/api';
import { usarPronosticoDelClima } from '@/src/clima/hooks/pronostico';
import { ProveedorDeDatosClimaticos } from '@/src/clima/proveedores';
import { renderHook, waitFor } from '@testing-library/react-native';
// import { api_key_weather } from '@/src/clima/claves';

jest.mock('axios', () => {
  const brindarReporteDeClimaFalse = jest.fn(async () => {
    await new Promise((resolve) => setTimeout(resolve, 100)); // Simula un retardo de 100ms
    return {
      data: {
        location: {
          name: 'Quilmes',
        },
        current: {
          condition: {
            text: 'Sunny',
            code: 1000,
          },
          humidity: 50,
          pressure_mb: 1015,
          wind_kph: 10,
          temp_c: 22,
        },
      },
    };
  });

  return {
    get: brindarReporteDeClimaFalse,
  };
});

describe('Como usuario, quiero que en la pantalla aparezca los datos del clima donde me encuentro', () => {
  let pronostico: ReturnType<typeof renderHook<ReturnType<typeof usarPronosticoDelClima>, {}>>;

  beforeEach(async () => {
    pronostico = renderHook(
      () => {
        const api = usarApiWeather({
          latitud: -34.7,
          longitud: -58.27,
          api_key: 'test_api_key_weather',
        });
        const pronostico = usarPronosticoDelClima({
          fecha: new Date(),
          latitud: -34.7,
          longitud: -58.27,
          alConectarmeConElServicioMeteorologico: api.solicitarPronosticoActual,
        });
        return pronostico;
      },
      {
        wrapper: ProveedorDeDatosClimaticos,
      }
    );
  });

  test('Es Posible obtener el nombre de la ciudad donde me encuentro', async () => {
    expect(pronostico.result.current.ciudad()).toBe('');

    await waitFor(() => {
      expect(pronostico.result.current.ciudad()).toBe('Quilmes');
    });
  });
});
