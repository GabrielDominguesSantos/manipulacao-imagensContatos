import React, { useState } from 'react';
import { View, Button, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const ImagePickerComponent = () => {
    //Estado para armazenar a URI da imagem selecionada
    const [imageUri, setImageUri] = useState(null);

    //Função para solicitar permissão e abrir a galeria
    const selectImage = async () => {
        //Solicita permissão para acessar a galeria
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        //Verifica se a permissão foi concedida
        if(status !== 'granted') {
            Alert.alert('Permissão Negada', 'Permissão para acessar a galeria foi negada.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images, //Apenas imagens
            allowsEditing: true, //Permite edição básica
            quality: 1, //Qualidade da imagem (1 é melhor)
        });

        //Verifica se o usuário cancelou a operação
        if(result.cancelled) {
            Alert.alert('Operação Cancelada', 'Você cancelou a seleção de imagem.');
            return;
        }

        //Define a URI da imagem selecionada no estado
        setImageUri(result.uri);
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundCoor: '#fff',
    },
    image: {
        width: 200,
        height: 200,
        marginTop: 20,
        borderRadius: 10,
    },
});

export default ImagePickerComponent;