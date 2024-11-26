import React, { FC, useEffect, useState } from 'react';

/** React Native */
import { FlatList, View } from 'react-native';

/** App Components */
import Container from '@/components/common/Container';

import Header from '@/components/Header';
import ProductItem from '@/components/Product';
import { ProductSkeleton } from '@/components/Skeleton';

/** Async */
import { wait } from '@/helpers/common';

/** DATA */
import productData from '@/mocks/product.json';

const getProducts = async () => {
    await wait(500);

    return [];
};

const ProductContent: FC = () => {
    return (
        <FlatList
            contentContainerStyle={{ gap: 20, padding: 20 }}
            data={productData}
            keyExtractor={(item) => `Product-${item.id}`}
            numColumns={2}
            renderItem={({ index, item }) => (
                <ProductItem product={item} style={{ flex: 1, marginLeft: index % 2 === 0 ? 0 : 20 }} />
            )}
        />
    );
};

const FavoriteScreen: FC = () => {
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);

        getProducts().then(() => {
            setLoading(false);
        });
    }, []);

    return (
        <Container header={<Header title={'Favorite'} />} style={{ paddingHorizontal: 0 }}>
            {loading ? (
                <View style={{ padding: 20 }}>
                    <ProductSkeleton />
                </View>
            ) : (
                <ProductContent />
            )}
        </Container>
    );
};

export default FavoriteScreen;
