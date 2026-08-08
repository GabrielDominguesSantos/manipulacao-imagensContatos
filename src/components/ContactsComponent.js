import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, Alert, Linking, StyleSheet } from 'react-native';
import * as Contacts from 'expo-contacts';
import ImagePickerComponent from './ImagePickerComponent';

//Define o componente funcional
const ContactsComponent = () => {
    //Estado para armazenar os contatos
    const [contacts, setContacts] = useState([]);

    //Função para solicitar permissão e carregar contatos
    const loadContacts = async () => {
        //Solicita permissão para acessar contatos
        const { status } = await Contacts.requestPermissionsAsync();

        //Verifica se a permissão foi concedida
        if (status !== 'granted') {
            Alert.alert(
                'Permissão para acessar os contatos negada',
                'Deseja permitir manualmente nas configurações?',
                [
                    { text: 'Cancelar', style: 'cancel' },
                    { text: 'Abrir Ajustes', onPress: () => Linking.openSettings() }, // Direciona para as config de permissões do app
                ]
            );
            return;
        }

        try {
            //Obtém todos os contatos do dispositivo
            const { data } = await Contacts.getContactsAsync({
                fields: [Contacts.Fields.Emails, Contacts.Fields.PhoneNumbers],
        });

            //Verifica se há contatos
            if (data.length > 0) {
                setContacts(data); //Atualiza o estado com os contatos obtidos
            } else {
                Alert.alert('Sem Contatos', 'Nenhum contato encontrado.');
            }
        } catch (error) {
            //Trata possíveis erros na obtenção dos contatos
            Alert.alert('Erro', 'Ocorreu um erro ao carregar os contatos.');
            console.error(error);
        }
    }

    //Executa a função de carregar contatos quando o componente é montado
    useEffect(() => {
        loadContacts();
    }, []);

    //Função para renderizar cada item da lista de contatos
    const renderItem = ({ item }) => (
        <View style={styles.contactItem}>
            {/* Nome completo do contato */}
            <Text style={styles.contactName}>
                {item.firstName} {item.lastName}
            </Text>

            {/* Lista de números de telefone do contato */}
            {item.phoneNumbers && item.phoneNumbers.map((phone, index) => (
                <Text key={index} style={styles.contactDetail}>
                    📞 {phone.number}
                </Text>
            ))}

            {/* Lista de emails do contato */}
            {item.emails && item.emails.map((email, index) => (
                <Text key={index} style={styles.contactDetail}>
                    📧 {email.email}
                </Text>
            ))}
        </View>
    );

    return (
        //Contêiner principal com estile de preenchimento
        <View style={styles.container}>
            {/* Botão para recarregar os contatos manualmente */}
            <Button title="Recarregar Contatos" onPress={loadContacts} />

            {/* Lista de contatos exibida usando FlatList */}
            <FlatList
                data={contacts} //Dados da lista
                keyExtractor={(item) => item.id} //Chave única para cada item
                renderItem={renderItem} //Função para renderizar cada item
                contentContainerStyle={styles.list} //Estilo do conteúdo da lista
                ListHeaderComponent={() => <ImagePickerComponent />} // Cabeçalho com seletor de imagem
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    list: {
        marginTop: 20,
    },
    contactItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    contactName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    contactDetail: {
        fontSize: 14,
        color: '#555',
        marginTop: 5,
    },
});

export default ContactsComponent;