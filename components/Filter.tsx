import React, { FC, memo, useCallback, useRef } from 'react';

/** React Native */
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
const height = Dimensions.get('window').height;

/** App Components */
import Button from './common/Button';
import Icon from './common/Icon';
import RBSheet from './common/BottomSheet';
import ThemedText from './common/Text';
import TwoPointSlider from './common/TwoPointSlider';

/** App Colors */
import { GlobalColors } from '@/constants/Colors';

/** Hook Theme */
import { useThemeColor } from '@/hooks/useThemeColor';

const categories = ['All', "Men's", "Women's", "Kid's"];
const colors = [GlobalColors.option3, GlobalColors.black, GlobalColors.option4, GlobalColors.option1];
const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

const Filter: FC = () => {
    const backgroundColor = useThemeColor({}, 'background2');
    const backgroundSelectedColor = useThemeColor({}, 'background3');

    const ref = useRef<any>(null);

    const handleOpenSheet = useCallback(() => {
        if (ref.current) {
            ref.current.open();
        }
    }, []);

    return (
        <>
            <Button
                icon={<Icon color={'white'} name={'setting-1'} size={24} />}
                onPress={handleOpenSheet}
                style={styles.filter}
            />

            <RBSheet draggable ref={ref} height={height * 0.8} openDuration={250} useNativeDriver={false}>
                <View style={styles.container}>
                    <ThemedText bold type={'body1'}>
                        Filter
                    </ThemedText>

                    {/** Category */}
                    <View style={styles.group}>
                        {/** Label */}
                        <ThemedText bold>Category</ThemedText>

                        {/** List */}
                        <View style={styles.list}>
                            {categories.map((category, index) => (
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    key={`Category-${index}`}
                                    style={[
                                        styles.categoryItem,
                                        { backgroundColor: index === 0 ? backgroundSelectedColor : backgroundColor },
                                    ]}
                                >
                                    {index === 0 && (
                                        <Icon color={GlobalColors.primary} name={'tick-circle'} size={18} />
                                    )}

                                    <ThemedText
                                        style={index === 0 ? { color: GlobalColors.primary } : undefined}
                                        type={'body2'}
                                    >
                                        {category}
                                    </ThemedText>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/** Separate */}
                        <View style={[styles.separate, { backgroundColor }]} />
                    </View>

                    {/** Color */}
                    <View style={styles.group}>
                        {/** Label */}
                        <ThemedText bold>Color</ThemedText>

                        {/** List */}
                        <View style={styles.list}>
                            {colors.map((color, index) => (
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    key={`Color-${index}`}
                                    style={[styles.colorItem, { backgroundColor: color }]}
                                />
                            ))}
                        </View>

                        {/** Separate */}
                        <View style={[styles.separate, { backgroundColor }]} />
                    </View>

                    {/** Size */}
                    <View style={styles.group}>
                        {/** Label */}
                        <ThemedText bold>Size</ThemedText>

                        {/** List */}
                        <View style={styles.list}>
                            {sizes.map((size, index) => (
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    key={`Size-${index}`}
                                    style={[
                                        styles.categoryItem,
                                        { backgroundColor: index === 0 ? backgroundSelectedColor : backgroundColor },
                                    ]}
                                >
                                    {index === 0 && (
                                        <Icon color={GlobalColors.primary} name={'tick-circle'} size={18} />
                                    )}

                                    <ThemedText
                                        style={index === 0 ? { color: GlobalColors.primary } : undefined}
                                        type={'body2'}
                                    >
                                        {size}
                                    </ThemedText>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/** Separate */}
                        <View style={[styles.separate, { backgroundColor }]} />
                    </View>

                    {/** Price Range */}
                    <View style={styles.groupPrice}>
                        {/** Label */}
                        <ThemedText bold>Price Range</ThemedText>

                        <TwoPointSlider max={1500} min={0} prefix={'$'} values={[100, 1200]} />
                    </View>

                    <View style={{ marginTop: 30 }}>
                        <Button title={'Apply'} />
                    </View>
                </View>
            </RBSheet>
        </>
    );
};

const styles = StyleSheet.create({
    group: {
        gap: 15,
    },
    groupPrice: {
        gap: 8,
    },
    categoryItem: {
        alignItems: 'center',
        borderRadius: 999,
        flexDirection: 'row',
        gap: 13,
        padding: 10,
    },
    colorItem: {
        borderRadius: 999,
        height: 30,
        width: 30,
    },
    list: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    container: {
        flex: 1,
        gap: 20,
        paddingHorizontal: 20,
    },
    filter: {
        borderRadius: 12,
        width: 56,
    },
    separate: {
        height: 1,
    },
});

export default memo(Filter);
