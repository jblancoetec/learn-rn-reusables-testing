import { usarLocalizacion } from '@/src/localizacion';
import { renderHook, waitFor } from '@testing-library/react-native';

// https://vaskort.medium.com/how-to-unit-test-your-custom-react-hook-with-react-testing-library-and-jest-8bdefafdc8a2

jest.mock('expo-location', () => {
  const permisos = { granted: false };

  const solicitarPermisosFalsos = async () => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    permisos.granted = true;
    return permisos;
  };

  const usarPermisosEnPrimerPlanoFalsos = jest.fn(() => [permisos, solicitarPermisosFalsos]);

  const obtenerPosicionFalsa = jest.fn(async () => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return {
      coords: {
        latitude: 10,
        longitude: 20,
      },
    };
  });

  return {
    useForegroundPermissions: usarPermisosEnPrimerPlanoFalsos,
    getCurrentPositionAsync: obtenerPosicionFalsa,
  };
});

describe('Como usuario, quiero que en la pantalla aparezca los datos del clima donde me encuentro', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('Es posible obtener latitud y longitud distinta a cero sin errores', async () => {
    const { result } = renderHook(() => usarLocalizacion());
    const { current } = result;

    expect(current.fueHabilitado()).not.toBeTruthy();

    await waitFor(() => {
      const { current } = result;
      expect(current.fueHabilitado()).toBeTruthy();
      expect(current.posicion()).toEqual({ latitud: 10, longitud: 20 });
    });
  });
});
