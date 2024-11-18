import React, { FC, useCallback, useEffect, useState } from 'react';

/** React Native */
import { StyleSheet, View } from 'react-native';

/** Router */
import { useRouter } from 'expo-router';

/** App Components */
import ThemedText from './common/Text';
import TextButton from './common/TextButton';

/** Product Components */
import ProductItem from './Product';
import { ProductSkeleton } from './Skeleton';

/** Async */
import { wait } from '@/helpers/common';

/** Constants */
import { dimension } from '@/constants/Constants';

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

const PopularProductContent: FC<{ limit?: number }> = ({ limit }) => {
    const current = limit ? products.slice(0, limit) : products;

    return (
        <View style={styles.container}>
            {current.map((product) => (
                <ProductItem
                    key={`ProductPopular-${product.id}`}
                    product={product}
                    style={{ width: dimension.PRODUCT_WIDTH }}
                />
            ))}
        </View>
    );
};

const PopularProduct: FC<{ limit?: number }> = ({ limit }) => {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);

    const showAll = useCallback(() => {
        router.push('/product');
    }, []);

    useEffect(() => {
        setLoading(true);

        getPopularProducts().then(() => {
            setLoading(false);
        });
    }, []);

    return (
        <View style={{ gap: 20 }}>
            <View style={styles.label}>
                <ThemedText bold>Popular Products</ThemedText>

                <TextButton hitSlop={8} onPress={showAll} title={'View all'} />
            </View>

            {loading ? <ProductSkeleton /> : <PopularProductContent limit={limit} />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 20,
    },
    label: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    productItem: {
        borderRadius: 10,
        height: 156,
    },
});

export default PopularProduct;
