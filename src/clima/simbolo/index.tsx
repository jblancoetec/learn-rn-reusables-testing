import { Icon } from '@/components/ui/icon';
import { ChevronLeft, ChevronRight, Cloud, CloudDrizzle, Sun } from 'lucide-react-native';

const SIMBOLOS = {
  lluvioso: CloudDrizzle,
  soleado: Sun,
  nublado: Cloud,
};

export const SimboloParaCadaTipoDeClima = ({
  clima,
}: {
  clima: 'lluvioso' | 'soleado' | 'nublado';
}) => {
  return <Icon size={128 + 64} as={SIMBOLOS[clima]} />;
};
