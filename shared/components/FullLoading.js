import { View, Text } from "react-native";
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { ActivityIndicator } from "react-native-paper";
import { theme } from "../../constants";

const FullLoading = () => {
  const { fullIsLoading } = useSelector((state) => state.global);
  return (
    <Fragment>
      {fullIsLoading && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(56,56,56,0.8)",
          }}
        >
          <ActivityIndicator
            animating={true}
            color={theme.color.primary400}
            size="large"
          />
        </View>
      )}
    </Fragment>
  );
};

export default FullLoading;
