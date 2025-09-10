import { Text } from '@/components/ui/text';
export const TituloParaElNombreDeLaCiudad = ({ ciudad }: { ciudad: string }) => {
  return (
    <Text variant="h1" className="text-black">
      {ciudad.toUpperCase()}
    </Text>
  );
};
