import {ThemeType} from 'primeng/config';
import {definePreset} from '@primeng/themes';
import Nora from '@primeng/themes/aura';

export const LithographeTheme: ThemeType = {
  preset: definePreset(Nora, {})
};

/*
export const LithographeTheme: ThemeType = {
  preset: definePreset(Nora, {
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
      },
      colorScheme: {
        light: {
          surface: {
            0: '#ffffff',
            50: '{stone.50}',
            100: '{stone.100}',
            200: '{stone.200}',
            300: '{stone.300}',
            400: '{stone.400}',
            500: '{stone.500}',
            600: '{stone.600}',
            700: '{stone.700}',
            800: '{stone.800}',
            900: '{stone.900}',
            950: '{stone.950}'
          }
        },
        dark: {
          surface: {
            0: '#ffffff',
            50: '{gray.50}',
            100: '{gray.100}',
            200: '{gray.200}',
            300: '{gray.300}',
            400: '{gray.400}',
            500: '{gray.500}',
            600: '{gray.600}',
            700: '{gray.700}',
            800: '{gray.800}',
            900: '{gray.900}',
            950: '{gray.950}'
          }
        }
      }
    }
  }),
  options: {
    darkModeSelector: false
  }
};
*/

