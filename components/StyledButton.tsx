import { Pressable, Text, StyleSheet } from 'react-native'
import React from 'react'
import { COLOR } from '../constants'

const StyledButton = ({type, name}:{type:string, name:string}) => {
  return (
    <Pressable style={[styles.container, type === 'filled' ? styles.filledContainer :styles.outlinedContainer]}>
      <Text style={[styles.buttonText, type === 'filled' ? styles.filledText :styles.outlinedText]}>{name}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container:{
    height:50,
    alignItems:'center',
    justifyContent:'center',
     borderRadius:10,
     marginBottom:10
  },
  filledContainer:{
  backgroundColor:COLOR.primary,
  },
  outlinedContainer:{
    borderRadius:10,
    borderWidth:1,
    borderColor:COLOR.primary
  },
  buttonText:{
    fontSize:17,
    fontFamily:'Outfit_500Medium'
  },
  filledText:{
    color:COLOR.secondary,
  },
  outlinedText:{
    color:COLOR.primary
  }

})

export default StyledButton