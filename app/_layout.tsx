import '@/global.css';

import { ProveedorDeTemaClaroOscuro } from '@/src/proveedores';
import { StackPrincipal } from '@/src/stacks';

export { FeedbackFrenteAErrores as ErrorBoundary } from '@/src/feedbacks';

export default function LayoutPrincipal() {

  return (
    <ProveedorDeTemaClaroOscuro>
      <StackPrincipal />
    </ProveedorDeTemaClaroOscuro>
  );
}
