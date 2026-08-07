import React, { useState } from 'react';
import { View, Button, Image, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const ImagePickerComponent = () => {
    //Estado para armazenar a URI da imagem selecionada
    const [imageUri, setImageUri] = useState(null);

    //Função para solicitar permissão e abrir a galeria
    const selectImage = async () => {
        try {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (status !== 'granted') {
                Alert.alert('Permissão Negada', 'Permissão para acessar a galeria foi negada.');
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 1,
            });

            // API atual retorna "canceled" e um array "assets"
            if (result.canceled) {
                // usuário cancelou
                return;
            }

            const uri = result.assets && result.assets[0] && result.assets[0].uri;
            if (uri) setImageUri(uri);
        } catch (error) {
            console.error('Erro ao selecionar imagem:', error);
            Alert.alert('Erro', 'Não foi possível selecionar a imagem.');
        }
    };

    return (
        //Contêiner principal com estilo centralizado
        <View style={styles.container}>
            {/* Botão para selecionar imagem */}
            <Button title="Selecionar Imagem" onPress={selectImage} />

            {/* Exibe a imagem selecionada, se houver */}
            {imageUri && (
                <Image
                  source={{ uri: imageUri }} //Fonte da imagem
                  style={styles.image} //Estilo da imagem
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 12,
        backgroundColor: '#fff',
    },
    image: {
        width: 200,
        height: 200,
        marginTop: 20,
        borderRadius: 10,
    },
});

export default ImagePickerComponent;