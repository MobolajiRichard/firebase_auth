import { View, Text, SafeAreaView, StyleSheet, Dimensions } from "react-native";
import { StyledButton } from "../../components";
import React from "react";
import { COLOR, ICONS } from "../../constants";

const ConfirmAuth = () => {
  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={[styles.container]}>
        <View style={styles.textContainer}>
          <View style={styles.iconContainer}>
            <ICONS.Confetti />
          </View>
          <Text style={styles.congratulation}>Congratulations!</Text>
          <Text style={styles.text}>You have successfully authenticated.</Text>
          <Text style={styles.text}>Are you ready to see your profile?</Text>
        </View>
        <StyledButton name="Open my Profile" type="filled" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  container: {
    paddingHorizontal: 10,
    width: "100%",
    height: "100%",
    justifyContent:'space-between'
  },
  iconContainer: {
    width: 70,
    height: 70,
    borderColor: COLOR.secondaryGrey,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    alignItems: "center",
    width: "100%",
    paddingTop:'40%'
  },
  congratulation: {
    fontSize: 26,
    fontFamily: "Outfit_600SemiBold",
    color: COLOR.secondary,
    marginTop:20,
    marginBottom:10
  },
  text: {
    textAlign: "center",
    fontFamily: "Outfit_300Light",
    fontSize: 17,
    color: COLOR.secondary,
  },
});

export default ConfirmAuth;
