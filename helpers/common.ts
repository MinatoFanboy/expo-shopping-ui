import { Dimensions } from 'react-native';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

export const validateEmail = (email: string) => {
    const regex =
        /^(?:[a-zA-Z0-9!'#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!'#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?|(?:\\d{1,3}\\.){3}\\d{1,3}|\\[?[a-fA-F0-9]*\\:?([a-fA-F0-9]{1,4}){0,7}\\]?)$/;
    return regex.test(email);
};

export const validatePhone = (phone: string) => {
    return phone.length === 10;
};

export const hp = (percentage: number) => {
    return (percentage * deviceHeight) / 100;
};

export const wp = (percentage: number) => {
    return (percentage * deviceWidth) / 100;
};

export const wait = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};
