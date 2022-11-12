import { View, Text, Pressable, StyleSheet } from "react-native";
import { theme } from "../../constants";

function PrimaryButton({ children, onPress }) {
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
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
}

export default PrimaryButton;

const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 8,
    margin: 4,
    width: "100%",
    overflow: "hidden",
  },
  buttonInnerContainer: {
    elevation: 2,
    backgroundColor: theme.color.primary400,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  buttonText: {
    color: "white",
    fontSize: theme.fontSize.body,
    fontWeight: "500",
    textAlign: "center",
  },
  pressed: {
    opacity: 0.75,
  },
});
