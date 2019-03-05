import * as React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';

class Game extends React.Component {
  //trzeba zdefiniować typ od rodzica 
static propTypes = {
  //required = wymagany do uruchomienia
  randomNumberCount : PropTypes.number.isRequired,
};
//wylosuj pare liczb
  randomNumbers = Array
      .from({length:this.props.randomNumberCount})
      .map(()=>1 + Math.floor(10* Math.random()));
  //zsumuj czesc z nich
      target = this.randomNumbers
      .slice(0, this.props.randomNumberCount -2)
      .reduce((acc,curr) => acc + curr,0);
  //konstruktor
  render() {
    return ( 
      <View style={styles.container}>
        <Text style={styles.target}>{this.target}</Text>
        {this.randomNumbers.map((randomNumber, index) =>
        <Text> key={index}>{randomNumber}</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ddd',
    flex: 1,
    paddingTop: 30,
  },
  target: {
    fontSize: 40,
    backgroundColor: '#aaa',
    marginHorizontal: 50,
    textAlign: 'center',
  },
});
export default Game;
