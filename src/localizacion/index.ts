import {
  useForegroundPermissions,
  getCurrentPositionAsync,
  LocationPermissionResponse,
  LocationObject,
} from 'expo-location';
import { useEffect, useState } from 'react';

const usarPermisosEnPrimerPlano = useForegroundPermissions;
const consultaPorPosicionActual = getCurrentPositionAsync;

export const usarLocalizacion = () => {
  const [permisos_actuales, solicitarPermisos] = usarPermisosEnPrimerPlano();
  const [posicion, cambiarPosicion] = useState<{ latitud: number; longitud: number }>({
    latitud: 0,
    longitud: 0,
  });

  useEffect(() => {
    (async () => {
      const permisos = await solicitarPermisosSiEstosNoEstanConcedidos({
        habilitado: permisos_actuales?.granted === true,
        alEstarInhabilitado: solicitarPermisos,
      });
      const posicion_actual = await intentarDeterminarPosicionActual({
        habilitado: permisos.habilitado,
        alEstarHabilitado: consultaPorPosicionActual,
      });
      cambiarPosicion({
        latitud: posicion_actual.latitud,
        longitud: posicion_actual.longitud,
      });
    })();
  }, [permisos_actuales, posicion]);

  return {
    fueHabilitado: () => permisos_actuales?.granted === true,
    posicion: () => posicion,
  };
};

const solicitarPermisosSiEstosNoEstanConcedidos = async ({
  habilitado,
  alEstarInhabilitado: solicitarPermisosApropiados,
}: {
  habilitado: boolean;
  alEstarInhabilitado: () => Promise<LocationPermissionResponse>;
}): Promise<{ habilitado: boolean }> => {
  try {
    if (habilitado) {
      return { habilitado };
    }
    const permisos = await solicitarPermisosApropiados();
    return {
      habilitado: permisos.granted,
    };
  } catch (e) {
    console.error('Error al solicitar permisos de localización:', e);
    throw new Error('No se pudieron obtener los permisos de localización.');
  }
};

const intentarDeterminarPosicionActual = async ({
  habilitado,
  alEstarHabilitado: determinarPosicionActual,
}: {
  habilitado: boolean;
  alEstarHabilitado: () => Promise<LocationObject>;
}): Promise<{ latitud: number; longitud: number }> => {
  const posicion_por_defecto = {
    latitud: 0,
    longitud: 0,
  };
  try {
    if (!habilitado) {
      return posicion_por_defecto;
    }
    const coordenadas = (await determinarPosicionActual()).coords;
    return {
      latitud: coordenadas.latitude,
      longitud: coordenadas.longitude,
    };
  } catch (e) {
    console.error('Error al obtener la posición actual:', e);
    throw new Error('No se pudo obtener la posición actual.');
  }
};
