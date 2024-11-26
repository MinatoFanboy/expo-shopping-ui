/** Library: react-native-raw-bottom-sheet */
import React, { forwardRef, useImperativeHandle, useState, useRef } from 'react';

/** React Native */
import {
    Animated,
    KeyboardAvoidingView,
    KeyboardAvoidingViewProps,
    Modal,
    ModalProps,
    PanResponder,
    Platform,
    StyleProp,
    StyleSheet,
    View,
    ViewStyle,
} from 'react-native';

/** Blur */
import { BlurView } from 'expo-blur';

/** Hook App Theme */
import { useThemeColor } from '@/hooks/useThemeColor';

interface RBSheetProps {
    /**
     * The height of bottom sheet.
     */
    height?: number;

    /**
     * Duration of the animation when opening bottom sheet.
     */
    openDuration?: number;

    /**
     * Duration of the animation when closing bottom sheet.
     */
    closeDuration?: number;

    /**
     * Press the outside area (mask) to close bottom sheet.
     */
    closeOnPressMask?: boolean;

    /**
     * Press hardware back android to close bottom sheet (Android only).
     */
    closeOnPressBack?: boolean;

    /**
     * Enable the drag-down gesture to close the bottom sheet.
     */
    draggable?: boolean;

    /**
     * The draggable is only worked on the draggable icon.
     * Set this to true if you want to drag on the content as well (doesn't work with ScrollView).
     */
    dragOnContent?: boolean;

    /**
     * Use the native driver to run smoother animation.
     */
    useNativeDriver?: boolean;

    /**
     * Add custom styles to bottom sheet.
     *
     * wrapper: The Root of component (Change the mask's background color here).
     *
     * container: The Container of bottom sheet (The animated view that contains your component).
     *
     * draggableIcon: The style of Draggable Icon (If you set `draggable` to `true`).
     */
    customStyles?: {
        /**
         * The Root of component (Change the mask's background color here).
         */
        wrapper?: StyleProp<ViewStyle>;

        /**
         * The Container of bottom sheet (The animated view that contains your component).
         */
        container?: StyleProp<ViewStyle>;

        /**
         * The style of Draggable Icon (If you set `draggable` to `true`).
         */
        draggableIcon?: StyleProp<ViewStyle>;
    };

    /**
     * Add custom props to modal.
     */
    customModalProps?: ModalProps;

    /**
     * Add custom props to KeyboardAvoidingView.
     */
    customAvoidingViewProps?: KeyboardAvoidingViewProps;

    /**
     * Callback function that will be called after the bottom sheet has been opened.
     */
    onOpen?: () => void;

    /**
     * Callback function that will be called after the bottom sheet has been closed.
     */
    onClose?: () => void;

    /**
     * Your own compoent.
     */
    children?: React.ReactNode;
}

interface RBSheetRef {
    /**
     * The method to open bottom sheet.
     */
    open: () => void;

    /**
     * The method to close bottom sheet.
     */
    close: () => void;
}

const BlurViewAnimated = Animated.createAnimatedComponent(BlurView);

const RBSheet = forwardRef<RBSheetRef, RBSheetProps>((props, ref) => {
    const {
        height = 260,
        openDuration = 300,
        closeDuration = 200,
        closeOnPressMask = true,
        closeOnPressBack = false,
        draggable = false,
        dragOnContent = false,
        useNativeDriver = false,
        customStyles = {},
        customModalProps = {},
        customAvoidingViewProps = {},
        onOpen = null,
        onClose = null,
        children = <View />,
    } = props;

    const [modalVisible, setModalVisible] = useState(false);

    const animatedHeight = useRef(new Animated.Value(0)).current;
    const pan = useRef(new Animated.ValueXY()).current;

    const backgroundColor = useThemeColor({}, 'background1');
    const blurColor = useThemeColor({ dark: 'rgba(231, 153, 85, 0.2)', light: 'rgba(0, 0, 0, 0.07)' }, 'background1');

    useImperativeHandle(ref, () => ({
        open: () => handleSetVisible(true),
        close: () => handleSetVisible(false),
    }));

    const createPanResponder = () => {
        return PanResponder.create({
            onStartShouldSetPanResponder: () => draggable,

            onMoveShouldSetPanResponder: (e, gestureState) => draggable && dragOnContent && gestureState.dy > 0,

            onPanResponderMove: (e, gestureState) => {
                gestureState.dy > 0 && Animated.event([null, { dy: pan.y }], { useNativeDriver })(e, gestureState);
            },

            onPanResponderRelease: (e, gestureState) => {
                if (gestureState.dy > 100) {
                    handleSetVisible(false);
                } else {
                    Animated.spring(pan, {
                        toValue: { x: 0, y: 0 },
                        useNativeDriver,
                    }).start();
                }
            },
        });
    };

    const panResponder = useRef(createPanResponder()).current;

    const handleSetVisible = (visible: boolean) => {
        if (visible) {
            setModalVisible(visible);
            if (typeof onOpen === 'function') {
                onOpen();
            }
            // Animate height on open
            Animated.timing(animatedHeight, {
                duration: openDuration,
                toValue: height,
                useNativeDriver,
            }).start();
        } else {
            Animated.timing(animatedHeight, {
                duration: closeDuration,
                toValue: 0,
                useNativeDriver,
            }).start(() => {
                setModalVisible(visible);
                pan.setValue({ x: 0, y: 0 });
                if (typeof onClose === 'function') {
                    onClose();
                }
            });
        }
    };

    return (
        <Modal
            onRequestClose={closeOnPressBack ? () => handleSetVisible(false) : undefined}
            testID="Modal"
            statusBarTranslucent
            transparent
            visible={modalVisible}
            {...customModalProps}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={[styles.wrapper, customStyles.wrapper]}
                testID="KeyboardAvoidingView"
                {...customAvoidingViewProps}
            >
                <BlurViewAnimated
                    intensity={20}
                    onTouchStart={() => (closeOnPressMask ? handleSetVisible(false) : null)}
                    style={[
                        StyleSheet.absoluteFillObject,
                        {
                            backgroundColor: blurColor,
                            opacity: animatedHeight.interpolate({
                                inputRange: [0, height],
                                outputRange: [0, 1],
                                extrapolate: 'clamp',
                            }),
                        },
                    ]}
                />
                <Animated.View
                    testID="AnimatedView"
                    {...(dragOnContent && panResponder.panHandlers)}
                    style={[
                        styles.container,
                        { transform: pan.getTranslateTransform() },
                        { height: animatedHeight },
                        { backgroundColor },
                        customStyles.container,
                    ]}
                >
                    {draggable && (
                        <View
                            testID="DraggableView"
                            {...(!dragOnContent && panResponder.panHandlers)}
                            style={styles.draggableContainer}
                        >
                            <View style={[styles.draggableIcon, customStyles.draggableIcon]} testID="DraggableIcon" />
                        </View>
                    )}
                    {children}
                </Animated.View>
            </KeyboardAvoidingView>
        </Modal>
    );
});

const styles = StyleSheet.create({
    container: {
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        height: 0,
        overflow: 'hidden',
        width: '100%',
    },
    draggableContainer: {
        alignItems: 'center',
        backgroundColor: 'transparent',
        width: '100%',
    },
    draggableIcon: {
        backgroundColor: '#CCCCCC',
        borderRadius: 5,
        height: 5,
        margin: 10,
        width: 35,
    },
    mask: {
        backgroundColor: 'transparent',
        flex: 1,
    },
    wrapper: {
        flex: 1,
        justifyContent: 'flex-end',
    },
});

export default RBSheet;
