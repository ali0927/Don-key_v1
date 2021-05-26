

interface IDonKeyTheme {
    palette: {
        common: {
            black: string;
            yellow: string;
            lightYellow: string;
            darkYellow: string;
            white: string;
        };
        text: {
            black: string;
            white: string;
            gray: string; 
            lightGray: string;
        };
        disabled: string;
        border: {
            main: string;
            light: string;
        };
        background: {
            yellow: string;
        };
    };
};

export const theme: IDonKeyTheme = {
    palette: {
        common: {
            black: "#000000",
            yellow: "#F4E41C",
            lightYellow: "#F5F290",
            darkYellow: "#F4E41C",
            white: "#ffffff",
        },
        text: {
            black: "#000000",
            gray: "#B4B4B4",
            white: "#ffffff",
            lightGray: "#E2E1E0",
        },
        border: {
            main: "#222222",
            light: "#E2E1E0",
        },
        disabled: "#F2F4F7",
        background: {
            yellow: "#FFF037",
        }

    }
}