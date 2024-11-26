import React, { FC, useCallback, useEffect, useState } from 'react';

/** React Native */
import { StyleSheet, View } from 'react-native';

/** Router */
import { useRouter } from 'expo-router';

/** App Components */
import ThemedText from './common/ThemedText';
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

/** DATA */
import popularData from '@/mocks/product.json';

const PopularProductContent: FC<{ limit?: number }> = ({ limit }) => {
    const current = limit ? popularData.slice(0, limit) : popularData;

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
