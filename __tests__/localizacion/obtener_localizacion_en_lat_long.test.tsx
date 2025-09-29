import { useLocalizacion } from '@/src/localizacion';
import { renderHook, waitFor } from '@testing-library/react-native';

// https://vaskort.medium.com/how-to-unit-test-your-custom-react-hook-with-react-testing-library-and-jest-8bdefafdc8a2

jest.mock('expo-location', () => {
  const permisos = { granted: false };
  return {
    useForegroundPermissions: jest.fn(() => [
      permisos,
      async () => {
        await new Promise((resolve) => setTimeout(resolve, 100));
        permisos.granted = true;
        return permisos;
      },
    ]),
    getCurrentPositionAsync: jest.fn(async () => ({
      coords: {
        latitude: 10,
        longitude: 20,
      },
    })),
  };
});

describe('Como usuario, quiero que en la pantalla aparezca los datos del clima donde me encuentro', () => {
  test('Es posible obtener latitud y longitud distinta a cero sin errores', async () => {
    const { result } = renderHook(() => useLocalizacion());
    const { current } = result;

    expect(current.fueHabilitado()).not.toBeTruthy();

    await waitFor(() => {
      const { current } = result;
      expect(current.fueHabilitado()).toBeTruthy();
    });
  });
});
