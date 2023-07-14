import Row from "./Row";
import Icon from "./Icon";
import Text from "./Text";
import TouchableOpacity from "./TouchableOpacity";
import { useTheme } from "@shopify/restyle";
import { useNavigation } from "@react-navigation/native";
import { Theme, Size } from "_theme";
import Column from "./Column";

type Props = {
  title: string;
  subTitle?: string;
  iconRight?: string;
  iconRightOnPress?: () => void;
};

const HeaderStackNavNormal: React.FC<Props> = ({
  title,
  subTitle,
  iconRight,
  iconRightOnPress,
}) => {
  const theme = useTheme<Theme>();
  const { black } = theme.colors;
  const navigation = useNavigation();

  return (
    <Row justifyContent="flex-start" alignItems="center">
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" color={black} size={Size.ICON_MEDIUM} />
      </TouchableOpacity>
      <Column flex={2} marginLeft="s">
        <Text variant="primaryBold" color="text">
          {title}
        </Text>
        {subTitle ? (
          <Text variant="tertiary" color="text">
            {subTitle}
          </Text>
        ) : null}
      </Column>
      {iconRight ? (
        <TouchableOpacity onPress={iconRightOnPress}>
          <Icon name={iconRight} color={black} size={Size.ICON_MEDIUM} />
        </TouchableOpacity>
      ) : null}
    </Row>
  );
};

export default HeaderStackNavNormal;
