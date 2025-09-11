// jest.mock('expo-router');
// import { render } from '@testing-library/react-native';
import { renderRouter, screen } from 'expo-router/testing-library';

import { NavEntreDias } from '@/src/clima/nav_entre_dias';
import { ProveedorDeTemaClaroOscuro } from '@/src/proveedores/proveedor_de_tema_claro_oscuro';
import { Stack } from 'expo-router';

describe('Yo como usuario, deseo ver la fecha para saber de que dia tratan los datos clima', () => {
  test('Puedo ver la fecha actual como titulo', () => {
    const actual = new Date('september 11, 2025');
    const maniana = new Date('september 12, 2025');
    const ayer = new Date('september 10, 2025');
    renderRouter(
      {
        _layout: () => <Stack />,
        index: () => <NavEntreDias hoy={actual} ayer={ayer} maniana={maniana} variante={'light'} />,
      },
      { initialUrl: '/' }
    );

    expect(screen.getByText('10/09')).toBeOnTheScreen();
    expect(screen.getByText('12/09')).toBeOnTheScreen();
  });
});
