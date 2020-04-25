import {Colors} from 'react-native/Libraries/NewAppScreen';

export default {
  body: {
    backgroundColor: Colors.white,
    flexDirection: 'column',
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    paddingBottom: 10,
    alignContent: 'space-around',
  },
  sectionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 24,
    margin: 10,
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
    marginTop: 10,
    fontWeight: '700',
    flexDirection: 'column',
    alignSelf: 'center',
  },
  input: {
    height: 40,
    backgroundColor: '#fff',
    width: 280,
    marginTop: 10,
    borderBottomColor: '#d1d1d1',
    borderBottomWidth: 1,
  },
};
