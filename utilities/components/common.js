import { SafeAreaView, StatusBar, View } from "react-native";
import styled from "styled-components";

export const SafeArea = styled(SafeAreaView)`
  flex: 1;
  ${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}px`};
  margin: 16px;
`;

export const Container = styled(View)`
  justify-content: flex-start;
  align-items: center;
  align-self: center;
  flex: 1;
`;

export const Row = styled(View)`
  flex-direction: row;
`;

export const Column = styled(View)`
  flex-direction: column;
`;
