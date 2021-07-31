import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  Keyboard,
  View,
  KeyboardAvoidingView,
  TextInput,
  Platform,
  TouchableOpacity,
} from "react-native";
import Task from "./components/Task";

export default function App() {
  const [task, setTask] = useState("");
  const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task]);
    setTask("");
  };

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  };

  let today = new Date();
  let date =
    today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();

  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <View style={styles.newHead}>
          <Text style={styles.sectionTitle}>Today's tasks</Text>
          <Text style={styles.date}>{date}</Text>
        </View>
        <View style={styles.items}>
          {taskItems.map((task, index) => {
            return (
              <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                <Task text={task} />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder={"Write a task"}
          value={task}
          onChangeText={(text) => setTask(text)}
        />
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8eaed",
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 50,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingTop: 0,
    paddingBottom: 0,
  },
  input: {
    paddingVertical: 10,
    width: "85%",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    borderRadius: 30,
    borderColor: "#c0c0c0",
    borderWidth: 1,
  },
  addWrapper: {
    width: 49,
    height: 49,
    backgroundColor: "#fff",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#c0c0c0",
    borderWidth: 1,
  },
  newHead: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  addText: {
    fontSize: 20,
  },
  date: {
    fontSize: 16,
  },
});
