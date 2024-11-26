import { GestureHandlerRootView } from 'react-native-gesture-handler';

/** React Native */
import { StyleSheet } from 'react-native';

/** Router */
import { Drawer } from 'expo-router/drawer';

/** Drawer Component */
import DrawerContent from '@/components/DrawerContent';

/** App Colors */
import { GlobalColors } from '@/constants/Colors';

export default function DrawerLayout() {
    return (
        <GestureHandlerRootView style={styles.container}>
            <Drawer
                drawerContent={DrawerContent}
                screenOptions={{
                    drawerStyle: { backgroundColor: 'transparent', flex: 1, width: '40%', zIndex: 1 },
                    drawerType: 'slide',
                    headerShown: false,
                    overlayColor: 'transparent',
                    sceneStyle: {
                        backgroundColor: 'transparent',
                    },
                }}
            >
                <Drawer.Screen name="(tabs)" />
            </Drawer>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: GlobalColors.primary10p,
        flex: 1,
    },
});
