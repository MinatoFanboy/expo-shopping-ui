import { Dimensions } from 'react-native';
const { height, width } = Dimensions.get('window');

interface ImageMap {
    [key: string]: any;
}

export const dimension = { HEIGHT: height, PRODUCT_WIDTH: (width - 61) / 2, WIDTH: width };

export const imageMap: ImageMap = {
    avatar2: require('@/assets/images/avatar/avatar-2.jpg'),
    avatar3: require('@/assets/images/avatar/avatar-3.jpg'),
    avatar4: require('@/assets/images/avatar/avatar-4.jpg'),
    product1: require('@/assets/images/product/product-1.png'),
    product2: require('@/assets/images/product/product-2.png'),
    product3: require('@/assets/images/product/product-3.png'),
    product4: require('@/assets/images/product/product-4.png'),
    product5: require('@/assets/images/product/product-5.png'),
    product6: require('@/assets/images/product/product-6.png'),
    product7: require('@/assets/images/product/product-7.png'),
    product8: require('@/assets/images/product/product-8.png'),
    product9: require('@/assets/images/product/product-9.png'),
    review1: require('@/assets/images/review/review-1.jpg'),
    review2: require('@/assets/images/review/review-2.jpg'),
    review3: require('@/assets/images/review/review-3.jpg'),
    review4: require('@/assets/images/review/review-4.jpg'),
    review5: require('@/assets/images/review/review-5.jpg'),
};
