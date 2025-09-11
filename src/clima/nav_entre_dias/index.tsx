import { Icon } from '@/components/ui/icon';
import { THEME } from '@/lib/theme';
import { Link, Stack } from 'expo-router';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';

export const NavEntreDias = ({
  hoy,
  ayer,
  maniana,
  variante,
}: {
  hoy: Date;
  ayer: Date;
  maniana: Date;
  variante: 'light' | 'dark';
}) => {
  const opciones_compartidas_entre_ambas_variantes = {
    title: formatear_fecha(hoy),
    name: 'NavEntreDias',
    headerShown: true,
    headerTransparent: true,
    headerShadowVisible: false,
    headerTitleAlign: 'center' as 'center' | 'left',
    headerRight: () => <EnlaceParaDirigirseAlDiaPosterior fecha={maniana} />,
    headerLeft: () => <EnlaceParaDirigirseAlDiaAnterior fecha={ayer} />,
    // headerCenter: () => <Text>{formatear_fecha(hoy)}</Text>,
  };
  const opciones_por_variante = {
    light: {
      ...opciones_compartidas_entre_ambas_variantes,
      headerStyle: { backgroundColor: THEME.light.background },
    },
    dark: {
      ...opciones_compartidas_entre_ambas_variantes,
      headerStyle: { backgroundColor: THEME.dark.background },
    },
  };

  return <Stack.Screen options={opciones_por_variante[variante]} />;
};

export const EnlaceParaDirigirseAlDiaAnterior = ({ fecha }: { fecha: Date }) => {
  const fecha_formateada = formatear_fecha(fecha);
  return (
    <View className="flex-row items-center">
      <Icon as={ChevronLeft} className="size-4" />
      <Link
        href={`../../../app/clima_por_fecha/${fecha.getFullYear()}/${fecha.getMonth() + 1}/${fecha.getDate()}`}>
        {fecha_formateada}
      </Link>
    </View>
  );
};

export const EnlaceParaDirigirseAlDiaPosterior = ({ fecha }: { fecha: Date }) => {
  const fecha_formateada = formatear_fecha(fecha);
  return (
    <View className="flex-row items-center">
      <Link
        href={`../../../app/clima_por_fecha/${fecha.getFullYear()}/${fecha.getMonth() + 1}/${fecha.getDate()}`}>
        {fecha_formateada}
      </Link>
      <Icon as={ChevronRight} className="size-4" />
    </View>
  );
};

export const formatear_fecha = (fecha: Date) => {
  const formatoFecha: Parameters<typeof fecha.toLocaleDateString>[1] = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };
  const formatoAnio = `/${fecha.getFullYear()}`;
  return fecha.toLocaleDateString('es-AR', formatoFecha).replace(formatoAnio, '');
  // .replace(/\//g, '-');
};

export default NavEntreDias;
