import * as React from 'react';
import Game from './Game';

class App extends React.Component{
  state= {
    gameId:1,
  };
resetGame= () =>{
  this.setState((prevState)=>{
    return{gameId:prevState.gameId+1};
  })
}
  render(){
    return(
      //nadajac nowe gameID resetuje komponent
      //randomNumber - ile liczb  ma byc do wyboru
      //initalSeconds - ile czasu trwa runda
     <Game key={this.state.gameId} 
     onPlayAgain={this.resetGame}
     randomNumberCount={6} 
     initialSeconds={10}/>
    );
  }
}

export default App;