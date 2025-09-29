import { usarLocalizacion } from '@/src/localizacion';
import { renderHook, waitFor } from '@testing-library/react-native';

// https://vaskort.medium.com/how-to-unit-test-your-custom-react-hook-with-react-testing-library-and-jest-8bdefafdc8a2

jest.mock('expo-location', () => {
  const permisos = { granted: false };

  const requestPermission = async () => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    permisos.granted = true;
    return permisos;
  };

  const useForegroundPermissions = jest.fn(() => [permisos, requestPermission]);

  const getCurrentPositionAsync = jest.fn(async () => ({
    coords: {
      latitude: 10,
      longitude: 20,
    },
  }));

  return {
    useForegroundPermissions,
    getCurrentPositionAsync,
  };
});

describe('Como usuario, quiero que en la pantalla aparezca los datos del clima donde me encuentro', () => {
  test('Es posible obtener latitud y longitud distinta a cero sin errores', async () => {
    const { result } = renderHook(() => usarLocalizacion());
    const { current } = result;

    expect(current.fueHabilitado()).not.toBeTruthy();

    await waitFor(() => {
      const { current } = result;
      expect(current.fueHabilitado()).toBeTruthy();
    });
  });
});
