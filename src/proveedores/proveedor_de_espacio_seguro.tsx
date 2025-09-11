import { PropsWithChildren } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProveedorDeEspacioSeguro = ({ children }: PropsWithChildren) => {
  return <SafeAreaView className="flex-1">{children}</SafeAreaView>;
};

export default ProveedorDeEspacioSeguro;
