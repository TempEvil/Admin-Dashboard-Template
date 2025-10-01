import { Flex, Heading, HStack } from "@chakra-ui/react";
import type { ReactNode } from "react";

type THeaderForm = {
  title: string;
  children: ReactNode;
};

const HeaderForm = ({ title, children }: THeaderForm) => {
  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      gap={{ base: "0.5rem", md: "1rem" }}
      padding={{ base: "0.5rem", md: "0.75rem" }}
      alignItems="center"
      justifyContent="space-between"
      position="sticky"
      top="0"
      bg="#fff"
      zIndex="900"
      width="100%"
      border="1px solid #eee"
      boxShadow="sm"
    >
      <Heading as="h2" fontSize="1.1rem" fontWeight="semibold" fontFamily="Hanuman, Poppins-Regular">
        {title}
      </Heading>
      <HStack flexWrap="wrap" justifyContent="center">{children}</HStack>
    </Flex>
  );
};

export default HeaderForm;
