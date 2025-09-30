import { usarApiWeather } from '@/src/clima/hooks/api';
import { usarPronosticoDelClima } from '@/src/clima/hooks/pronostico';
import LayoutParaLaPantallaPrincipalDelClima from '@/src/clima/layouts';
import NavParaDesplazarseEntreDias from '@/src/dias';
import { usarFechas } from '@/src/dias/hooks';
import { usarLocalizacion } from '@/src/localizacion/';
import { View, Text } from 'react-native';
import { api_key_weather } from '@/src/clima/claves';

const PantallaInicialParaElClima = () => {
  const { fechas } = usarFechas();
  const { posicion, fueHabilitado } = usarLocalizacion();
  const { solicitarPronosticoActual } = usarApiWeather({
    latitud: posicion()?.latitud,
    longitud: posicion()?.longitud,
    api_key: api_key_weather,
  });
  const { seEstaDescargando, seDescargoConError, seDescargoConExito, error, pronostico, ciudad } =
    usarPronosticoDelClima({
      fecha: fechas().hoy,
      latitud: posicion()?.latitud,
      longitud: posicion()?.longitud,
      alConectarmeConElServicioMeteorologico: solicitarPronosticoActual,
    });
  return (
    <LayoutParaLaPantallaPrincipalDelClima>
      <NavParaDesplazarseEntreDias {...fechas()} />
      <View>
        {fueHabilitado() ? (
          <Text>
            Latitud: {posicion()?.latitud}, Longitud: {posicion().longitud}
          </Text>
        ) : (
          <Text>Localización no habilitada</Text>
        )}
      </View>
      <View>
        {seEstaDescargando() && <Text>Descargando pronóstico...</Text>}
        {seDescargoConError() && <Text>Error al descargar: {JSON.stringify(error())}</Text>}
        {seDescargoConExito() && (
          <View>
            <Text>{ciudad()}</Text>
            <Text>Temperatura: {pronostico()?.temperatura}°C</Text>
            <Text>Humedad: {pronostico()?.humedad}hbm</Text>
          </View>
        )}
      </View>
    </LayoutParaLaPantallaPrincipalDelClima>
  );
};

export default PantallaInicialParaElClima;
