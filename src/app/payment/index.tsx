import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { CARD_SIDE, CreditCard } from "@/components/credit-card";
import { useSharedValue } from "react-native-reanimated";
import { Input } from "@/components/input";
import { useState } from "react";

export enum Time  {
  nautico = '232, 98, 85',
  santacruz = '221,0, 0',
  sport = '54, 54, 54'
}

export function Payment() {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [date, setDate] = useState("");
  const [code, setCode] = useState("");
  const [cor, setCor] = useState("");
  const [time, setTime] = useState("");



  const cardSide = useSharedValue(CARD_SIDE.front);

  function showFrontCard() {
    cardSide.value = CARD_SIDE.front;
  }

  function showBackCard() {
    cardSide.value = CARD_SIDE.back;
  }

  function handleFlipCard() {
    console.log(cardSide.value);
    if (cardSide.value === CARD_SIDE.front) {
      showBackCard();
    } else {
      showFrontCard();
    }
  }

  function setCard(cor: string, time: string) {
    setCor(cor);
    setTime(time);
  }

  return (
    <View style={styles.container}>

      <View style={styles.teamArea}>
        <TouchableOpacity style={styles.team} onPress={() => setCard(Time.nautico, 'nautico')}>
          <Image 
            source={require('../../../assets/nautico.png')}
            style={{width: 70, height: 80}}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.team} onPress={() => setCard(Time.santacruz, 'santacruz')}>
          <Image 
            source={require('../../../assets/santacruz.png')}
            style={{width: 70, height: 80}}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.team} onPress={() => setCard(Time.sport, 'sport')}>
          <Image 
            source={require('../../../assets/sport.png')}
            style={{width: 70, height: 80}}
            resizeMode="contain"
          />
        </TouchableOpacity>

      </View>

      <CreditCard
        cardSide={cardSide}
        data={{
          name,
          number: number.replace(/(\d{4})(?=\d)/g, "$1 "),
          date: date.replace(/(\d{2})(?=\d)/g, "$1 /"),
          code,
          cor,
          time,
        }}
      />

      <TouchableOpacity style={styles.button} onPress={handleFlipCard}>
        <Text>Inverter</Text>
      </TouchableOpacity>

      <View style={styles.form}>
        <Input
          placeholder="Nome do titular"
          onChangeText={setName}
          onFocus={showFrontCard}
        />
        <Input
          placeholder="Número do cartão"
          keyboardType="numeric"
          maxLength={16}
          onChangeText={setNumber}
          onFocus={showBackCard}
        />

        <View style={styles.inputInline}>
          <Input
            placeholder="01/02"
            style={styles.smallInput}
            onChangeText={setDate}
            onFocus={showBackCard}
            maxLength={4}
            keyboardType="numeric"
          />
          <Input
            placeholder="123"
            style={styles.smallInput}
            keyboardType="numeric"
            onChangeText={setCode}
            onFocus={showBackCard}
            maxLength={3}
          />
        </View>

      </View>

    </View>
  );
}
