import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { detailScreenNavigationType } from "../types/navigationTypes";
import { Icon } from "_shared";

export default function FavoriteScreen() {
  const navigation = useNavigation<detailScreenNavigationType>();

  return (
    <View style={styles.container}>
      <Text>Tous vos favoris seront ici</Text>
      <TouchableOpacity
        style={{ display: "flex", flexDirection: "row" }}
        onPress={() => {
          navigation.navigate("details_book");
        }}
      >
        <Icon name="favorite" size={24} color="red" raised />
      </TouchableOpacity>
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
