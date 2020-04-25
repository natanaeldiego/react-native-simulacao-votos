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
  Image,
  StatusBar,
  Text,
  ScrollView,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

import more_vert from '../../assets/img/more_vert.png';
import styles from './styles';
import {Toast} from '../../components/toast';
import {
  getStorageCand,
  setStorageCand,
  getStorageVot,
  setStorageVotos,
} from '../../components/asyncStorage';

const Index = ({navigation}) => {
  const [candidatos, setCandidatos] = useState([]);
  const [totalVotos, setTotalVotos] = useState([]);
  const [statusData, setStatusData] = useState(true);

  useEffect(() => {
    let didCancel = true;
    async function getData() {
      try {
        if (didCancel) {
          const value = await getStorageCand();
          const totVotos = await getStorageVot();
          if (value !== null) {
            setCandidatos(JSON.parse(value));
          }
          if (totVotos !== null) {
            setTotalVotos(JSON.parse(totVotos));
          }
          setStatusData(false);
        }
      } catch (e) {
        console.log('Erro');
      }
    }
    getData();
    return () => {
      didCancel = false;
    };
  }, [candidatos]);

  const actionCandidato = (idUser, nomeUser) => {
    Alert.alert(
      'Atenção!',
      'O que deseja fazer?',
      [
        {
          text: 'Alterar',
          onPress: () =>
            navigation.navigate('Candidatos', {
              idUser,
            }),
          style: 'cancel',
        },
        {text: 'Remover', onPress: () => removerCandidato(idUser, nomeUser)},
      ],
      {cancelable: false},
    );
  };

  const removerCandidato = (idUser, nomeUser) => {
    Alert.alert(
      'Atenção!',
      `Deseja remover o condidato: ${nomeUser}?`,
      [
        {
          text: 'Não',
          onPress: () => console.log('OK Cancel'),
          style: 'cancel',
        },
        {text: 'Sim', onPress: () => remove(idUser)},
      ],
      {cancelable: false},
    );
  };

  const remove = async idUser => {
    let resultCand = candidatos.filter(result => result.id !== idUser);
    let resultVotos = totalVotos.filter(data => data.idVoto !== idUser);
    if (JSON.stringify(resultCand).length > 0) {
      await setStorageCand(JSON.stringify(resultCand));
    }
    if (JSON.stringify(resultVotos).length > 0) {
      await setStorageVotos(JSON.stringify(resultVotos));
    }
    setCandidatos(resultCand);
    Toast('Candidato removido com sucesso!');
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <ScrollView style={styles.geral}>
        {statusData ? (
          <View>
            <ActivityIndicator size="large" color="#FF5722" />
          </View>
        ) : (
          <View style={styles.geralBody}>
            {candidatos.length > 0 ? (
              candidatos.map(result => (
                <View key={result.id} style={styles.body}>
                  <View style={styles.sectionContainer}>
                    <Text style={styles.nomeCand}>{result.nome}</Text>
                    <Text style={styles.idadeCand}>{result.idade} anos</Text>
                  </View>
                  <View style={styles.actionContainer}>
                    <TouchableOpacity
                      onPress={() => actionCandidato(result.id, result.nome)}
                      style={styles.touch}>
                      <Image source={more_vert} style={styles.imgem} />
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            ) : (
              <View style={styles.body}>
                <View style={styles.sectionContainer}>
                  <Text style={styles.nomeCand}>
                    Nenhum candidato cadastrado
                  </Text>
                </View>
              </View>
            )}
          </View>
        )}
      </ScrollView>
      <ActionButton
        renderIcon={active => (
          <Icon name="md-add" style={styles.actionButtonIcon} />
        )}
        position="right"
        buttonColor="#FF5722"
        onPress={() => navigation.navigate('Candidatos')}
      />
    </>
  );
};

export default Index;
