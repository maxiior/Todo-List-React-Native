import React from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";

const Wrapper = styled.TouchableOpacity`
  width: 80px;
  height: 80px;
  flex: 1;
  border-radius: 50px;
  background-color: ${({ theme }) => theme.red};
  position: absolute;
  right: 20px;
  bottom: 20px;
  justify-content: center;
  align-items: center;
`;

const StyledIonicons = styled(Ionicons)`
  color: ${({ theme }) => theme.white};
  font-size: 50px;
  padding-left: 4px;
`;

const AddingButton = ({ pressHandler }) => {
  return (
    <Wrapper onPress={() => pressHandler()}>
      <StyledIonicons name="add" />
    </Wrapper>
  );
};

export default AddingButton;
