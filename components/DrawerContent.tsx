import React from 'react';

/** React Native */
import { Appearance, Image, StyleSheet, TouchableOpacity, View } from 'react-native';

/** Safe Area */
import { useSafeAreaInsets } from 'react-native-safe-area-context';

/** Drawer Action */
import { DrawerActions } from '@react-navigation/native';

/** Router */
import { useRouter } from 'expo-router';

/** Drawer */
import { DrawerContentComponentProps } from '@react-navigation/drawer';

/** App Components */
import Icon from './common/Icon';
import Switch from './common/Switch';
import ThemedText from './common/ThemedText';
import ThemedView from './common/ThemedView';

/** App Colors */
import { GlobalColors } from '@/constants/Colors';

/** Hook App Theme */
import { useColorScheme } from '@/hooks/useColorScheme';

const DrawerContent = ({ navigation }: DrawerContentComponentProps) => {
    const colorScheme = useColorScheme();

    const { bottom, top } = useSafeAreaInsets();
    const paddingTop = top > 0 ? top : 24;
    const paddingBottom = bottom > 0 ? bottom : 24;

    const router = useRouter();

    return (
        <View style={[styles.container, { paddingBottom, paddingTop }]}>
            <Image source={require('@/assets/images/logo/logo.png')} resizeMode={'center'} style={styles.avatar} />

            <View style={styles.list}>
                <TouchableOpacity activeOpacity={0.7} style={styles.button}>
                    <Icon color={GlobalColors.primary} name={'profile'} size={22} />

                    <ThemedText style={{ color: GlobalColors.black, flex: 1 }} type={'body2'}>
                        Profile
                    </ThemedText>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.7} style={styles.button}>
                    <Icon color={GlobalColors.primary} name={'location'} size={22} />
                    <ThemedText style={{ color: GlobalColors.black, flex: 1 }} type={'body2'}>
                        Address Book
                    </ThemedText>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.7} style={styles.button}>
                    <Icon color={GlobalColors.primary} name={'card'} size={22} />
                    <ThemedText style={{ color: GlobalColors.black, flex: 1 }} type={'body2'}>
                        My Cards
                    </ThemedText>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.7} style={styles.button}>
                    <Icon color={GlobalColors.primary} name={'setting-1'} size={22} />
                    <ThemedText style={{ color: GlobalColors.black, flex: 1 }} type={'body2'}>
                        Settings
                    </ThemedText>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.7} style={styles.button}>
                    <Icon color={GlobalColors.primary} name={'support'} size={22} />
                    <ThemedText style={{ color: GlobalColors.black, flex: 1 }} type={'body2'}>
                        Contact us
                    </ThemedText>
                </TouchableOpacity>

                <ThemedView background={'background2'} />

                <TouchableOpacity
                    activeOpacity={0.7}
                    hitSlop={6}
                    onPress={() => {
                        navigation.dispatch(DrawerActions.closeDrawer());
                        router.push('/privacy');
                    }}
                >
                    <ThemedText style={{ color: GlobalColors.black }} type={'body2'}>
                        Privacy Policy
                    </ThemedText>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.7} hitSlop={6}>
                    <ThemedText style={{ color: GlobalColors.black }} type={'body2'}>
                        Support & FAQs
                    </ThemedText>
                </TouchableOpacity>
            </View>

            <View style={styles.themeMode}>
                <Icon color={GlobalColors.primary} name={'moon'} size={22} />
                <ThemedText style={{ color: GlobalColors.black, flex: 1 }} type={'body2'}>
                    Dark Mode
                </ThemedText>

                <Switch
                    active={colorScheme === 'dark'}
                    onChange={(value) => Appearance.setColorScheme(value ? 'dark' : 'light')}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    avatar: {
        borderRadius: 999,
        height: 50,
        width: 50,
    },
    button: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: 12,
        height: 48,
        width: '100%',
    },
    container: {
        flex: 1,
        paddingLeft: 20,
    },
    list: {
        flex: 1,
        gap: 12,
        marginTop: 30,
    },
    themeMode: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: 8,
    },
});

export default DrawerContent;
