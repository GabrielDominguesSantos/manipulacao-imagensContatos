import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import ContactsComponent from './src/components/ContactsComponent';

const App = () => {
  return (
    //SafeAreaView para garantir que o conteúdo não ultrapasse áreas seguras do dispositivo
    <SafeAreaView style={styles.container}>
      {/* Renderiza o componente de contatos (agora inclui o ImagePicker no header) */}
      <ContactsComponent />
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