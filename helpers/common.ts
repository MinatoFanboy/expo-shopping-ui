import { Dimensions } from 'react-native';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

export const validateEmail = (email: string) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
};

export const validatePhone = (phone: string) => {
    return phone.length === 14;
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
