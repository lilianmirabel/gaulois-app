import { useFonts } from "expo-font";
import React from "react";
import { Dimensions, Image, Text, View } from "react-native";
import layoutprops from "../Styles/LayoutProps";

const Match = ({
  id_match,
  point_gaulois,
  point_adverse,
  logo_adverse,
  lieu,
}) => {
  const [fontsLoaded] = useFonts({
    CollegeBlock: require("../assets/fonts/College Block.otf"),
    Kadwa: require("../assets/fonts/Kadwa.ttf"),
  });
  const formatPoints = (points) => {
    return points < 10 ? `0${points}` : points;
  };

  const backgroundColor = point_gaulois > point_adverse ? "#2ECC71" : "#EF233C";

  const screenWidth = Dimensions.get("window").width;
  const imageWidth = screenWidth * 0.15;

  const formattedGauloisPoints = formatPoints(point_gaulois);
  const formattedAdversePoints = formatPoints(point_adverse);

  const isLeftPosition = lieu === "Polyvalente La Pocatière";

  return (
    <View style={layoutprops.containerMatchs}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: isLeftPosition ? "flex-start" : "flex-end",
          borderRadius: screenWidth * 0.1,
          backgroundColor: backgroundColor,
          borderWidth: screenWidth * 0.005,
        }}
      >
        {isLeftPosition && (
          <>
            <Image
              style={{
                width: imageWidth,
                height: imageWidth,
                borderRadius: imageWidth * 0.5,
                padding: screenWidth * 0.001,
                backgroundColor: "#FFF",
              }}
              resizeMode="contain"
              source={require("../assets/images/gaulois-lg.png")}
            />
            <View style={{ flexDirection: "column" }}>
              <Text
                style={{
                  marginHorizontal: screenWidth * 0.02,
                  paddingHorizontal: screenWidth * 0.1,
                  fontWeight: "bold",
                  fontSize: 33,
                  fontFamily: "Kadwa",
                }}
              >
                {formattedGauloisPoints} - {formattedAdversePoints}
              </Text>
            </View>
          </>
        )}
        <Image
          style={{
            width: imageWidth,
            height: imageWidth,
            borderRadius: imageWidth * 0.5,
            padding: screenWidth * 0.01,
            backgroundColor: "#FFF",
          }}
          resizeMode="contain"
          source={{ uri: logo_adverse }}
        />
        {!isLeftPosition && (
          <>
            <View style={{ flexDirection: "column" }}>
              <Text
                style={{
                  marginHorizontal: screenWidth * 0.02,
                  paddingHorizontal: screenWidth * 0.1,
                  fontWeight: "bold",
                  fontSize: 33,
                  fontFamily: "Kadwa",
                }}
              >
                {formattedAdversePoints} - {formattedGauloisPoints}
              </Text>
            </View>
            <Image
              style={{
                width: imageWidth,
                height: imageWidth,
                borderRadius: imageWidth * 0.5,
                padding: screenWidth * 0.01,
                backgroundColor: "#FFF",
              }}
              resizeMode="contain"
              source={require("../assets/images/gaulois-lg.png")}
            />
          </>
        )}
      </View>
    </View>
  );
};

export default Match;
