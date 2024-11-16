/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 */

/** Primary */
const primary100 = '#CCE9ED';
const primary200 = '#A2D0D6';
const primary300 = '#76B8C0';
const primary400 = '#71979C';
const primary500 = '#648286';
const primary600 = '#396368';
const primary700 = '#144146';
const primary800 = '#0B3D43';
const primary900 = '#022A2F';

const primary90p = '#667C7E';
const primary80p = '#778A8D';
const primary20p = '#DDE2E2';
const primary10p = '#EEF0F1';
const primary5p = '#F6F8F8';

/** Secondary */
const secondary100 = '#E1F1BC';
const secondary200 = '#CEE993';
const secondary300 = '#BCDE6B';
const secondary400 = '#AFD751';
const secondary500 = '#A3D139';
const secondary600 = '#97BD33';
const secondary700 = '#88A52A';
const secondary800 = '#798D21';
const secondary900 = '#626615';

const secondary90p = '#ACD64D';
const secondary80p = '#B5DA61';
const secondary20p = '#EDF6D7';
const secondary10p = '#F6FAEB';
const secondary5p = '#FAFDF5';

/** Tertiary */
const tertiary100 = '#EEE0FB';
const tertiary200 = '#DCC0F7';
const tertiary300 = '#CBA1F2';
const tertiary400 = '#B981EE';
const tertiary500 = '#A862EA';
const tertiary600 = '#864EBB';
const tertiary700 = '#653B8C';
const tertiary800 = '#43275E';
const tertiary900 = '#22142F';

const tertiary90p = '#B172EC';
const tertiary80p = '#B981EE';
const tertiary20p = '#EEE0FB';
const tertiary10p = '#F6EFFD';
const tertiary5p = '#FBF7FE';

/** Dark */
const dark500 = '#0F1414';
const dark90P = '#272C2C';
const dark80P = '#3F4343';
const dark20P = '#CFD0D0';
const dark10P = '#E7E7E7';
const dark5P = '#F3F3F3';

/** Light */
const light500 = '#D9E1E1';
const light90P = '#DDE4E4';
const light80P = '#E1E7E7';
const light20P = '#F7F9F9';
const light10P = '#FBFCFC';
const light5P = '#FDFDFD';

/** Gray */
const gray500 = '#9F9E9A';
const gray90P = '#A9A8A4';
const gray80P = '#B2B1AE';
const gray20P = '#ECECEB';
const gray10P = '#F5F5F5';
const gray5P = '#FAFAFA';

/** White */
const white500 = '#FFFFFF';
const white90P = '#FEFEFE';
const white80P = '#FDFCFD';
const white20P = '#F5F5F5';
const white10P = '#F4F3F4';
const white5P = '#F4F3F4';

/** Option */
const option1 = '#30BE82';
const option2 = '#30BEB6';
const option3 = '#5D30BE';
const option4 = '#304FBE';

export const GlobalColors = {
    black: dark500,
    error: '#FF7F74',
    gray: gray10P,
    option1,
    option2,
    option3,
    option4,
    primary: primary500,
    primary600: primary600,
    white: white500,
};

export const ThemeColors = {
    dark: {
        background1: dark500,
        background2: '#1D2221',
        background3: '#161D1D',
        border: '#2C302F',
        buttonFocused: dark10P,
        dot: '#515555',
        input: dark90P,
        input1: dark500,
        placeholder: dark20P,
        tabBar: dark80P,
        text1: white500,
        text2: white500,
    },
    light: {
        background1: white500,
        background2: gray10P,
        background3: primary10p,
        border: gray20P,
        buttonFocused: gray10P,
        dot: gray20P,
        input: gray5P,
        input1: gray10P,
        placeholder: dark20P,
        tabBar: white80P,
        text1: dark500,
        text2: gray500,
    },
};
