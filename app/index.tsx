import LayoutParaLaPantallaPrincipalDelClima from '@/src/clima/layouts';
import NavParaDesplazarseEntreDias from '@/src/dias';
import { useFechas } from '@/src/dias/hooks';

const PantallaInicialParaElClima = () => {
  const { fechas } = useFechas();
  return (
    <LayoutParaLaPantallaPrincipalDelClima>
      <NavParaDesplazarseEntreDias {...fechas()} />
    </LayoutParaLaPantallaPrincipalDelClima>
  );
};

export default PantallaInicialParaElClima;
