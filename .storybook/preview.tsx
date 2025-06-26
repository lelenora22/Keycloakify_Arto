import type { Preview } from "@storybook/react";
import AppThemeProvider from "../src/context/AppTheme"
const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i
            }
        }
    },
    decorators: [
        (Story) => (
            <AppThemeProvider>
                <Story />
            </AppThemeProvider>
        ),
    ],
};

export default preview;
