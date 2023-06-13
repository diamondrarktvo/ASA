import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Icon } from "_shared";


export default function AccountScreen() {

  //const navigation = useNavigation<>();

  return (
    <View style={styles.container}>
        <Text>Account </Text>
        <Text>Show account book</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
