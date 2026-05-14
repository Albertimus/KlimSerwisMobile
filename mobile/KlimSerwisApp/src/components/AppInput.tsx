import React from 'react';
import { StyleSheet, TextInput, TextInputProps, View, Text, } from 'react-native';

import Colors from '../constants/colors';

type Props = TextInputProps & {label: string;};

function AppInput({ label, ...props}: Props): React.JSX.Element {
    return (
        <View style={styles.wrapper}>
            <Text style={styles.label}>{label}</Text>
            <TextInput style={styles.input}
            placeholderTextColor={Colors.textSecondary}
            {...props}/>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: 18,
    },
    label: {
        marginBottom: 8,
        fontSize: 14,
        fontWeight: '600',
        color: Colors.textPrimary,
    },
    input: {
        height: 52,
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: 14,
        paddingHorizontal: 16,
        backgroundColor: Colors.surface,
        color: Colors.textPrimary,
        fontSize: 15,
    },

});

export default AppInput;