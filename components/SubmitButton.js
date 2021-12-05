import React from "react";
import styled from "styled-components/native";

const Wrapper = styled.TouchableOpacity`
  margin-top: 10px;
  width: 100%;
  background-color: ${({ theme }) => theme.red};
  border-radius: 10px;
`;

const StyledText = styled.Text`
  color: ${({ theme }) => theme.white};
  font-size: 14px;
  padding: 15px 0;
  text-align: center;
`;

const SubmitButton = ({ submitHandler, value }) => {
  return (
    <Wrapper onPress={() => submitHandler()}>
      <StyledText>{value}</StyledText>
    </Wrapper>
  );
};

export default SubmitButton;
