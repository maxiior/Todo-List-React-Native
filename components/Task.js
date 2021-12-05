import React from "react";
import styled from "styled-components/native";
import { CheckBox } from "react-native-elements";
import { ThemeContext } from "../context";

const Wrapper = styled.TouchableOpacity`
  margin-top: 15px;
  border: 1px dashed grey;
  border-radius: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: ${({ done, theme }) => (done ? theme.done : theme.white)};
`;

const StyledText = styled.Text`
  color: grey;
`;

const Priority = styled.View`
  background-color: ${({ priority }) =>
    priority === 0 ? "green" : priority === 1 ? "yellow" : "red"};
  height: 100%;
  width: 5px;
`;

const Holder = styled.View`
  height: 100%;
  flex-direction: row;
`;

const Task = ({ task, navigation, setTasks, hide }) => {
  const context = React.useContext(ThemeContext);

  const pressHandler = () => {
    navigation.navigate("TaskDetails", task);
  };

  const update = () => {
    try {
      context.db.transaction((tx) => {
        tx.executeSql("update tasks set done=? where id=?", [
          !task.done,
          task.id,
        ]);

        setTasks((tasks) => {
          let newArr = [...tasks];
          newArr.filter((e) =>
            e.id === task.id
              ? (task.done = task.done == 0 ? 1 : 0)
              : (task.done = task.done)
          );
          return newArr;
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {(hide === false || task.done === 0) && (
        <Wrapper onPress={() => pressHandler()} done={task.done}>
          <StyledText>{task.task}</StyledText>
          <Holder>
            <CheckBox
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checked={task.done}
              onPress={() => update()}
              checkedColor="green"
            />
            <Priority priority={parseInt(task.priority)} />
          </Holder>
        </Wrapper>
      )}
    </>
  );
};

export default Task;
