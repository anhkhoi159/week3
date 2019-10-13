import React from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native'

export default function ChoiceCard(props){
    const player = props.player
    const choice = props.choice
    const uri = choice.uri
    const title = choice.name && choice.name.charAt(0).toUpperCase() + choice.name.slice(1);
    
    return (
      <View style={styles.choiceContainer}>
        <Text style={styles.choiceDescription}>{player}</Text>
        <Image source={choice.uri} resizeMode="contain" style={styles.choiceImage} />
        <Text style={styles.choiceCardTitle}>{title}</Text>
      </View>
    );
}

const styles = StyleSheet.create({
    choiceContainer: {
        flex: 1,
        alignItems: 'center',
      },
      choiceDescription: {
        fontSize: 25,
        color: '#250902',
        fontWeight: 'bold',
        textDecorationLine: 'underline'
      },
      choiceCardTitle: {
        fontSize: 30,
        color: '#250902'
      },
      choiceImage: {
        width: 150,
        height: 150,
        padding: 10,
      }

})