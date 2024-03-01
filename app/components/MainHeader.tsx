import { Box, HStack, StatusBar } from "native-base";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "native-base";
import { colors } from "../utils";

type MainHeaderProps = {
  label: string;
};

const MainHeader: React.FC<MainHeaderProps> = ({ label }) => {
  return (
    <>
      <SafeAreaView style={{ zIndex: -1 }}>
        <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
        <Box safeAreaTop bg={colors.primary} />
        <HStack
          bg={colors.primary}
          px="1"
          py="3"
          justifyContent="space-between"
          alignItems="center"
          w="100%"
        >
          <HStack alignItems="center">
            <Text fontSize="xl" color="white" bold w="100%" textAlign="center">
              {label}
            </Text>
          </HStack>
        </HStack>
      </SafeAreaView>
    </>
  );
};

export default MainHeader;
