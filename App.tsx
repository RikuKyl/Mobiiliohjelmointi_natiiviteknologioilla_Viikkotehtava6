import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { CameraView, useCameraPermissions, BarcodeScanningResult } from 'expo-camera';

export default function App() {
  const [scanned, setScanned] = useState(false);
  const [lastBarcode, setLastBarcode] = useState('');
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) return <View />;
  
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Tarvitsemme luvan kameran käyttöön</Text>
        <Button onPress={requestPermission} title="Myönnä lupa" />
      </View>
    );
  }

  const handleBarCodeScanned = ({ type, data }: BarcodeScanningResult) => {
    setScanned(true);
    setLastBarcode(data);
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["ean13"],
        }}
      />
      {scanned && (
        <>
        <Text style={styles.text}>Barcode: {lastBarcode}</Text>
        <Button title={'Skannaa uudelleen'} onPress={() => setScanned(false)} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginBottom: 20,
    textAlign: 'center'
  }
});