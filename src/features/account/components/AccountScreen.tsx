import { StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Image, MainScreen, Row, Text } from "_shared";
import { size } from "_theme";



export default function AccountScreen() {

  //const navigation = useNavigation<>();

  return (
    <MainScreen>
      <Row>
        <Text variant="bigTitle">Profil</Text>
        <Image source={require('_images/logoASA.jpeg')} />
      </Row>
      
    </MainScreen>
  );
}

const styles = StyleSheet.create({
});
