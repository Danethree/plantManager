//import React { useEffect, useState,AnimationEventHandler} from 'react'
import React, { useEffect, useState } from 'react'
import { View,Text,StyleSheet,FlatList,Image} from 'react-native'
import colors from '../styles/colors'
import {Header} from '../components/Header'
import fonts from '../styles/fonts'
import { EnvironmentButton } from '../components/EnvironmentButton'
import api from '../Services/api'
import { PlantCardPrimary } from '../components/PlantCardPrimary'
interface EnvironmentProps
    {
        key:string
        title:string
    }
    interface PlantProps
    {
        id: string,
        name: string,
        about: string,
        water_tips: string,
        photo: string,
        environments: [string],
        frequency: {
          times: number,
          repeat_every: string
    }
    }

export function PlantSelect()
{
    
    const [environment,setEnvironments] = useState<EnvironmentProps[]>([])
   // const [plants,setPlants] = useState<PlantProps[]>([])
    const[plants,setPlants] = useState<PlantProps[]>([])


   
        useEffect(()=>{
        async function fetchEnvironment() {
            const {data} = await api.get('plants_environments')
            setEnvironments([
                {
                    key:'all',
                    title:'Todos',
            
                },
               ...data
            ])
        }
        fetchEnvironment()
    },[])
    useEffect(() => {
        async function fetchPlants() {
            const {data} = await api.get('plants')
            setPlants(data)
        }
        fetchPlants()
    },[])

    return (
          <View style = {styles.container}>
              <View style = {styles.header}>
                        <Header></Header>
                        <Text style = {styles.title}>Em qual ambiente </Text>
                        <Text style = {styles.subtitle}>você quer colocar sua planta?</Text>
                 </View>
                <View>
                    <FlatList 
                    data = {environment}
                    
                    renderItem = {( {item})=> (
                        <EnvironmentButton 
                        title={item.title}
                      
                      />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.environmentList}
                    ListHeaderComponent={<View />}
                    ListHeaderComponentStyle={{ marginRight: 32 }}
                  />

                    
                    
                  
                <View style = {styles.plants}>
                    <FlatList
                    data = {plants}
                    
                    renderItem = {({item})=> (
                        <PlantCardPrimary data = {item}/>
                    )}
                    
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                   
                    />

                   
                </View>

                </View>


        </View>




    )

    }
    const styles = StyleSheet.create({
        header:
        {
            paddingHorizontal:30
        },
        container:{
            flex:1,
            backgroundColor: colors.background,
          
        },
        title:
        {
                fontSize:17,
                color: colors.heading,
                fontFamily:fonts.heading,
                lineHeight: 20,
                marginTop:15
        },
        subtitle:
        {
            fontSize:17,
            color: colors.heading,
            fontFamily:fonts.text,
            lineHeight: 20,
            
        },
        environmentList:
        {
            height:40,
            justifyContent:'center',
            paddingBottom: 5,
            marginLeft: 32,
            marginVertical:32
        },
        plants:
        {
            flex:1,
            paddingHorizontal:32,
            justifyContent:'center',
            
            
        },
        contentContainerStyle:
        {
            
        }
    })

