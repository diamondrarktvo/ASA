import { Button, MainScreen, Text } from "_shared";

export default function SearchScreen() {
  return (
    <MainScreen typeOfScreen="tab">
      <Text variant="bigTitle" color="primary" textAlign="center">
        Atsika samy Atsika
      </Text>
      <Button variant="secondary" label="Recherchez partout à Madagascar" />
    </MainScreen>
  );
}
