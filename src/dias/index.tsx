import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { View } from 'react-native';

const NavParaDesplazarseEntreDias = ({
  hoy,
  maniana,
  ayer,
}: {
  hoy: Date;
  maniana: Date;
  ayer: Date;
}) => {
  return (
    <View className="flex-row justify-between p-4">
      <View className="flex-row items-center space-x-2">
        <Icon as={ChevronLeft} />
        <Text>{formatear_fecha(ayer)}</Text>
      </View>
      <View>
        <Text className="text-2xl font-bold">{formatear_fecha(hoy)}</Text>
      </View>
      <View className="flex-row items-center space-x-2">
        <Text>{formatear_fecha(maniana)}</Text>
        <Icon as={ChevronRight} />
      </View>
    </View>
  );
};

const formatear_fecha = (fecha: Date) => {
  const fecha_con_formato = fecha.toLocaleDateString('es-AR', {
    year: 'numeric',
    day: '2-digit',
    month: '2-digit',
  });
  return fecha_con_formato.replace(`/${fecha.getFullYear()}`, '');
};

export default NavParaDesplazarseEntreDias;
