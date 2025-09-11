import '@/global.css';
import ProveedorDeEspacioSeguro from '@/src/proveedores/proveedor_de_espacio_seguro';

import { ProveedorDeTemaClaroOscuro } from '@/src/proveedores/proveedor_de_tema_claro_oscuro';
import { StackPrincipal } from '@/src/stacks';
export { FeedbackFrenteAErrores as ErrorBoundary } from '@/src/feedbacks';

export default function LayoutPrincipal() {
  return (
    <ProveedorDeTemaClaroOscuro>
      <ProveedorDeEspacioSeguro>
        <StackPrincipal />
      </ProveedorDeEspacioSeguro>
    </ProveedorDeTemaClaroOscuro>
  );
}
