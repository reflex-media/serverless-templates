import { configure, addParameters, addDecorator } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

addParameters({
  options: {
    isFullscreen: false,
    showAddonsPanel: true,
    showSearchBox: false,
    panelPosition: "bottom",
    sidebarAnimations: false,
    enableShortcuts: true,
  },
});

addDecorator(
  withInfo({
    inline: true,
  })
);

configure(require.context("../stories/", true, /\.stories\.(js|mdx)$/), module);
