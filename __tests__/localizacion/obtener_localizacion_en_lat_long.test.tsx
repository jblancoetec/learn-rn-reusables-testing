import { useLocalizacion } from '@/src/localizacion';
import { renderHook, waitFor } from '@testing-library/react-native';

// https://vaskort.medium.com/how-to-unit-test-your-custom-react-hook-with-react-testing-library-and-jest-8bdefafdc8a2

jest.mock('expo-location', () => {
  return {
    useForegroundPermissions: jest.fn(() => [
      {
        granted: true,
      },
      async () => {},
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

    await waitFor(() => {
      expect(result.current.fueHabilitado()).toBeTruthy();
    });
  });
});
