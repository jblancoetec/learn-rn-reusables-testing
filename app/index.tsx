import LayoutParaLaPantallaPrincipalDelClima from '@/src/clima/layouts';
import NavEntreDias from '@/src/dias';
import { useFechas } from '@/src/dias/hooks';

const PantallaInicialParaElClima = () => {
  const { fechas } = useFechas();
  return (
    <LayoutParaLaPantallaPrincipalDelClima>
      <NavEntreDias {...fechas()} />
    </LayoutParaLaPantallaPrincipalDelClima>
  );
};

export default PantallaInicialParaElClima;
