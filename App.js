import React from 'react';
import { SafeAreaViewBase, StyleSheet } from 'react-native';
import ImagePickerComponent from './src/components/ImagePickerComponent';

const App = () => {
  return (
    //SafeAreaView para garantir que o conteúdo não ultrapasse áreas seguras do dispositivo
    <SafeAreaView style={styles.container}>
      {/* Renderiza o componente de seleção de imagem */}
      <ImagePickerComponent />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
});

export default App;