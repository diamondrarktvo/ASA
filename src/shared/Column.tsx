import Box from "./Box";
import { BoxProps } from "./Box";
import React from "react";

type ColumnProps = Omit<BoxProps, "flexDirection"> & {
  children: React.ReactNode;
};

const Column: React.FC<ColumnProps> = ({ children, ...rest }) => {
  return (
    <Box flexDirection={"column"} {...rest} alignItems={"flex-start"}>
      {children}
    </Box>
  );
};

export default Column;
