/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  Button,
  StatusBar,
  ScrollView,
  ActivityIndicator,
  Text,
} from 'react-native';
import styles from './stylesCandidatos';
import {Toast} from '../../components/toast';
import {getStorageCand, setStorageCand} from '../../components/asyncStorage';

const Candidatos = ({navigation}) => {
  const [idUser, setIdUser] = useState(0);
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [candidatos, setCandidatos] = useState([]);
  const [verifyNome, setVerifyNome] = useState(true);
  const [verifyIdade, setVerifyIdade] = useState(true);
  const [statusData, setStatusData] = useState(false);
  const [statusSave, setStatusSave] = useState(false);

  useEffect(() => {
    let didCancel = true;
    const id = navigation.getParam('idUser');
    async function getData() {
      try {
        if (didCancel) {
          const value = await getStorageCand();
          if (value !== null) {
            setCandidatos(value);
            if (id !== undefined) {
              let result = JSON.parse(value);
              result = result.find(data => data.id === id);
              setIdUser(result.id);
              setNome(result.nome);
              setIdade(result.idade);
            }
          }
          setStatusData(true);
        }
      } catch (e) {
        console.log('Erro');
      }
    }
    getData();
    return () => {
      didCancel = false;
    };
  }, [candidatos, idUser, navigation]);

  const nomeCandidato = nome => {
    setNome(nome);
    setVerifyNome(true);
  };

  const idadeCandidato = idade => {
    setIdade(idade);
    setVerifyIdade(true);
  };

  const save = async () => {
    setStatusSave(true);
    let verificaNome = nome.trim();
    let statusNome = false;
    let statusIdade = false;
    if (verificaNome === '') {
      setVerifyNome(false);
      setNome('');
    } else {
      setVerifyNome(true);
      statusNome = true;
    }
    let verificaNumber = idade.replace(/\D+/g, '');
    if (!parseInt(verificaNumber) && verificaNumber === '') {
      setVerifyIdade(false);
      setIdade('');
    } else {
      setVerifyIdade(true);
      setIdade(verificaNumber);
      statusIdade = true;
    }

    if (statusNome && statusIdade) {
      if (idUser === 0) {
        let lista = [];
        try {
          if (candidatos.length > 0) {
            let verifcaId = [0];
            let listCand = JSON.parse(candidatos);
            listCand.map(result => {
              verifcaId.push(result.id);
            });
            let condition = 0;
            let id = 0;
            while (verifcaId.includes(condition)) {
              id = Math.floor(Math.random() * 65536);
              condition = id;
            }

            let dataSave = [
              {
                id,
                nome: nome,
                idade: verificaNumber,
                votos: 0,
              },
            ];

            listCand.map(data => {
              dataSave.push(data);
            });
            lista = dataSave;
          } else {
            let dataSave = [
              {
                id: Math.floor(Math.random() * 65536),
                nome: nome,
                idade: verificaNumber,
                votos: 0,
              },
            ];
            lista = dataSave;
          }
        } catch (error) {
          console.log('Erro');
        }

        try {
          await setStorageCand(JSON.stringify(lista));
          setNome('');
          setIdade('');
          setStatusSave(false);
          Toast('Candidato salvo com sucesso!');
          navigation.goBack();
        } catch (e) {
          console.log('Erro');
          setStatusSave(false);
        }
      } else {
        let resultCand = JSON.parse(candidatos);
        resultCand.find(result => {
          if (result.id === idUser) {
            result.nome = nome;
            result.idade = verificaNumber;
          }
        });
        await setStorageCand(JSON.stringify(resultCand));
        Toast('Candidato alterado com sucesso!');
        setStatusSave(false);
        navigation.goBack();
      }
    } else {
      setStatusSave(false);
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <ScrollView style={{backgroundColor: '#EAEFF2'}}>
        <View style={styles.body}>
          <View style={styles.sectionContainer}>
            {!statusSave ? (
              <View>
                <TextInput
                  style={styles.input}
                  placeholder="Digite o nome do candidato aqui"
                  onChangeText={e => nomeCandidato(e)}
                  value={nome}
                />
                {!verifyNome && (
                  <Text style={{color: 'red'}}>O campo nome é obrigatório</Text>
                )}

                <TextInput
                  style={styles.input}
                  placeholder="Digite a idade do candidato aqui"
                  keyboardType="numeric"
                  onChangeText={e => idadeCandidato(e)}
                  value={idade}
                />
                {!verifyIdade && (
                  <Text style={{color: 'red'}}>
                    O campo idade é obrigatório, insira somente números
                  </Text>
                )}
              </View>
            ) : (
              <View>
                <ActivityIndicator size="large" color="#FF5722" />
              </View>
            )}
          </View>
        </View>
        {statusData && (
          <View style={styles.buttonContainer}>
            <Button
              disabled={statusSave}
              onPress={() => save()}
              title="Salvar"
              color="#FF5722"
            />
          </View>
        )}
      </ScrollView>
    </>
  );
};

// const styles = StyleSheet.create({
//   body: {
//     backgroundColor: Colors.white,
//     flexDirection: 'column',
//     flex: 1,
//     marginLeft: 10,
//     marginRight: 10,
//     marginTop: 10,
//     paddingBottom: 10,
//     alignContent: 'space-around',
//   },
//   sectionContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     paddingHorizontal: 24,
//     margin: 10,
//   },
//   sectionTitle: {
//     fontSize: 30,
//     fontWeight: '600',
//     color: Colors.black,
//     alignSelf: 'center',
//   },
//   subSectionTitle: {
//     fontSize: 20,
//     fontWeight: '600',
//     color: Colors.black,
//     alignSelf: 'center',
//   },
//   buttonContainer: {
//     width: 300,
//     marginTop: 10,
//     fontWeight: '700',
//     flexDirection: 'column',
//     alignSelf: 'center',
//   },
//   input: {
//     height: 40,
//     backgroundColor: '#fff',
//     width: 280,
//     marginTop: 10,
//     borderBottomColor: '#d1d1d1',
//     borderBottomWidth: 1,
//   },
// });

export default Candidatos;
