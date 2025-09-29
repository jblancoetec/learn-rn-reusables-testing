import { PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const cliente_de_datos_climaticos = new QueryClient();

export const ProveedorDeDatosClimaticos = ({ children }: PropsWithChildren) => {
  return <QueryClientProvider client={cliente_de_datos_climaticos}>{children}</QueryClientProvider>;
};
