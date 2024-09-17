import React, { useContext } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image, ScrollView } from 'react-native';
import { AnuncioContext } from '../FuncoesDeTela/AnuncioContexto';

export default function TelaInicial({ navigation }) {
    const { anuncios } = useContext(AnuncioContext);

    return (
        <View style={styles.container}>
            <View style={styles.botoesContainer}>
                <TouchableOpacity>
                    <Button title="Criar Anúncio" onPress={() => navigation.navigate('CriarAnuncio')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Image source={require('../Imagens/Icones/icons8-login-arredondado-à-direita-100.png')} style={{ width: 48, height: 48 }} />
                </TouchableOpacity>

            </View>
            <ScrollView contentContainerStyle={styles.anunciosContainer}>
                {anuncios.map((anuncio, index) => (

                    <View key={index} style={styles.caixaTeste}>
                        <TouchableOpacity onPress={() => navigation.navigate('Anuncio', { anuncio })}>
                            {anuncio.foto ? (
                                <Image source={{ uri: anuncio.foto }} style={styles.imagemProduto} />
                            ) : (
                                <Text>Sem imagem</Text>
                            )}
                            <Text style={styles.textoCaixa}>{`${anuncio.foto}`}</Text>
                            <Text style={styles.textoCaixa}>{`${anuncio.titulo}`}</Text>
                            <Text style={styles.textoCaixa}>{`${anuncio.descricao}`}</Text>
                            <Text style={styles.textoCaixa}>{`R$ ${anuncio.preco}`}</Text>
                            <Text style={styles.textoCaixa}>{`Quantidade: ${anuncio.quantidade}`}</Text>
                        </TouchableOpacity>
                    </View>

                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'iceblue',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    anunciosContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 20,
    },
    caixaTeste: {
        backgroundColor: 'icegrey',
        padding: 20,
        marginBottom: 20,
        marginHorizontal: 10,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 5,
        width: '22%',
    },
    imagemProduto: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        marginBottom: 10,
    },
    textoCaixa: {
        fontSize: 20,
        textAlign: 'center',
    },
    botoesContainer: {
        position: 'absolute',
        top: 10,
        right: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
