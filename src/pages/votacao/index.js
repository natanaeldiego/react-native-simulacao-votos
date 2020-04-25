import React, {useEffect, useState} from 'react';
import {View, ScrollView, Text, Button, ActivityIndicator} from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import styles from './styles';
import {Toast} from '../../components/toast';
import {
  getStorageCand,
  getStorageVot,
  setStorageVotos,
} from '../../components/asyncStorage';

const Index = ({navigation}) => {
  const [idVotoCandidato, setIdVotoCandidato] = useState(1);
  const [candidatos, setCandidatos] = useState([]);
  const [totalVotos, setTotalVotos] = useState([]);
  const [statusData, setStatusData] = useState(true);

  const radio_votosInvalid = [
    {
      label: 'Voto em branco',
      value: 2,
    },
    {
      label: 'Voto nulo',
      value: 1,
    },
  ];
  const radio_candidatos = [];

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (candidatos.length > 0) {
    candidatos.map(result => {
      radio_candidatos.push({
        label: result.nome,
        value: result.id,
      });
    });
    radio_candidatos.sort(function(a, b) {
      if (a.nome > b.totalVotos) {
        return 1;
      }
      if (a.nome < b.totalVotos) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });

    radio_votosInvalid.map(v => radio_candidatos.unshift(v));
  }

  const votaCandidato = async () => {
    let result = radio_candidatos;
    let resultTotalVotos = totalVotos;
    if (result.length > 0) {
      result = result.find(data => data.value === idVotoCandidato);
      if (result !== undefined && JSON.stringify(result).length > 0) {
        let totVot = resultTotalVotos.find(
          data => data.idVoto === idVotoCandidato,
        );
        if (totVot !== undefined && JSON.stringify(totVot).length > 0) {
          resultTotalVotos.find(data => {
            if (data.idVoto === idVotoCandidato) {
              data.votos += 1;
            }
          });
          if (
            resultTotalVotos !== undefined &&
            JSON.stringify(resultTotalVotos).length > 0
          ) {
            await setStorageVotos(JSON.stringify(resultTotalVotos));
            Toast('Votação realizada com sucesso!');
            navigation.goBack();
          }
        } else {
          let dataVoto = [
            {
              idVoto: idVotoCandidato,
              votos: 1,
            },
          ];

          totalVotos.map(data => {
            dataVoto.push(data);
          });

          await setStorageVotos(JSON.stringify(dataVoto));
          Toast('Votação realizada com sucesso!');
          navigation.goBack();
        }
      }
    }
  };

  return (
    <ScrollView style={styles.geral}>
      <View style={styles.MainContainer}>
        <View style={styles.sectionTopo}>
          <Text style={styles.text}> Eleições Sindicais</Text>
          <Text style={styles.subtText}>
            {' '}
            {radio_candidatos.length > 0
              ? 'Selecione o candidato que deseja votar e clique em salvar'
              : 'Nenhum candidato encontrado no momento, vá na opção cadastrar candidatos e realize um ou mais cadastros'}
          </Text>
        </View>
        <View style={styles.sectionDivider} />

        {statusData ? (
          <View>
            <ActivityIndicator size="large" color="#FF5722" />
          </View>
        ) : (
          <View style={styles.sectionCandidatos}>
            <RadioForm
              radio_props={radio_candidatos}
              initial={0}
              buttonColor={'#000'}
              buttonSize={7}
              selectedButtonColor={'#FF7043'}
              selectedLabelColor={'#FF7043'}
              onPress={value => setIdVotoCandidato(value)}
            />
          </View>
        )}
      </View>
      {radio_candidatos.length > 0 && (
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => votaCandidato()}
            title="Salvar"
            color="#FF5722"
          />
        </View>
      )}
    </ScrollView>
  );
};

export default Index;
