import {Colors} from 'react-native/Libraries/NewAppScreen';

export default {
  body: {
    backgroundColor: Colors.white,
    flex: 1,
    flexDirection: 'column',
  },
  sectionTopo: {
    flex: 2,
    paddingHorizontal: 24,
  },
  sectionContainer: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 30,
    fontWeight: '600',
    color: Colors.black,
    alignSelf: 'center',
  },
  subSectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.black,
    alignSelf: 'center',
  },
  buttonContainer: {
    width: 300,
    marginTop: 20,
  },
  imgem: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginTop: 50,
  },
  createForgot: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  titulo: {
    height: 30,
    marginBottom: 10,
  },
  textoTitulo: {
    color: '#FF5722',
    flexDirection: 'row',
    alignSelf: 'center',
    fontSize: 25,
    fontWeight: '700',
  },
};
