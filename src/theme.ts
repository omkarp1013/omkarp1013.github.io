import { createSystem, defaultConfig } from '@chakra-ui/react';

const customConfig = {
  ...defaultConfig,
  theme: {
    ...defaultConfig.theme,
  },
};

const system = createSystem(customConfig);

export default system;
