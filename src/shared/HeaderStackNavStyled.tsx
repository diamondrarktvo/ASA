import Row from "./Row";
import Icon from "./Icon";
import Text from "./Text";
import TouchableOpacity from "./TouchableOpacity";
import { useTheme } from "@shopify/restyle";
import { useNavigation } from "@react-navigation/native";
import { Theme, Size } from "_theme";

type Props = {
  titleRight: string;
  onPressTitle?: () => void;
};

const HeaderStackNavStyled: React.FC<Props> = ({
  titleRight,
  onPressTitle,
}) => {
  const theme = useTheme<Theme>();
  const { black } = theme.colors;
  const navigation = useNavigation();

  return (
    <Row justifyContent="space-between" alignItems="center">
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" color={black} size={Size.ICON_MEDIUM} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressTitle}>
        <Text variant="secondary" textDecorationLine="underline" color="text">
          {titleRight}
        </Text>
      </TouchableOpacity>
    </Row>
  );
};

export default HeaderStackNavStyled;
