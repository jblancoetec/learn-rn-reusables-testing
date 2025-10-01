import LayoutParaLaPantallaPrincipalDelClima from '@/src/clima/layouts';
import NavParaDesplazarseEntreDias from '@/src/dias';
import { usarFechas } from '@/src/dias/hooks';
import usarLocalizacion from '@/src/localizacion';
import { View, Text } from 'react-native';

const PantallaInicialParaElClima = () => {
  const { fechas } = usarFechas();
  const { coordenadas, coordenadasComoTexto, coordenadasDisponibles } = usarLocalizacion();

  return (
    <LayoutParaLaPantallaPrincipalDelClima>
      <NavParaDesplazarseEntreDias {...fechas()} />
      <View>
        {coordenadasDisponibles() && (
          <Text className="text-6xl">Coordenadas: {coordenadasComoTexto()}</Text>
        )}
      </View>
    </LayoutParaLaPantallaPrincipalDelClima>
  );
};

export default PantallaInicialParaElClima;
