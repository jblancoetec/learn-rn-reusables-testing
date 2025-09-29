import { useForegroundPermissions, getCurrentPositionAsync } from 'expo-location';
import { useEffect, useState } from 'react';
import { Float } from 'react-native/Libraries/Types/CodegenTypes';

export const usarLocalizacion = () => {
  const [status, requestPermission] = useForegroundPermissions();
  const [posicion, setPosicion] = useState<{ latitud: Float; longitud: Float }>({
    latitud: 0,
    longitud: 0,
  });

  useEffect(() => {
    (async () => {
      const permisos = await requestPermission();
      const posicion_actual = await getCurrentPositionAsync({});
      setPosicion((posicion_previa) =>
        permisos.granted
          ? { latitud: posicion_actual.coords.latitude, longitud: posicion_actual.coords.longitude }
          : { ...posicion_previa }
      );
    })();
  }, [status, posicion]);

  return {
    fueHabilitado: () => status?.granted === true,
    posicion: () => posicion,
  };
};
