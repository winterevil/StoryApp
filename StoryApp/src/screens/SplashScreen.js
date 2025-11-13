import React, { useEffect } from 'react';
import { StyleSheet, Animated, Easing, Image } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';

export default function SplashScreen({ navigation }) {
  const rotate = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotate, {
        toValue: 1,
        duration: 1400,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();

    const timer = setTimeout(() => navigation.replace('Home'), 600000);
    return () => clearTimeout(timer);
  }, []);

  const spin = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <LinearGradient
      colors={['#A1FFCE', '#FAFFD1', '#8FD9C4']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <Surface style={styles.card} elevation={6}>
        <Text variant="headlineMedium" style={styles.appName}>
          Turova
        </Text>
          <Image style={styles.img} source={require('../assets/img/splashscreen.png')}></Image>

        <Animated.View
          style={[styles.loader, { transform: [{ rotate: spin }] }]}
        />
      </Surface>
    </LinearGradient>
  );
}

const MINT = '#8FD9C4';
const MINT_DARK = '#ffffffff';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  card: {
    width: 260,
    paddingVertical: 45,
    paddingHorizontal: 25,
    borderRadius: 24,
    alignItems: 'center',
  },

  title: {
    fontWeight: '700',
    color: '#2E473B',
    marginBottom: 30,
  },

  loader: {
    width: 55,
    height: 55,
    borderRadius: 55 / 2,
    borderWidth: 5,
    borderColor: MINT_DARK,
    borderTopColor: 'transparent',
    marginTop: 50,
  },
  img: {
 
  },
  appName: {
  fontFamily: "cursive",         // Android auto handwriting
  fontSize: 50,
  fontStyle: "italic",           // mềm như script
  fontWeight: "bold",
  color: "#2E473B",
  marginBottom: 30

  // letterSpacing: 1.5,            // giãn nhẹ -> giống chữ kéo tay
  // transform: [{ skewX: "-6deg" }], // nghiêng chữ theo handwriting
  // textShadowColor: "rgba(0, 0, 0, 0.15)", 
  // textShadowOffset: { width: 1, height: 1 },
  // textShadowRadius: 4,           // bóng mịn -> chữ nổi & mềm
  // marginBottom: 20,

},

});
