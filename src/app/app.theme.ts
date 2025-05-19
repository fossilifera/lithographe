import {definePreset} from '@primeng/themes';
import Nora from '@primeng/themes/aura';

export const appTheme = definePreset(Nora, {
  semantic: {
    primary: {
      50: '{amber.50}',
      100: '{amber.100}',
      200: '{amber.200}',
      300: '{amber.300}',
      400: '{amber.400}',
      500: '{amber.500}',
      600: '{amber.600}',
      700: '{amber.700}',
      800: '{amber.800}',
      900: '{amber.900}',
      950: '{amber.950}'
    }
  },
  components: {
    menubar: {
      border: {
        color: '{amber.500}',

      },
      padding: '10px 25px',
      gap: '25px'
    }
  }
});
