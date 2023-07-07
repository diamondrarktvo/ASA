import { View, Text, StyleSheet } from "react-native";

export default function ManageProfil() {
  return (
    <View style={styles.container}>
      <Text>Modification du Profil</Text>
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
