import React, { FC, PropsWithChildren, ReactNode } from 'react';

/** React Native */
import { ScrollView, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

/** Safe Area */
import { useSafeAreaInsets } from 'react-native-safe-area-context';

/** Keyboard aware */
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

/** App Components */
import ThemedView from './ThemedView';

/** App Colors */
import { GlobalColors } from '@/constants/Colors';

interface ContainerProps {
    footer?: ReactNode;
    header?: ReactNode;
    keyboard?: boolean;
    scroll?: boolean;
    style?: StyleProp<ViewStyle>;
    white?: boolean;
}

const Container: FC<PropsWithChildren<ContainerProps>> = ({
    children,
    footer,
    header,
    keyboard = false,
    scroll = false,
    style,
    white = false,
}) => {
    const { bottom, top } = useSafeAreaInsets();
    const paddingTop = top > 0 ? top : 24;
    const paddingBottom = bottom > 0 ? bottom : 24;

    return (
        <ThemedView
            style={[
                styles.container,
                { paddingBottom, paddingTop },
                white ? { backgroundColor: GlobalColors.white } : undefined,
            ]}
        >
            {header}

            {scroll ? (
                <>
                    {keyboard ? (
                        <KeyboardAwareScrollView
                            contentContainerStyle={[{ flexGrow: 1, paddingHorizontal: 20 }, style]}
                            showsVerticalScrollIndicator={false}
                            style={styles.container}
                        >
                            {children}
                        </KeyboardAwareScrollView>
                    ) : (
                        <ScrollView
                            contentContainerStyle={[{ flexGrow: 1, paddingHorizontal: 20 }, style]}
                            style={styles.container}
                        >
                            {children}
                        </ScrollView>
                    )}
                </>
            ) : (
                <View style={[styles.container, { paddingHorizontal: 20 }, style]}>{children}</View>
            )}

            {footer}
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Container;
