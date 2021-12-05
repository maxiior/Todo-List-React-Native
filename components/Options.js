import React from "react";
import styled from "styled-components/native";
import { ThemeContext } from "../context";

const Wrapper = styled.View`
  flex-direction: row;
  justify-content: space-around;
`;

const Option = styled.TouchableOpacity`
  padding: 10px;
  width: 120px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme, active }) =>
    !active ? theme.orange : theme.liteOrange};
  border-radius: 10px;
`;

const StyledText = styled.Text`
  color: ${({ theme }) => theme.white};
  text-align: center;
`;

const Options = ({ setOptions, options, tasks, setTasks }) => {
  const context = React.useContext(ThemeContext);

  const deleteTasks = () => {
    for (const e of tasks) {
      if (e.done === 1) {
        context.db.transaction((tx) => {
          tx.executeSql("delete from tasks where id=?;", [e.id]);
        });
      }
    }

    setTasks((tasks) => tasks.filter((e) => e.done === 0));
  };

  return (
    <Wrapper>
      <Option
        onPress={() => setOptions((e) => ({ ...e, sort: !e["sort"] }))}
        active={options.sort}
      >
        <StyledText>Sortuj</StyledText>
      </Option>
      <Option
        onPress={() => setOptions((e) => ({ ...e, hideDone: !e["hideDone"] }))}
        active={options.hideDone}
      >
        <StyledText>Ukryj zrobione</StyledText>
      </Option>
      <Option onPress={() => deleteTasks()}>
        <StyledText>Usuń zaznaczone</StyledText>
      </Option>
    </Wrapper>
  );
};

export default Options;
