import React from 'react';
import { TouchableOpacity, Text, StyleSheet, } from 'react-native';

import Colors from '../constants/colors';

type Props = {
    title: string;
    onPress: () => void;
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.primary,
        paddingVertical: 16,
        borderRadius: 14,
        alignItems: 'center',
        width: '100%',
    },

    text: {
        color: Colors.surface,
        fontSize: 16,
        fontWeight: '700',
    },
})

function PrimaryButton({
    title,
    onPress,
}: Props): React.JSX.Element {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    )
}

export default PrimaryButton;