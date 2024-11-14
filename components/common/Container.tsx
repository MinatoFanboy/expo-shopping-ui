import React, { FC, PropsWithChildren, ReactNode } from 'react';

/** React Native */
import { ScrollView, StyleSheet, View } from 'react-native';

/** Safe Area */
import { useSafeAreaInsets } from 'react-native-safe-area-context';

/** Keyboard aware */
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

/** App Components */
import ThemedView from './View';

/** App Colors */
import { GlobalColors } from '@/constants/Colors';

interface ContainerProps {
    footer?: ReactNode;
    header?: ReactNode;
    keyboard?: boolean;
    scroll?: boolean;
}

const Container: FC<PropsWithChildren<ContainerProps>> = ({
    children,
    footer,
    header,
    keyboard = false,
    scroll = false,
}) => {
    const { bottom, top } = useSafeAreaInsets();
    const paddingTop = top > 0 ? top : 24;
    const paddingBottom = bottom > 0 ? bottom : 24;

    return (
        <ThemedView
            style={[
                styles.container,
                { paddingTop },
                keyboard || scroll ? { backgroundColor: GlobalColors.white } : undefined,
            ]}
        >
            {header}

            {scroll ? (
                <>
                    {keyboard ? (
                        <KeyboardAwareScrollView
                            contentContainerStyle={{ flexGrow: 1, paddingBottom, paddingHorizontal: 20 }}
                            showsVerticalScrollIndicator={false}
                            style={styles.container}
                        >
                            {children}
                        </KeyboardAwareScrollView>
                    ) : (
                        <ScrollView
                            contentContainerStyle={{ flexGrow: 1, paddingBottom, paddingHorizontal: 20 }}
                            style={styles.container}
                        >
                            {children}
                        </ScrollView>
                    )}
                </>
            ) : (
                <View style={[styles.container, { paddingBottom, paddingHorizontal: 20 }]}>{children}</View>
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
