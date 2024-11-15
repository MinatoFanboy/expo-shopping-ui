import React, { FC, useEffect, useState } from 'react';

/** React Native */
import { Dimensions, StyleSheet, View } from 'react-native';
const PRODUCT_WIDTH = (Dimensions.get('window').width - 61) / 2;

/** Placeholder */
import { Fade, Placeholder, PlaceholderLine } from 'rn-placeholder';

/** App Components */
import ThemedText from './common/Text';

/** Product Components */
import ProductItem from './Product';

/** Async */
import { wait } from '@/helpers/common';

const getPopularProducts = async () => {
    await wait(500);

    return [];
};

const products = [
    {
        id: 1,
        image: require('@/assets/images/product/product-1.png'),
        price: '$250',
        title: 'Dennis Lingo',
        type: 'Hazy Rose',
    },
    {
        id: 2,
        image: require('@/assets/images/product/product-3.png'),
        price: '$140',
        title: 'Marks & Spencer',
        type: 'Hazy Rose',
    },
    {
        id: 3,
        image: require('@/assets/images/product/product-2.png'),
        price: '$200',
        title: 'Trucker Jacket',
        type: 'Hazy Rose',
    },
    {
        id: 4,
        image: require('@/assets/images/product/product-9.png'),
        price: '$300',
        title: 'Hooded Jacket',
        type: 'Hazy Rose',
    },
];

const PopularProductContent: FC = () => {
    return (
        <View style={styles.container}>
            {products.map((product) => (
                <ProductItem key={`ProductPopular-${product.id}`} product={product} style={{ width: PRODUCT_WIDTH }} />
            ))}
        </View>
    );
};

const PopularProductFallback: FC = () => {
    return (
        <View style={styles.container}>
            <View style={{ width: PRODUCT_WIDTH }}>
                <Placeholder Animation={Fade}>
                    <PlaceholderLine noMargin style={[styles.productItem, { width: PRODUCT_WIDTH }]} />
                </Placeholder>
            </View>

            <View style={{ width: PRODUCT_WIDTH }}>
                <Placeholder Animation={Fade}>
                    <PlaceholderLine noMargin style={[styles.productItem, { width: PRODUCT_WIDTH }]} />
                </Placeholder>
            </View>

            <View style={{ width: PRODUCT_WIDTH }}>
                <Placeholder Animation={Fade}>
                    <PlaceholderLine noMargin style={[styles.productItem, { width: PRODUCT_WIDTH }]} />
                </Placeholder>
            </View>

            <View style={{ width: PRODUCT_WIDTH }}>
                <Placeholder Animation={Fade}>
                    <PlaceholderLine noMargin style={[styles.productItem, { width: PRODUCT_WIDTH }]} />
                </Placeholder>
            </View>

            <View style={{ width: PRODUCT_WIDTH }}>
                <Placeholder Animation={Fade}>
                    <PlaceholderLine noMargin style={[styles.productItem, { width: PRODUCT_WIDTH }]} />
                </Placeholder>
            </View>
        </View>
    );
};

const PopularProduct: FC = () => {
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);

        getPopularProducts().then(() => {
            setLoading(false);
        });
    }, []);

    return (
        <View style={{ gap: 20 }}>
            <ThemedText bold>Popular Products</ThemedText>

            {loading ? <PopularProductFallback /> : <PopularProductContent />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 20,
    },
    productItem: {
        borderRadius: 10,
        height: 156,
    },
});

export default PopularProduct;
