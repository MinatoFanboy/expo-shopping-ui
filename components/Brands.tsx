import React, { FC, useEffect, useState } from 'react';

/** React Native */
import { FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native';

/** Placeholder */
import { Fade, Placeholder, PlaceholderLine } from 'rn-placeholder';

/** App Components */
import ThemedText from './common/ThemedText';

/** Hook App Theme */
import { useThemeColor } from '@/hooks/useThemeColor';

/** Async */
import { wait } from '@/helpers/common';

const getBrands = async () => {
    await wait(500);

    return [];
};

const BrandsContent: FC = () => {
    const backgroundColor = useThemeColor({}, 'background2');

    return (
        <FlatList
            contentContainerStyle={{ gap: 16 }}
            data={[
                require('@/assets/images/logo/zara.png'),
                require('@/assets/images/logo/gucci.png'),
                require('@/assets/images/logo/h&m.png'),
                require('@/assets/images/logo/nike.png'),
            ]}
            horizontal
            keyExtractor={(_, index) => `Brand-${index}`}
            renderItem={({ item }) => (
                <TouchableOpacity activeOpacity={0.7} style={[styles.brandItem, { backgroundColor: backgroundColor }]}>
                    <Image resizeMode={'contain'} source={item} style={styles.logo} />
                </TouchableOpacity>
            )}
            showsHorizontalScrollIndicator={false}
            style={{ flexGrow: 0 }}
        />
    );
};

const BrandsFallback: FC = () => {
    return (
        <View style={styles.fallback}>
            {[...new Array(5)].map((_, index) => (
                <View key={`Brand-${index}`} style={{ width: 72 }}>
                    <Placeholder Animation={Fade}>
                        <PlaceholderLine noMargin style={styles.brandItem} />
                    </Placeholder>
                </View>
            ))}
        </View>
    );
};

const Brands: FC = () => {
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);

        getBrands().then(() => {
            setLoading(false);
        });
    }, []);

    return (
        <View style={{ gap: 16 }}>
            <ThemedText bold>Top Brands</ThemedText>

            {loading ? <BrandsFallback /> : <BrandsContent />}
        </View>
    );
};

const styles = StyleSheet.create({
    brandItem: {
        alignItems: 'center',
        borderRadius: 999,
        height: 72,
        justifyContent: 'center',
        width: 72,
    },
    fallback: {
        flexDirection: 'row',
        gap: 16,
    },
    logo: {
        height: 44,
        width: 44,
    },
});

export default Brands;
