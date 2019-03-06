import * as React from 'react';
import PropTypes from 'prop-types';
import RandomNumber from './RandomNumber';
import { View, Text, TouchableOpacity, StyleSheet,Button } from 'react-native';
import shuffle from 'lodash.shuffle';

class Game extends React.Component {
  //trzeba zdefiniować typ od rodzica
  static propTypes = {
    //required = wymagany do uruchomienia
    randomNumberCount: PropTypes.number.isRequired,
    initialSeconds: PropTypes.number.isRequired,
    onPlayAgain:PropTypes.func.isRequired,
  };
  //status zaznaczinych elementow
  state = {
    selectedIds: [],
    remainingSeconds: this.props.initialSeconds,
  };
  //definicja statusu gry
  gameStatus = 'PLAYING';
  //wylosuj pare liczb
  randomNumbers = Array.from({ length: this.props.randomNumberCount }).map(
    () => 1 + Math.floor(10 * Math.random())
  );
  //zsumuj czesc z nich
  target = this.randomNumbers
    .slice(0, this.props.randomNumberCount - 2)
    .reduce((acc, curr) => acc + curr, 0);
  //losowanie miejsc dla odpowiedzi
randomNumbers = shuffle(this.randomNumbers);
  //kiedy komponent sie zaladowal
  componentDidMount() {
    this.intervalId = setInterval(() => {
      this.setState(
        prevState => {
          return { remainingSeconds: prevState.remainingSeconds - 1 };
        },
        () => {
          if (this.state.remainingSeconds === 0) {
            clearInterval(this.intervalId);
          }
        }
      );
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.intervalId);
  }
  //wskaz zaznaczone
  isNumberSelected = numberIndex => {
    return this.state.selectedIds.indexOf(numberIndex) >= 0;
  };
  //zaznacz obiekt, kopiuje caly array i wpisuje nowy
  selectNumber = numberIndex => {
    this.setState(prevState => ({
      selectedIds: [...prevState.selectedIds, numberIndex],
    }));
  };
  componentWillUpdate(nextProps, nextState) {
    //kiedy przeliczamy status gry?
    if (
      nextState.selectedIds !== this.state.selectedIds ||
      nextState.remainingSeconds === 0
    ) {
      this.gameStatus = this.calcGameStaus(nextState);
      if (this.gameStatus !== 'PLAYING') {
        clearInterval(this.intervalId);
      }
    }
  }
  //status gry:WIN/LOSE
  calcGameStaus = nextState => {
    const sumSelected = nextState.selectedIds.reduce((acc, curr) => {
      return acc + this.randomNumbers[curr];
    }, 0);
    if (nextState.remainingSeconds === 0) {
      return 'LOST';
    }
    if (sumSelected < this.target) {
      return 'PLAYING';
    }
    if (sumSelected === this.target) {
      return 'WON';
    }
    if (sumSelected > this.target) {
      return 'LOST';
    }
  };
  //konstruktor
  render() {
    const gameStatus = this.gameStatus;
    return (
      <View style={styles.container}>
        <Text style={[styles.target, styles[`STATUS_${gameStatus}`]]}>
          {this.target}
        </Text>
        <View style={styles.randomContainer}>
          {this.randomNumbers.map(
            (randomNumber, index) => (
              <RandomNumber
                key={index}
                id={index}
                number={randomNumber}
                isDisabled={
                  this.isNumberSelected(index) || gameStatus !== 'PLAYING'
                }
                onPress={this.selectNumber}
              />
            )
            
          )}
        </View>
        <Button title="Play again" onPress={this.props.onPlayAgain}/>
        <Text
          style={[
            styles.STATUS_LOST,
            styles.STATUS_WON,
            styles.STATUS_PLAYING,
          ]}>
          {this.props.remainingSeconds}
        </Text>
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

  randomContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  /*random:{
    backgroundColor:'#999',
    width:100,
    marginHorizontal:15,
    marginVertical:25,
    fontSize:35,
    textAlign:'center'

  },*/
  STATUS_PLAYING: {
    backgroundColor: '#bbb',
    textAlign: 'center',
  },
  STATUS_WON: {
    backgroundColor: 'green',
  },
  STATUS_LOST: {
    backgroundColor: 'red',
  },
});
export default Game;
