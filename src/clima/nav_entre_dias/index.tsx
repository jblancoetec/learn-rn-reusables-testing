import { Icon } from '@/components/ui/icon';
import { THEME } from '@/lib/theme';
import { Link, Stack } from 'expo-router';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { View } from 'react-native';

export default function NavEntreDias() {
  const { colorScheme } = useColorScheme();
  const { hoy, ayer, maniana } = generarFechasDeAyerHoyYManianaConFormato();
  const opciones = {
    light: {
      title: hoy,
      headerShown: true,
      headerTransparent: true,
      headerShadowVisible: false,
      headerStyle: { backgroundColor: THEME.light.background },
      headerTitleAlign: 'center',
      headerRight: () => <EnlaceParaDirigirseAlDiaPosterior fecha={maniana} />,
      headerLeft: () => <EnlaceParaDirigirseAlDiaAnterior fecha={ayer} />,
    },
    dark: {
      title: hoy,
      headerShown: true,
      headerTransparent: true,
      headerShadowVisible: false,
      headerStyle: { backgroundColor: THEME.dark.background },
      headerTitleAlign: 'center',
      headerRight: () => <EnlaceParaDirigirseAlDiaPosterior fecha={maniana} />,
      headerLeft: () => <EnlaceParaDirigirseAlDiaAnterior fecha={ayer} />,
    },
  };

  return (
    <>
      <Stack.Screen options={opciones[colorScheme ?? 'light']} />
    </>
  );
}

const EnlaceParaDirigirseAlDiaAnterior = ({ fecha }: { fecha: string }) => {
  return (
    <View className="flex-row items-center">
      <Icon as={ChevronLeft} className="size-4" />
      <Link href={`//clima_por_fecha/${fecha}`}>{fecha}</Link>
    </View>
  );
};

const EnlaceParaDirigirseAlDiaPosterior = ({ fecha }: { fecha: string }) => {
  return (
    <View className="flex-row items-center">
      <Link href={`//clima_por_fecha/${fecha}`}>{fecha}</Link>
      <Icon as={ChevronRight} className="size-4" />
    </View>
  );
};
const generarFechasDeAyerHoyYManianaConFormato = (): {
  ayer: string;
  hoy: string;
  maniana: string;
} => {
  const formatoFecha: Parameters<typeof fechaActual.toLocaleDateString>[1] = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };
  const fechaActual = new Date();
  const fechaDeAyer = new Date(fechaActual);
  fechaDeAyer.setDate(fechaActual.getDate() - 1);
  const fechaDeManiana = new Date(fechaActual);
  fechaDeManiana.setDate(fechaActual.getDate() + 1);
  const formatoAnio = `/${fechaActual.getFullYear()}`;

  const fechas = {
    hoy: fechaActual.toLocaleDateString('es-AR', formatoFecha).replace(formatoAnio, ''),
    ayer: fechaDeAyer.toLocaleDateString('es-AR', formatoFecha).replace(formatoAnio, ''),
    maniana: fechaDeManiana.toLocaleDateString('es-AR', formatoFecha).replace(formatoAnio, ''),
  };
  return fechas;
};
