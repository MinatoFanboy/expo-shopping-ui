import React, { FC } from 'react';

/** React Native */
import { StyleSheet, View } from 'react-native';

/** Placeholder */
import { Fade, Placeholder, PlaceholderLine } from 'rn-placeholder';

/** Constants */
import { dimension } from '@/constants/Constants';

export const ProductSkeleton: FC = () => {
    return (
        <View style={styles.container}>
            {[...new Array(6)].map((_, index) => (
                <View key={`ProductSkeleton-${index}`} style={{ width: dimension.PRODUCT_WIDTH }}>
                    <Placeholder Animation={Fade}>
                        <PlaceholderLine noMargin style={[styles.productItem, { width: dimension.PRODUCT_WIDTH }]} />
                    </Placeholder>
                </View>
            ))}
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
