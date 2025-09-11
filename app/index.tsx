import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { useTema } from '@/hooks';
import { TituloParaElNombreDeLaCiudad } from '@/src/clima/ciudad';
import NavEntreDias from '@/src/clima/nav_entre_dias';
import { useFechas } from '@/src/clima/nav_entre_dias/hooks';
import { SimboloParaCadaTipoDeClima } from '@/src/clima/simbolo';
import { Link } from 'expo-router';
import { StarIcon } from 'lucide-react-native';
import { View } from 'react-native';

export default function Screen() {
  const { modo } = useTema();
  const { fechas } = useFechas();

  return (
    <>
      <NavEntreDias {...fechas()} variante={modo()} />
      <View className="flex-1 items-center justify-center gap-8 p-4">
        <TituloParaElNombreDeLaCiudad ciudad="Tokio" />
        <SimboloParaCadaTipoDeClima clima="lluvioso" />
        <View className="gap-2 p-4">
          <Text className="ios:text-foreground font-mono text-sm text-muted-foreground">
            1. Edit <Text variant="code">app/index.tsx</Text> to get started.
          </Text>
          <Text className="ios:text-foreground font-mono text-sm text-muted-foreground">
            2. Save to see your changes instantly.
          </Text>
        </View>
        <View className="flex-row gap-2">
          <Link href="https://reactnativereusables.com" asChild>
            <Button>
              <Text>Browse the Docs</Text>
            </Button>
          </Link>
          <Link href="https://github.com/founded-labs/react-native-reusables" asChild>
            <Button variant="ghost">
              <Text>Star the Repo</Text>
              <Icon as={StarIcon} />
            </Button>
          </Link>
        </View>
      </View>
    </>
  );
}
