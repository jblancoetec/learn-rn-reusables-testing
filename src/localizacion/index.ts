import { useForegroundPermissions, getCurrentPositionAsync } from 'expo-location';
import { useEffect, useState } from 'react';
import { Float } from 'react-native/Libraries/Types/CodegenTypes';

export const useLocalizacion = () => {
  const [status, requestPermission] = useForegroundPermissions();
  const [posicion, setPosicion] = useState<{ latitud: Float; longitud: Float }>({
    latitud: 0,
    longitud: 0,
  });

  useEffect(() => {
    (async () => {
      await requestPermission();
      const { coords } = await getCurrentPositionAsync();
      setPosicion((posicion) =>
        status?.granted === true
          ? {
              latitud: coords.latitude,
              longitud: coords.longitude,
            }
          : posicion
      );
    })();
  }, [status]);

  return {
    fueHabilitado: () => status?.granted === true,
    posicion: () => posicion,
  };
};
