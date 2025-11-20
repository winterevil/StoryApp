import React, { useEffect, useRef } from 'react';
import { StyleSheet, Animated, Easing, Image, View } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';

export default function SplashScreen({ navigation }) {
  const rotate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotate, {
        toValue: 1,
        duration: 1400,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();

    const timer = setTimeout(() => navigation.replace('Home'), 1500);
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
      {/* 🌟 HÌNH NẰM ĐÈ LÊN NỀN (ở giữa màn hình) */}
      <Image
        source={require('../assets/img/illustration.png')}
        style={styles.middleImage}
        resizeMode="contain"
      />
      <View style={styles.buttons}>
        <View style={styles.loginButton}>
          <Text style={styles.loginText}>Login</Text>
        </View>
        <Text>
          You don't have an account ?{' '}
          <Text style={styles.registerText}>Register</Text>
        </Text>
        <Text style={styles.welcomeText}>
          Welcome to Tunova ! Your reading story friend
        </Text>
      </View>

      {/* CARD TRẮNG
      <Surface style={styles.card} elevation={6}>
        <Image
          style={styles.img}
          source={require('../assets/img/bg.jpg')}
          resizeMode="contain"
        />

        <Text variant="headlineMedium" style={styles.appName}>
          Turova
        </Text> */}

      {/* LOADING SPINNER */}
      {/* <Animated.View
          style={[styles.loader, { transform: [{ rotate: spin }] }]}
        />
      </Surface> */}
    </LinearGradient>
  );
}

const WHITE = '#fff';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* 🌟 Hình nằm chính giữa màn hình */
  middleImage: {
    position: 'absolute',
    top: '22%', // chỉnh để vừa mắt
    width: 260,
    height: 260,
    opacity: 1, // bạn có thể giảm xuống 0.9 cho đẹp
  },

  card: {
    width: 260,
    paddingVertical: 45,
    paddingHorizontal: 25,
    borderRadius: 24,
    alignItems: 'center',
    backgroundColor: WHITE,
    marginTop: 180, // đẩy card xuống để tránh đè lên middle image
  },

  img: {
    width: 140,
    height: 140,
    marginBottom: 20,
  },

  loader: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    borderWidth: 5,
    borderColor: WHITE,
    borderTopColor: 'transparent',
    marginTop: 28,
  },

  appName: {
    fontFamily: 'cursive',
    fontSize: 50,
    fontStyle: 'italic',
    fontWeight: 'bold',
    color: '#2E473B',
    marginBottom: 20,
  },
  buttons: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  loginButton: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
    marginBottom: 15,
    marginTop: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  loginText: {
    color: '#184530ff',
    fontWeight: 'bold',
  },
  registerText: {
    color: '#184530ff',
    fontWeight: 'bold',
  },
  welcomeContainer: {
    position: 'absolute',
    alignItems: 'center',
  },
  welcomeText: {
    color: '#184530ff',
  },
});
