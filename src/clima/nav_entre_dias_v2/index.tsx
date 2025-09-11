import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import {
  EnlaceParaDirigirseAlDiaAnterior,
  EnlaceParaDirigirseAlDiaPosterior,
  formatear_fecha,
} from '../nav_entre_dias';
import { Stack } from 'expo-router';

const NavEntreDias = ({
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
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View className="flex w-full flex-row items-center justify-between px-4">
        <EnlaceParaDirigirseAlDiaAnterior fecha={ayer} />
        <View>
          <Text className="text-2xl font-bold">{formatear_fecha(hoy)}</Text>
        </View>
        <EnlaceParaDirigirseAlDiaPosterior fecha={maniana} />
      </View>
    </>
  );
};

export default NavEntreDias;
