import { useQuery } from "@tanstack/react-query";
import { getConnectorsDefintions } from "@/services/connectors";
import { getDestinationCategories } from "@/views/Connectors/helpers";
import { useContext, useState } from "react";
import { Box, Image, Text } from "@chakra-ui/react";
import ContentContainer from "@/components/ContentContainer";
import { ALL_DESTINATIONS_CATEGORY } from "@/views/Connectors/constant";
import { Connector } from "@/views/Connectors/types";
import { SteppedFormContext } from "@/components/SteppedForm/SteppedForm";

const SelectDestinations = (): JSX.Element => {
  const { stepInfo, handleMoveForward } = useContext(SteppedFormContext);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    ALL_DESTINATIONS_CATEGORY
  );
  const { data } = useQuery({
    queryKey: ["datasources", "destination"],
    queryFn: () => getConnectorsDefintions("destination"),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    gcTime: Infinity,
  });

  const connectors = data?.data ?? [];
  const destinationCategories = getDestinationCategories(connectors);

  const onDestinationSelect = (destination: Connector) => {
    handleMoveForward(stepInfo?.formKey as string, destination.name);
  };

  return (
    <Box display="flex" alignItems="center">
      <ContentContainer>
        <Box marginBottom="40px" display="flex" justifyContent="center">
          {destinationCategories.map((category) => {
            const isSelected = category === selectedCategory;
            return (
              <Box
                padding="10px 15px"
                borderRadius="100px"
                backgroundColor={isSelected ? "brand.400" : "none"}
                color={isSelected ? "#fff" : "none"}
                borderWidth={isSelected ? "none" : "thin"}
                marginRight="20px"
                cursor="pointer"
                _hover={{
                  backgroundColor: isSelected ? "brand.400" : "gray.100",
                }}
                onClick={() => setSelectedCategory(category)}
              >
                <Text>{category}</Text>
              </Box>
            );
          })}
        </Box>
        <Box display="flex" justifyContent="center">
          <Box display="grid" gridTemplateColumns="350px 350px 350px">
            {connectors.map((connector) =>
              selectedCategory === ALL_DESTINATIONS_CATEGORY ||
              selectedCategory === connector.category ? (
                <Box
                  display="flex"
                  alignItems="center"
                  marginX="20px"
                  borderWidth="thin"
                  padding="20px"
                  borderRadius="8px"
                  marginY="20px"
                  cursor="pointer"
                  borderColor="gray.400"
                  _hover={{
                    backgroundColor: "gray.200",
                  }}
                  onClick={() => onDestinationSelect(connector)}
                >
                  <Box
                    height="40px"
                    width="40px"
                    marginRight="10px"
                    borderWidth="thin"
                    padding="5px"
                    borderRadius="8px"
                  >
                    <Image
                      src={connector.icon}
                      alt="source icon"
                      maxHeight="100%"
                    />
                  </Box>
                  <Text fontWeight="bold">{connector.name}</Text>
                </Box>
              ) : null
            )}
          </Box>
        </Box>
      </ContentContainer>
    </Box>
  );
};

export default SelectDestinations;
