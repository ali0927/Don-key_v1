

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
    mediaQueries: {
        sm: {
            up: string;
        }
        md: {
            up: string;
        };
        lg: {
            up: string;
        }
    }
};

export const theme: IDonKeyTheme = {
    palette: {
        common: {
            black: "#000000",
            yellow: "#F4E41C",
            lightYellow: "#ffec5c",
            darkYellow: "#F5F290",
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

    },
    mediaQueries: {
        sm: {
            up: `@media (min-width: 576px)`
        },
        md: {
            up: `@media (min-width: 768px)`
        },
        lg: {
            up:'@media (min-width: 992px)'
        }
    }
}