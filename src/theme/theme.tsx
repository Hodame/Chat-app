import { ThemeConfig, defineStyleConfig, extendTheme } from '@chakra-ui/react';

const styles = {
  global: {
    body: {
      bg: 'background',
      _dark: {
        bg: 'dark'
      }
    }
  }
};

const colors = {
  colors: {
    background: '#202329',
    dark: '#131313',
    surface: '#2E333D',
    primary: {
      main: '#6b8afd',
      50: '#edf4ff',
      100: '#dfeaff',
      200: '#c5d8ff',
      300: '#a1bcff',
      400: '#6b8afd',
      500: '#5d72f7',
      600: '#3f4aec',
      700: '#3239d0',
      800: '#2b32a8',
      900: '#2a3185'
    }
  }
};

const components = {
  Spinner: defineStyleConfig({
    baseStyle: {
      color: 'primary.400'
    }
  }),
  Button: defineStyleConfig({
    variants: {
      solid: {
        rounded: '3xl',
        background: 'primary.400',
        _hover: {
          background: 'primary.500'
        },
        _active: {
          background: 'primary.400'
        }
      }
    }
  })
};

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

export const theme = extendTheme(
  colors,
  {
    fonts: {
      body: `'Montserrat', sans-serif`
    },
    config,
    styles,
    components
  }
);
