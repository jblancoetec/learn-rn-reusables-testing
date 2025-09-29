import LayoutParaLaPantallaPrincipalDelClima from '@/src/clima/layouts';
import NavParaDesplazarseEntreDias from '@/src/dias';
import { usarFechas } from '@/src/dias/hooks';
import { usarLocalizacion } from '@/src/localizacion/';
import { View, Text } from 'react-native';

const PantallaInicialParaElClima = () => {
  const { fechas } = usarFechas();
  const { posicion, fueHabilitado } = usarLocalizacion();
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
    </LayoutParaLaPantallaPrincipalDelClima>
  );
};

export default PantallaInicialParaElClima;
