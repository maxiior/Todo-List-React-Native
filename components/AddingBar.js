import React, { useState } from "react";
import styled from "styled-components/native";
import { View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";
import SubmitButton from "./SubmitButton";
import { useTheme } from "styled-components";
import { ThemeContext } from "../context";

const Wrapper = styled.View`
  width: 100%;
  background-color: ${({ theme }) => theme.plaster};
  position: absolute;
  bottom: 0;
  padding: 35px 15px 100px 15px;
`;

const CloseIcon = styled(AntDesign)`
  color: ${({ theme }) => theme.red};
  font-size: 25px;
  position: absolute;
  right: 10px;
  top: 10px;
`;

const Header = styled.Text`
  margin: 10px 0;
  font-size: 12px;
  color: ${({ theme }) => theme.blue};
`;

const StyledTextInput = styled.TextInput`
  color: ${({ theme }) => theme.white};
  padding: 10px;
  margin-top: 10px;
  background-color: ${({ theme }) => theme.orange};
  border-radius: 10px;
`;

const StyledKeyboardAvoidingView = styled.KeyboardAvoidingView`
  width: 100%;
`;

const AddingBar = ({ pressHandler, setTasks }) => {
  const context = React.useContext(ThemeContext);

  const radio_props = [
    { label: "Mało ważne", value: 0 },
    { label: "Średnie", value: 1 },
    { label: "Bardzo ważne", value: 2 },
  ];

  const [task, setTask] = useState({ task: "", details: "", priority: 0 });
  const fromTheme = useTheme();

  const submitHandler = () => {
    add();
    pressHandler();
  };

  const add = () => {
    if (task.task === "") {
      return false;
    }

    context.db.transaction((tx) => {
      tx.executeSql(
        "insert into tasks (task, details, priority, done) values (?, ?, ?, 0)",
        [task.task, task.details, task.priority]
      );
    });

    context.db.transaction((tx) => {
      tx.executeSql("select * from tasks", [], (_, { rows }) =>
        setTasks(rows["_array"])
      );
    });
  };

  return (
    <StyledKeyboardAvoidingView behavior="position">
      <Wrapper>
        <CloseIcon name="close" onPress={() => pressHandler()} />
        <StyledTextInput
          placeholder="Podaj zadanie do wykonania"
          placeholderTextColor="#fff"
          onChangeText={(e) => setTask({ ...task, task: e })}
        />
        <StyledTextInput
          placeholder="Dodatkowe notatki"
          placeholderTextColor="#fff"
          onChangeText={(e) => setTask({ ...task, details: e })}
        />
        <Header>Wybierz priorytet zadania</Header>
        <View>
          <RadioForm formHorizontal={false} animation={true}>
            {radio_props.map((obj, i) => (
              <RadioButton labelHorizontal={true} key={i}>
                <RadioButtonInput
                  obj={obj}
                  index={i}
                  isSelected={task.priority === i}
                  onPress={(value) => setTask({ ...task, priority: value })}
                  borderWidth={1}
                  buttonInnerColor={fromTheme.blue}
                  buttonOuterColor={fromTheme.blue}
                  buttonSize={15}
                  buttonOuterSize={25}
                  buttonStyle={{}}
                  buttonWrapStyle={{ marginLeft: 10 }}
                />
                <RadioButtonLabel
                  obj={obj}
                  index={i}
                  labelHorizontal={true}
                  onPress={(value) => setTask({ ...task, priority: value })}
                  labelStyle={{
                    fontSize: 15,
                    color: fromTheme.blue,
                  }}
                  labelWrapStyle={{}}
                />
              </RadioButton>
            ))}
          </RadioForm>
        </View>
        <SubmitButton submitHandler={submitHandler} value="Dodaj zadanie" />
      </Wrapper>
    </StyledKeyboardAvoidingView>
  );
};

export default AddingBar;
