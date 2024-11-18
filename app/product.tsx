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
        image: require('@/assets/images/product/product-4.png'),
        price: '$140',
        title: 'Fancy Shirt',
        type: 'Hazy Rose',
    },
    {
        id: 3,
        image: require('@/assets/images/product/product-5.png'),
        price: '$200',
        title: 'Red Cotton Shirt',
        type: 'Hazy Rose',
    },
    {
        id: 4,
        image: require('@/assets/images/product/product-6.png'),
        price: '$300',
        title: 'Byuin T-Shirt',
        type: 'Hazy Rose',
    },
    {
        id: 5,
        image: require('@/assets/images/product/product-7.png'),
        price: '$230',
        title: 'Trucker Jacket',
        type: 'Hazy Rose',
    },
    {
        id: 6,
        image: require('@/assets/images/product/product-8.png'),
        price: '$280',
        title: 'Leather Jacket',
        type: 'Hazy Rose',
    },
];

const getProducts = async () => {
    await wait(500);

    return [];
};

const ProductContent: FC = () => {
    return (
        <FlatList
            contentContainerStyle={{ gap: 20, padding: 20 }}
            data={products}
            keyExtractor={(item) => `Product-${item.id}`}
            numColumns={2}
            renderItem={({ index, item }) => (
                <ProductItem product={item} style={{ flex: 1, marginLeft: index % 2 === 0 ? 0 : 20 }} />
            )}
        />
    );
};

const ProductPage: FC = () => {
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);

        getProducts().then(() => {
            setLoading(false);
        });
    }, []);

    return (
        <Container header={<Header title={"Men's"} />} style={{ paddingHorizontal: 0 }}>
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

export default ProductPage;
