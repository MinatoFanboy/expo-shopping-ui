import React, { FC } from 'react';

/** React Native */
import { View } from 'react-native';

/** App Components */
import Container from '@/components/common/Container';
import Header from '@/components/Header';
import ThemedText from '@/components/common/ThemedText';

/** App Colors */
import { GlobalColors } from '@/constants/Colors';

const PrivacyScreen: FC = () => {
    return (
        <Container header={<Header title={'Privacy Policy'} />} scroll style={{ gap: 28, paddingVertical: 20 }}>
            <View style={{ gap: 12 }}>
                <ThemedText color={'text2'} type={'body2'}>
                    Last update: 05/02/2023
                </ThemedText>
                <ThemedText>
                    Please read these privacy policy, carefully before using our app operated by us.
                </ThemedText>
            </View>

            <View style={{ gap: 12 }}>
                <ThemedText bold style={{ color: GlobalColors.primary }}>
                    Conditions of Uses
                </ThemedText>
                <ThemedText type={'body2'}>
                    There are many variations of passages of Lorem Ipsum available, but the majority have suffered
                    alteration in some form, by injected humour, or randomised words which don't look even slightly
                    believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't
                    anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet
                    tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.
                    It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures,
                    to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free
                    from repetition, injected humour, or non-characteristic words etc.
                </ThemedText>
            </View>
        </Container>
    );
};

export default PrivacyScreen;
