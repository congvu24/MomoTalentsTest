import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

export default function LoadingModal({isLoading}: {isLoading: boolean}) {
  if (isLoading) {
    return (
      <View style={[style.body]}>
        <View style={[style.container]}>
          <ActivityIndicator size={50} />
        </View>
      </View>
    );
  } else {
    return null;
  }
}

const style = StyleSheet.create({
  body: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    top: 0,
    left: 0,
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999999,
  },
  container: {
    width: 100,
    height: 100,
    backgroundColor: 'white',
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
