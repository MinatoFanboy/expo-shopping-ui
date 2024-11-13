import React, { FC, PropsWithChildren, ReactNode } from 'react';

/** React Native */
import { ScrollView, StyleSheet, View } from 'react-native';

/** Safe Area */
import { useSafeAreaInsets } from 'react-native-safe-area-context';

/** App Components */
import ThemedView from './View';

/** App Colors */
import { GlobalColors } from '@/constants/Colors';

interface ContainerProps {
    header?: ReactNode;
    footer?: ReactNode;
    noScroll?: boolean;
}

const Container: FC<PropsWithChildren<ContainerProps>> = ({ children, footer, header, noScroll = false }) => {
    const { bottom, top } = useSafeAreaInsets();
    const paddingTop = top > 0 ? top : 24;
    const paddingBottom = bottom > 0 ? bottom : 24;

    return (
        <ThemedView
            style={[styles.container, { paddingTop }, noScroll ? { backgroundColor: GlobalColors.white } : undefined]}
        >
            {header}

            {noScroll ? (
                <View style={[styles.container, { paddingBottom, paddingHorizontal: 20 }]}>{children}</View>
            ) : (
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1, paddingBottom, paddingHorizontal: 20 }}
                    style={styles.container}
                >
                    {children}
                </ScrollView>
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
