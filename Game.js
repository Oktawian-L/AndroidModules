import * as React from 'react';
import PropTypes from 'prop-types';
import RandomNumber from './RandomNumber'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

class Game extends React.Component {
  //trzeba zdefiniować typ od rodzica 
static propTypes = {
  //required = wymagany do uruchomienia
  randomNumberCount : PropTypes.number.isRequired,
};
//status zaznaczinych elementow
state = {
  selectedNumbers:[0,4],
};
//wylosuj pare liczb
  randomNumbers = Array
      .from({length:this.props.randomNumberCount})
      .map(()=>1 + Math.floor(10* Math.random()));
  //zsumuj czesc z nich
      target = this.randomNumbers
      .slice(0, this.props.randomNumberCount -2)
      .reduce((acc,curr) => acc + curr,0);

  //wskaz zaznaczone
  isNumberSelected= (numberIndex) =>{
    return this.state.selectedNumbers.indexOf(numberIndex) >=0;
  }
  //zaznacz obiekt, kopiuje caly array i wpisuje nowy
  selectNumber = (numberIndex) =>{
    this.setState((prevState)=>({
      selectedNumbers:[...prevState.selectedNumbers,numberIndex],
    }));
  }
  //konstruktor
  render() {
    return ( 
      <View style={styles.container}>
        <Text style={styles.target}>{this.target}</Text>
        <View style = {styles.randomContainer}>
        {this.randomNumbers.map((randomNumber, index) =>
        <RandomNumber 
          key={index} 
          id={index}
          number={randomNumber}
          isDisabled={this.isNumberSelected(index)}
          onPress ={this.selectNumber}
        />
        //<Text style={styles.random} key={index}>{randomNumber}</Text>
        )}
        </View>
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
    fontSize: 50,
    backgroundColor: '#bbb',
    margin: 50,
    textAlign: 'center',
  },

  randomContainer:{
    flex : 1,
    flexDirection: 'row',
    flexWrap:'wrap',
    justifyContent:'space-around',
  },
  /*random:{
    backgroundColor:'#999',
    width:100,
    marginHorizontal:15,
    marginVertical:25,
    fontSize:35,
    textAlign:'center'

  },*/
});
export default Game;
