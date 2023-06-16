import { Image as RNEImage, ImageProps as RNEImageProps } from "@rneui/themed";
import  React  from 'react';
import { size } from "_theme";

const Image = ({...props }: RNEImageProps) => <RNEImage style={{width: size.IMAGE_MEDIUM, height: size.IMAGE_MEDIUM}} {...props} />;

export type IconProps = React.ComponentProps<typeof Image>;
export default Image;
