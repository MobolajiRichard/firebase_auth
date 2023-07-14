import {View, TextInput, StyleSheet} from 'react-native'
import {COLOR} from '../constants'

export default function FormInput({name}:{name:string}){
    return(
        <View style={styles.container}>
            <TextInput placeholder={name} placeholderTextColor={COLOR.primaryGrey}/>
        </View>
    )
}

const styles= StyleSheet.create({
container:{
    borderRadius:10,
    borderColor: COLOR.primaryGrey,
    height:50,
    borderWidth:1,
    justifyContent:'center',
    paddingLeft:20,
    marginTop:20

}
})