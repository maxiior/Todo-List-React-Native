import React, { useState } from "react";
import styled from "styled-components/native";
import SubmitButton from "../components/SubmitButton";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useTheme } from "styled-components";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";
import { ThemeContext } from "../context";

const BackArrowIcon = styled(SimpleLineIcons)`
  font-size: 25px;
  top: 60px;
  left: 15px;
  position: absolute;
  color: ${({ theme }) => theme.black};
`;

const Wrapper = styled.View`
  flex: 1;
  background-color: #fff;
  padding: 30px;
`;

const Container = styled.ScrollView`
  margin-top: 80px;
  flex: 1;
  width: 100%;
`;

const StyledKeyboardAvoidingView = styled.KeyboardAvoidingView`
  width: 100%;
  margin-bottom: 30px;
`;

const StyledTextInput = styled.TextInput`
  color: ${({ theme }) => theme.black};
  font-size: 20px;
  border: 1px solid ${({ theme }) => theme.darkGrey};
  border-top-color: ${({ theme }) => theme.white};
  border-left-color: ${({ theme }) => theme.white};
  border-right-color: ${({ theme }) => theme.white};
  padding: 3px 5px;
`;

const Header = styled.Text`
  font-size: 12px;
  margin-top: ${({ margin }) => (margin ? "40px" : "0px")};
`;

const RadioButtonsHolder = styled.View`
  margin-top: 10px;
`;

const TaskDetails = ({ navigation }) => {
  const context = React.useContext(ThemeContext);

  const [task, setTask] = useState({
    task: navigation.getParam("task"),
    details: navigation.getParam("details"),
    priority: navigation.getParam("priority"),
    id: navigation.getParam("id"),
  });

  const radio_props = [
    { label: "Mało ważne", value: 0 },
    { label: "Średnie", value: 1 },
    { label: "Bardzo ważne", value: 2 },
  ];
  const fromTheme = useTheme();

  const pressHandler = () => {
    navigation.navigate("Home");
  };

  const update = () => {
    if (task.task === "") {
      return false;
    }

    try {
      context.db.transaction((tx) => {
        tx.executeSql(
          "update tasks set task=?, details=?, priority=? where id=?",
          [task.task, task.details, task.priority, task.id]
        );
      });

      pressHandler();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Wrapper>
      <BackArrowIcon name="arrow-left" onPress={() => pressHandler()} />
      <Container keyboardShouldPersistTaps="handled">
        <Header>Zadanie</Header>
        <StyledTextInput
          multiline={true}
          value={task.task}
          defaultValue={navigation.getParam("task").task}
          onChangeText={(value) => setTask({ ...task, task: value })}
        />
        <Header margin>Dodatkowe notatki</Header>
        <StyledTextInput
          multiline={true}
          value={task.details}
          defaultValue={navigation.getParam("task").details}
          onChangeText={(value) => setTask({ ...task, details: value })}
        />
        <Header margin>Priorytet</Header>
        <RadioButtonsHolder>
          <RadioForm formHorizontal={false} animation={true}>
            {radio_props.map((obj, i) => (
              <RadioButton labelHorizontal={true} key={i}>
                <RadioButtonInput
                  obj={obj}
                  index={i}
                  isSelected={parseInt(task.priority) === i}
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
        </RadioButtonsHolder>
      </Container>
      <StyledKeyboardAvoidingView behavior="position">
        <SubmitButton value="Zapisz zmiany" submitHandler={update} />
        <SubmitButton value="Usuń to zadanie" submitHandler={update} />
      </StyledKeyboardAvoidingView>
    </Wrapper>
  );
};

export default TaskDetails;
