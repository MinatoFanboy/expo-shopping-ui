import React, { FC, memo } from 'react';

/** React Native */
import { Dimensions, StyleSheet, View } from 'react-native';
const width = Dimensions.get('window').width;

/** Sliders */
import MultiSlider from '@ptomasroos/react-native-multi-slider';

/** App Components */
import ThemedText from './Text';

/** App Colors */
import { GlobalColors } from '@/constants/Colors';

/** Hook Theme */
import { useThemeColor } from '@/hooks/useThemeColor';

interface TwoPointSliderProps {
    max?: number;
    min?: number;
    onValuesChange?: (values: number[]) => void;
    postfix?: string;
    prefix?: string;
    values?: number[];
}

const TwoPointSlider: FC<TwoPointSliderProps> = ({ max, min, onValuesChange, postfix, prefix, values }) => {
    const markerColor = useThemeColor({}, 'background1');
    const backgroundColor = useThemeColor({}, 'background2');

    return (
        <MultiSlider
            customMarker={(e) => {
                return (
                    <View style={{ alignItems: 'center', gap: 4 }}>
                        <View style={[{ backgroundColor: markerColor }, styles.marker]} />

                        <ThemedText type={'body2'}>
                            {prefix}
                            {e.currentValue} {postfix}
                        </ThemedText>
                    </View>
                );
            }}
            markerOffsetY={15}
            max={max}
            min={min}
            onValuesChange={onValuesChange}
            selectedStyle={{ backgroundColor: GlobalColors.primary, height: 4 }}
            step={10}
            sliderLength={width - 40}
            trackStyle={{ backgroundColor, borderRadius: 2, height: 4 }}
            values={values}
        />
    );
};

const styles = StyleSheet.create({
    marker: {
        borderRadius: 999,
        height: 24,
        elevation: 8,
        shadowColor: GlobalColors.black,
        shadowOffset: {
            height: 8,
            width: 0,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        width: 24,
    },
});

export default memo(TwoPointSlider);
