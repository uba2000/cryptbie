import { View, Text, Pressable, StyleSheet } from "react-native";
import { theme } from "../../constants";

export function PrimaryButton({ children, onPress }) {
  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable
        style={({ pressed }) =>
          pressed
            ? [
                styles.buttonInnerContainer,
                { backgroundColor: theme.color.primary400 },
                styles.pressed,
              ]
            : [
                styles.buttonInnerContainer,
                { backgroundColor: theme.color.primary400 },
              ]
        }
        onPress={onPress}
        android_ripple={{ color: theme.color.secondary }}
      >
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
}

export function OutlineButton({ children, onPress }) {
  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable
        style={({ pressed }) =>
          pressed
            ? [styles.buttonInnerContainer, styles.pressed]
            : styles.buttonInnerContainer
        }
        onPress={onPress}
        android_ripple={{ color: theme.color.secondary }}
      >
        <Text style={[styles.buttonText, { color: theme.color.primary400 }]}>
          {children}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 8,
    margin: 4,
    flex: 1,
    overflow: "hidden",
    borderColor: theme.color.primary400,
    borderWidth: 1,
  },
  buttonInnerContainer: {
    elevation: 2,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  buttonText: {
    color: "white",
    fontSize: theme.fontSize.body,
    fontFamily: "archivo-regular500",
    textAlign: "center",
  },
  pressed: {
    opacity: 0.75,
  },
});
