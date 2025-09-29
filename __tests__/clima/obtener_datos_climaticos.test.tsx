import { usarApiWeather } from '@/src/clima/hooks/api';
import { usarPronosticoDelClima } from '@/src/clima/hooks/pronostico';
import { ProveedorDeDatosClimaticos } from '@/src/clima/proveedores';
import { renderHook, waitFor } from '@testing-library/react-native';

jest.mock('axios', () => {
  const brindarReporteDeClimaFalse = jest.fn(async () => ({
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
  }));

  return {
    get: brindarReporteDeClimaFalse,
  };
});

describe('Como usuario, quiero que en la pantalla aparezca los datos del clima donde me encuentro', () => {
  let pronostico: ReturnType<typeof usarPronosticoDelClima>;

  beforeEach(async () => {
    const { result } = renderHook(
      () => {
        const api = usarApiWeather({ latitud: -34.7, longitud: -58.27 });
        const pronostico = usarPronosticoDelClima({
          fecha: new Date(),
          latitud: -34.7,
          longitud: -58.27,
          alConectarmeConElServicioMeteorologico: api.pronosticoActual,
        });
        return pronostico;
      },
      {
        wrapper: ProveedorDeDatosClimaticos,
      }
    );

    pronostico = result.current;
  });

  test('Es Posible obtener el nombre de la ciudad donde me encuentro', async () => {
    expect(pronostico.ciudad()).toBe('');

    await waitFor(() => {
      expect(pronostico.ciudad()).toBe('Quilmes');
    });
  });
});
