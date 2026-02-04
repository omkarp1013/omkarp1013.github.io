import { createSystem, defaultConfig } from '@chakra-ui/react';

const customConfig = {
  ...defaultConfig,
  theme: {
    ...defaultConfig.theme,
    tokens: {
      ...defaultConfig.theme?.tokens,
      colors: {
        ...defaultConfig.theme?.tokens?.colors,
        background: { value: '#ffffff' },
      },
    },
  },
};

const system = createSystem(customConfig);

export default system;
