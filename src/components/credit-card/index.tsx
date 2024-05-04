import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

type CreditCardProps = {
  cardSide: SharedValue<number>;
  data: {
    name: string;
    number: string;
    date: string;
    code: string;
    cor: string;
    time: string;
  };
};

export enum CARD_SIDE {
  front = 0,
  back = 1,
}

export function CreditCard({ cardSide, data }: CreditCardProps) {
  const frontAnimatedStyles = useAnimatedStyle(() => {
    const rotateValue = interpolate(
      cardSide.value,
      [CARD_SIDE.front, CARD_SIDE.back],
      [0, 180]
    );
    return {
      transform: [
        {
          rotateY: withTiming(`${rotateValue}deg`, {
            duration: 1000,
          }),
        },
      ],
    };
  });

  const backAnimatedStyles = useAnimatedStyle(() => {
    const rotateValue = interpolate(
      cardSide.value,
      [CARD_SIDE.front, CARD_SIDE.back],
      [180, 360]
    );
    return {
      transform: [
        {
          rotateY: withTiming(`${rotateValue}deg`, {
            duration: 1000,
          }),
        },
      ],
    };
  });

  return (
    <View>
      <Animated.View
        style={[
          styles.card,
          styles.front,
          frontAnimatedStyles,
          { backgroundColor: `rgba(${data.cor}, 1)` },
        ]}
      >
        <View style={styles.header}>
          <View style={[styles.circle, styles.logo]} />
          <Text>Meu Cartão</Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.name}>{data.name}</Text>
          <View style={styles.flag}>
            {/* <View style={[styles.circle, styles.red]} />
                        <View style={[styles.circle, styles.orange]} /> */}

            {data.time === "nautico" && (
              <Image
                source={require("../../../assets/nautico.png")}
                style={{ width: 40, height: 40 }}
                resizeMode="contain"
              />
            )}

            {data.time === "santacruz" && (
              <Image
                source={require("../../../assets/santacruz.png")}
                style={{ width: 40, height: 40 }}
                resizeMode="contain"
              />
            )}

            {data.time === "sport" && (
              <Image
                source={require("../../../assets/sport.png")}
                style={{ width: 40, height: 40 }}
                resizeMode="contain"
              />
            )}
            {/* <Image
                source={require("../../../assets/nautico.png")}
                style={{ width: 40, height: 40 }}
                resizeMode="contain"
              /> */}
          </View>
        </View>
      </Animated.View>

      <Animated.View style={[styles.card, styles.back, backAnimatedStyles]}>
        <View>
          <Text style={styles.label}>Número do cartão</Text>
          <Text style={styles.value}>{data.number}</Text>
        </View>

        <View style={styles.footer}>
          <View>
            <Text style={styles.label}>Validade</Text>
            <Text style={styles.value}>{data.date}</Text>
          </View>

          <View>
            <Text style={styles.label}>CVV</Text>
            <Text style={styles.value}>{data.code}</Text>
          </View>
        </View>
      </Animated.View>
    </View>
  );
}
