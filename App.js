import React,{ useState, useEffect } from 'react';
import { 
          StyleSheet, 
          Text, 
          View,
          TouchableOpacity,
          Image  } from 'react-native';
import ChoiceCard from './component/ChoiceCard'



const getRoundOutcome = userChoice => {
  const computerChoice = randomComputerChoice().name;
  let result;

  if (userChoice === 'rock') {
    result = computerChoice === 'scissors' ? 'Victory!' : 'Defeat!';
  }
  if (userChoice === 'paper') {
    result = computerChoice === 'rock' ? 'Victory!' : 'Defeat!';
  }
  if (userChoice === 'scissors') {
    result = computerChoice === 'paper' ? 'Victory!' : 'Defeat!';
  }

  if (userChoice === computerChoice) result = 'Tie game!';
  return [result, computerChoice];
};

const randomComputerChoice = () =>
  CHOICES[Math.floor(Math.random() * CHOICES.length)];



const CHOICES = [
  {
    name: 'rock',
    uri: require('./assets/stone.png')
  },
  {
    name: 'paper',
    uri: require('./assets/paper.png')
  },
  {
    name: 'scissors',
    uri:
    require('./assets/scissors.png')
  }
];

const Button = props => (

  <TouchableOpacity
    style={styles.buttonStyle}
    onPress={() => {
      props.onPress(props.name)
    }
      }
  >
    <Text style={styles.buttonText}>
      {props.name.charAt(0).toUpperCase() + props.name.slice(1)}
    </Text>
  </TouchableOpacity>
);


      

export default function App() {
    //infomation
      //games
      const [totalGame,setTotalGame] = useState(0);
      const [winGame,setWinGame] = useState(0);
      const [loseGame,setLoseGame] = useState(0);
      const [tieGame,setTieGame] = useState(0);
      //percentages
      const [winPerGame,setWinPerGame] = useState(0);
      const [losePerGame,setLosePerGame] = useState(0);
      const [tiePerGame,setTiePerGame] = useState(0);
    //control game
    const [gamePrompt,setGamePrompt]= useState('Chose your weapon!');
    const [userChoice, setUserChoice] = useState({});
    const [computerChoice, setComputerChoice] = useState({});

    
  
      
    //playgame button
      onPress = (playerChoice) => {
      const [result, compChoice] = getRoundOutcome(playerChoice);     
      const newUserChoice = CHOICES.find(choice => choice.name === playerChoice);
      const newComputerChoice = CHOICES.find(choice => choice.name === compChoice);
      
          switch(result){
            case 'Victory!':
                setWinGame(winGame+1);
                setTotalGame(totalGame+1)
              break
            case 'Defeat!':
                setLoseGame(loseGame+1);
                setTotalGame(totalGame+1)
              break
            case 'Tie game!':
                setTieGame(tieGame+1);
                setTotalGame(totalGame+1)
              break  
          }
      setGamePrompt(result);
      setUserChoice(newUserChoice);
      setComputerChoice(newComputerChoice);
     
    };
 
    const getResultColor = () => {
      if (gamePrompt === 'Victory!') return 'green';
      if (gamePrompt === 'Defeat!') return 'red';
      return null;
    }
    useEffect(()=>{
      setWinPerGame(Math.round((winGame/totalGame)*100));
      setLosePerGame(Math.round((loseGame/totalGame)*100));
      setTiePerGame(100-(Math.round((winGame/totalGame)*100)+Math.round((loseGame/totalGame)*100)));
    },[winGame,loseGame,tieGame,totalGame])

    
    return (
      <View style={styles.container}>
        <Text style={{fontSize:35,color:getResultColor()}}>{gamePrompt}</Text>
        <View style={styles.choicesContainer}>
        <ChoiceCard
          player="Player"
          choice={userChoice}
          />
        <Text>vs</Text>
        <ChoiceCard
          player="Computer"
          choice={computerChoice}
        />
        </View>
        <View style={styles.controlGame}>
          <View style={styles.infoGame}>
              <Text style={styles.titleInfo}>Games: {totalGame}</Text>
              <Text style={{color:'green'}}>Win: {winGame}</Text>
              <Text style={{color:'red'}}>Lose: {loseGame}</Text>
              <Text>Tie: {tieGame}</Text>
          </View>
          <View style={styles.infoGame}>
            {
                CHOICES.map(choice => {
                  return <Button 
                  key={choice.name} 
                  name={choice.name} 
                  onPress={this.onPress} 
                  />;
                })
            }
          </View>
            
          <View style={styles.infoGame}>
              <Text style={styles.titleInfo}>Percentages</Text>
              <Text style={{color:'green'}}>Win: {winPerGame}%</Text>
              <Text style={{color:'red'}}>Lose: {losePerGame}%</Text>
              <Text>Tie: {tiePerGame}%</Text>
          </View>
        </View>
                  
      </View>
    
    )
  
}

 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e9ebee',
    paddingTop:15
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
    width: 200,
    margin: 10,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#640D14',
  },
  buttonText: {
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
  },
  choicesContainer: {
    margin: 10,
    borderWidth: 2,
    paddingTop: 100,
    shadowRadius: 5,
    paddingBottom: 100,
    borderColor: 'grey',
    shadowOpacity: 0.90,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'space-around',
    shadowColor: 'rgba(0,0,0,0.2)',
    shadowOffset: { height: 5, width: 5 },
  },
  controlGame: {
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-around'
  },
  infoGame: {
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center'
  },
  titleInfo: {
    fontSize:16,
    fontWeight:'bold',
    marginBottom:7
  }

});

