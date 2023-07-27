import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Box, Button, Icon, Input, MainScreen, Row, Text } from "_shared";
import { Size, Theme } from "_theme";
import { useTheme } from "@shopify/restyle";
import { stepper4NavigationTypes } from "../../types";
import { CheckBox } from "@rneui/themed";
import { ScrollView } from "react-native-gesture-handler";

export default function StepThree() {
  const navigation = useNavigation<stepper4NavigationTypes>();
  const theme = useTheme<Theme>();
  const { borderRadii, colors } = theme;

  return (
    <MainScreen typeOfScreen="tab" titleTabScreen="Publication">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box marginTop={"m"}>
          <Text
            variant={"primary"}
            color={"blue"}
            textDecorationLine={"underline"}
            marginBottom={"xs"}
          >
            Step 3:
          </Text>
          <Text variant={"title"} color="black">
            Les critères de votre produit ?
          </Text>
          <Text variant={"tertiary"} color={"error"}>
            NB: Veuillez cocher vos critères!
          </Text>
          <Box marginVertical={"s"}>
            {/**offre d'emploi */}
            <Text variant={"primary"}>Offre d'emploi : </Text>
            {/**type de contrat */}
            <Box>
              <Text variant={"tertiary"}>1 -Type de contrat : </Text>
              <Box flexDirection={"row"} flexWrap={"wrap"}>
                <CheckBox
                  containerStyle={{ backgroundColor: colors.mainBackground }}
                  checkedColor={colors.primary}
                  checked={true}
                  title="CDD"
                />
                <CheckBox
                  containerStyle={{ backgroundColor: colors.mainBackground }}
                  checkedColor={colors.primary}
                  checked={false}
                  title="CDI"
                />
                <CheckBox
                  containerStyle={{ backgroundColor: colors.mainBackground }}
                  checkedColor={colors.primary}
                  checked={false}
                  title="Interim"
                />
                <CheckBox
                  containerStyle={{ backgroundColor: colors.mainBackground }}
                  checkedColor={colors.primary}
                  checked={false}
                  title="Autre"
                />
              </Box>
            </Box>
            {/**secteur d'activité */}
            <Box>
              <Text variant={"tertiary"}>2 -Secteur d'activité : </Text>
            </Box>
            {/**Fonction */}
            <Box>
              <Text variant={"tertiary"}>3 -Fonction: </Text>
            </Box>
            {/**Experience */}
            <Box>
              <Text variant={"tertiary"}>4 -Experience: </Text>
              <Box flexDirection={"row"} flexWrap={"wrap"}>
                <CheckBox
                  containerStyle={{ backgroundColor: colors.mainBackground }}
                  checkedColor={colors.primary}
                  checked={true}
                  title="0 à 2 ans"
                />
                <CheckBox
                  containerStyle={{ backgroundColor: colors.mainBackground }}
                  checkedColor={colors.primary}
                  checked={false}
                  title="2 à 5 ans"
                />
                <CheckBox
                  containerStyle={{ backgroundColor: colors.mainBackground }}
                  checkedColor={colors.primary}
                  checked={false}
                  title="plus de 5 ans"
                />
              </Box>
            </Box>
            {/**type de travail */}
            <Box>
              <Text variant={"tertiary"}>5 -Travail à : </Text>
              <Box flexDirection={"row"} flexWrap={"wrap"}>
                <CheckBox
                  containerStyle={{ backgroundColor: colors.mainBackground }}
                  checkedColor={colors.primary}
                  checked={true}
                  title="temps partiel"
                />
                <CheckBox
                  containerStyle={{ backgroundColor: colors.mainBackground }}
                  checkedColor={colors.primary}
                  checked={false}
                  title="temps plein"
                />
              </Box>
            </Box>
            <Box>
              <Text variant={"tertiary"}>6 -Référence: </Text>
            </Box>
          </Box>

          <Box marginVertical={"s"}>
            {/**formation */}
            <Text variant={"primary"}>Formation : </Text>
            {/**type de formation */}
            <Box>
              <Text variant={"tertiary"}>1 -Type de formation : </Text>
              <Box flexDirection={"row"} flexWrap={"wrap"}>
                <CheckBox
                  containerStyle={{ backgroundColor: colors.mainBackground }}
                  checkedColor={colors.primary}
                  checked={true}
                  title="présentiel"
                />
                <CheckBox
                  containerStyle={{ backgroundColor: colors.mainBackground }}
                  checkedColor={colors.primary}
                  checked={false}
                  title="en ligne"
                />
              </Box>
            </Box>
            {/**Domaine */}
            <Box>
              <Text variant={"tertiary"}>2 -Domaine : </Text>
            </Box>
            {/**Diplôme */}
            <Box>
              <Text variant={"tertiary"}>3 -Diplôme: </Text>
              <Box flexDirection={"row"} flexWrap={"wrap"}>
                <CheckBox
                  containerStyle={{ backgroundColor: colors.mainBackground }}
                  checkedColor={colors.primary}
                  checked={true}
                  title="Oui"
                />
                <CheckBox
                  containerStyle={{ backgroundColor: colors.mainBackground }}
                  checkedColor={colors.primary}
                  checked={false}
                  title="Non"
                />
              </Box>
            </Box>
            {/**Experience */}
            <Box>
              <Text variant={"tertiary"}>4 -Experience: </Text>
              <Box flexDirection={"row"} flexWrap={"wrap"}>
                <CheckBox
                  containerStyle={{ backgroundColor: colors.mainBackground }}
                  checkedColor={colors.primary}
                  checked={true}
                  title="0 à 2 ans"
                />
                <CheckBox
                  containerStyle={{ backgroundColor: colors.mainBackground }}
                  checkedColor={colors.primary}
                  checked={false}
                  title="2 à 5 ans"
                />
              </Box>
            </Box>
            {/**certificat d'aptitude */}
            <Box>
              <Text variant={"tertiary"}>5 -Certificat d'aptitude : </Text>
              <Box flexDirection={"row"} flexWrap={"wrap"}>
                <CheckBox
                  containerStyle={{ backgroundColor: colors.mainBackground }}
                  checkedColor={colors.primary}
                  checked={true}
                  title="Oui"
                />
                <CheckBox
                  containerStyle={{ backgroundColor: colors.mainBackground }}
                  checkedColor={colors.primary}
                  checked={false}
                  title="Non"
                />
              </Box>
            </Box>
          </Box>

          <Row alignItems={"center"} justifyContent="space-around">
            <Button
              height={50}
              alignItems={"center"}
              justifyContent={"center"}
              width={150}
              variant={"tertiary"}
              label="Précédent"
              onPress={() => navigation.goBack()}
            />
            <Button
              height={50}
              alignItems={"center"}
              justifyContent={"center"}
              width={150}
              variant={"secondary"}
              label="Suivant"
              onPress={() => navigation.navigate("stepper_screen_4")}
            />
          </Row>
        </Box>
      </ScrollView>
    </MainScreen>
  );
}

const styles = StyleSheet.create({});
