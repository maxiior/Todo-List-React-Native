import React, { useState, useEffect } from "react";
import Task from "../components/Task";
import AddingButton from "../components/AddingButton";
import styled from "styled-components/native";
import AddingBar from "../components/AddingBar";
import { ThemeContext } from "../context";
import Options from "../components/Options";
import {
  AdMobBanner,
  AdMobInterstitial,
  setTestDeviceIDAsync,
} from "expo-ads-admob";

const StyledFlatList = styled.FlatList`
  width: 100%;
  padding: 0 20px;
`;

const Wrapper = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;

const Container = styled.View`
  margin-top: 80px;
  flex: 1;
  width: 100%;
`;

const StyledAdMobBanner = styled(AdMobBanner)`
  margin-left: -20px;
  margin-top: 15px;
`;

const Home = ({ navigation }) => {
  const [addingBar, setAddingBar] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [options, setOptions] = useState({ sort: false, hideDone: false });

  const pressHandler = () => {
    setAddingBar((e) => !e);
  };

  const context = React.useContext(ThemeContext);

  useEffect(() => {
    context.db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists tasks (id integer primary key autoincrement, task text, details text, priority integer, done integer, added string);"
      );
    });
    initAds().catch((error) => console.log(error));
  }, []);

  const initAds = async () => {
    AdMobInterstitial.setAdUnitID("ca-app-pub-3940256099942544/6300978111");
    await setTestDeviceIDAsync("EMULATOR");
  };

  useEffect(() => {
    context.db.transaction((tx) => {
      tx.executeSql(`select * from tasks;`, [], (_, { rows: { _array } }) =>
        setTasks(_array)
      );
    });
  }, []);

  return (
    <Wrapper>
      <Container>
        <Options
          setOptions={setOptions}
          options={options}
          tasks={tasks}
          setTasks={setTasks}
        />
        <StyledFlatList
          keyExtractor={(item) => item.id}
          data={
            options.sort
              ? tasks.sort((a, b) => a.priority < b.priority)
              : tasks.sort((a, b) => a.task > b.task)
          }
          renderItem={({ item }) => (
            <>
              <Task
                task={item}
                navigation={navigation}
                setTasks={setTasks}
                hide={options.hideDone}
              />
              {Math.random() > 0.8 && (
                <StyledAdMobBanner
                  bannerSize="smartBannerPortrait"
                  adUnitID="ca-app-pub-3940256099942544/6300978111"
                  servePersonalizedAds
                  onDidFailToReceiveAdWithError={this.bannerError}
                />
              )}
            </>
          )}
        />
        {!addingBar && <AddingButton pressHandler={pressHandler} />}
        {addingBar && (
          <AddingBar pressHandler={pressHandler} setTasks={setTasks} />
        )}
      </Container>
    </Wrapper>
  );
};

export default Home;
