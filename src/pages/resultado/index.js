import React, {useEffect, useState} from 'react';
import {View, ScrollView, Text, ActivityIndicator} from 'react-native';
import {PieChart} from 'react-native-svg-charts';
import styles from './styles';
import {getStorageCand, getStorageVot} from '../../components/asyncStorage';

const Index = () => {
  const [candidatos, setCandidatos] = useState([]);
  const [totalVotos, setTotalVotos] = useState([]);
  const [statusData, setStatusData] = useState(true);

  const totalCandidatos = [];

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

  let votosValidos = 0;
  let votosNulos = 0;
  let votosBrancos = 0;

  if (totalVotos.length > 0) {
    let verificaPassIds = [];
    totalVotos.map(result => {
      candidatos.find(dataCand => {
        if (
          dataCand.id === result.idVoto &&
          !verificaPassIds.includes(result.idVoto)
        ) {
          totalCandidatos.push({
            nome: dataCand.nome,
            totalVotos: result.votos,
          });
          votosValidos += result.votos;
          verificaPassIds.push(result.idVoto);
        }

        if (result.idVoto === 1 && !verificaPassIds.includes(result.idVoto)) {
          totalCandidatos.push({
            nome: 'Voto nulo',
            totalVotos: result.votos,
          });
          votosNulos += result.votos;
          verificaPassIds.push(result.idVoto);
        }

        if (result.idVoto === 2 && !verificaPassIds.includes(result.idVoto)) {
          totalCandidatos.push({
            nome: 'Voto em branco',
            totalVotos: result.votos,
          });
          votosBrancos += result.votos;
          verificaPassIds.push(result.idVoto);
        }
      });
    });
  }

  const votosVotos = {
    validos: votosValidos,
    nulos: votosNulos,
    brancos: votosBrancos,
  };

  const totalEleitores =
    votosVotos.validos + votosVotos.nulos + votosVotos.brancos;

  totalCandidatos.sort(function(a, b) {
    if (a.totalVotos < b.totalVotos) {
      return 1;
    }
    if (a.totalVotos > b.totalVotos) {
      return -1;
    }
    // a must be equal to b
    return 0;
  });

  let data = totalCandidatos.map(result => result.totalVotos);

  const randomColor = () =>
    ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(
      0,
      7,
    );
  const pieData = data
    .sort()
    .reverse()
    .filter(value => value > 0)
    .map((value, index) => ({
      value,
      svg: {
        fill: randomColor(),
        onPress: () => console.log('press', index),
      },
      key: `pie-${index}`,
    }));

  const dataStyle = cor => {
    let style = {
      width: 20,
      height: 20,
      backgroundColor: cor,
      marginLeft: 10,
    };
    return style;
  };

  return (
    <ScrollView style={styles.geral}>
      <View style={styles.MainContainer}>
        <View style={styles.sectionTopo}>
          <Text style={styles.text}> Resultado </Text>
          <Text style={styles.textTotalEleitor}>
            {' '}
            Total de eleitores: {totalEleitores}{' '}
          </Text>
        </View>
        <View style={styles.sectionVotos}>
          <Text style={styles.textTotalEleitor}>
            Votos válidos: {votosVotos.validos}
          </Text>
          <Text style={styles.textTotalEleitor}>
            Votos nulos: {votosVotos.nulos}
          </Text>
          <Text style={styles.textTotalEleitor}>
            Votos em branco: {votosVotos.brancos}
          </Text>
        </View>
        <View style={styles.sectionDivider} />
        <View style={styles.sectionCandidatos}>
          {totalCandidatos.map((result, indice) => (
            <Text key={indice} style={styles.textTotalEleitor}>
              {result.nome}: {result.totalVotos} voto(s)
            </Text>
          ))}
        </View>
        {statusData && (
          <View>
            <ActivityIndicator size="large" color="#FF5722" />
          </View>
        )}
        {pieData.length > 0 && (
          <View style={styles.sectionContainer}>
            <View style={styles.sectionCont}>
              <PieChart
                style={{height: 100, flex: 1}}
                outerRadius="100%"
                innerRadius="25%"
                data={pieData}
              />
            </View>
            <View style={styles.sectionPorcVotos}>
              {pieData.map((result, indice) => (
                <View key={indice} style={styles.lineVotos}>
                  <Text>{result.value}% de voto(s)</Text>
                  <Text style={dataStyle(result.svg.fill)} />
                </View>
              ))}
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default Index;
