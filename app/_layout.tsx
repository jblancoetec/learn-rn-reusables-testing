import '@/global.css';

import ProveedorDeTemaClaroOscuro from '@/src/tema_claro_oscuro';
import StackPrincipal from '@/src/stacks';
import { PortalHost } from '@rn-primitives/portal';
import { ProveedorDeDatosClimaticos } from '@/src/clima/proveedores';
export { FeedbackDeErrorPorDefecto as ErrorBoundary } from '@/src/feedbacks';

export default function RootLayout() {
  return (
    <ProveedorDeTemaClaroOscuro>
      <ProveedorDeDatosClimaticos>
        <StackPrincipal />
        <PortalHost />
      </ProveedorDeDatosClimaticos>
    </ProveedorDeTemaClaroOscuro>
  );
}
