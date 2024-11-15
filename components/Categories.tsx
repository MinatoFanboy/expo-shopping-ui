import React, { FC, useEffect, useState } from 'react';

/** React Native */
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';

/** Placeholder */
import { Fade, Placeholder, PlaceholderLine } from 'rn-placeholder';

/** App Components */
import ThemedText from './common/Text';

/** App Colors */
import { GlobalColors } from '@/constants/Colors';

/** Hook Theme */
import { useThemeColor } from '@/hooks/useThemeColor';

/** Async */
import { wait } from '@/helpers/common';

const getCategories = async () => {
    await wait(500);

    return [];
};

const CategoriesContent: FC = () => {
    const backgroundColor = useThemeColor({}, 'background2');

    return (
        <FlatList
            contentContainerStyle={{ gap: 12 }}
            data={['All', 'Men', 'Women', 'Kids Wear']}
            horizontal
            keyExtractor={(_, index) => `Category-${index}`}
            renderItem={({ index, item }) => (
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={[
                        styles.categoryItem,
                        { backgroundColor: index === 0 ? GlobalColors.primary : backgroundColor },
                    ]}
                >
                    <ThemedText style={index === 0 ? { color: GlobalColors.white } : undefined} type={'caption'}>
                        {item}
                    </ThemedText>
                </TouchableOpacity>
            )}
            showsHorizontalScrollIndicator={false}
            style={{ flexGrow: 0 }}
        />
    );
};

const CategoriesFallback: FC = () => {
    return (
        <View style={styles.fallback}>
            <View style={{ width: 60 }}>
                <Placeholder Animation={Fade}>
                    <PlaceholderLine noMargin style={[styles.categoryItem, { width: 60 }]} />
                </Placeholder>
            </View>

            <View style={{ width: 60 }}>
                <Placeholder Animation={Fade}>
                    <PlaceholderLine noMargin style={[styles.categoryItem, { width: 60 }]} />
                </Placeholder>
            </View>

            <View style={{ width: 60 }}>
                <Placeholder Animation={Fade}>
                    <PlaceholderLine noMargin style={[styles.categoryItem, { width: 60 }]} />
                </Placeholder>
            </View>

            <View style={{ width: 60 }}>
                <Placeholder Animation={Fade}>
                    <PlaceholderLine noMargin style={[styles.categoryItem, { width: 60 }]} />
                </Placeholder>
            </View>

            <View style={{ width: 60 }}>
                <Placeholder Animation={Fade}>
                    <PlaceholderLine noMargin style={[styles.categoryItem, { width: 60 }]} />
                </Placeholder>
            </View>
        </View>
    );
};

const Categories: FC = () => {
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);

        getCategories().then(() => {
            setLoading(false);
        });
    }, []);

    return (
        <View style={{ gap: 16 }}>
            <ThemedText bold>Top Categories</ThemedText>

            {loading ? <CategoriesFallback /> : <CategoriesContent />}
        </View>
    );
};

const styles = StyleSheet.create({
    categoryItem: {
        alignItems: 'center',
        borderRadius: 16,
        height: 34,
        justifyContent: 'center',
        paddingHorizontal: 18,
    },
    fallback: {
        flexDirection: 'row',
        gap: 12,
    },
});

export default Categories;
