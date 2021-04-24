
import { Text,StyleSheet,FlatList,Image, View,ActivityIndicator} from 'react-native'
import colors from '../styles/colors'
import {Header} from '../components/Header'
import React, { useEffect, useState } from 'react'
import fonts from '../styles/fonts'
import { EnvironmentButton } from '../components/EnvironmentButton'
import api from '../Services/api'

import {} from 'react'


import { PlantCardPrimary } from '../components/PlantCardPrimary'
import { Load } from '../components/Load'
import { color } from 'react-native-reanimated'
import { useNavigation } from '@react-navigation/core'
import { PlantProps } from '../libs/storage'
interface EnvironmentProps
    {
        key:string
        title:string
    }
   

export function PlantSelect()
{
    
    const [environment,setEnvironments] = useState<EnvironmentProps[]>([])
   // const [plants,setPlants] = useState<PlantProps[]>([])
    const[plants,setPlants] = useState<PlantProps[]>([])
    const[filteredPlants,setFilteredPlants] = useState<PlantProps[]>([])
    const [environmentSelected, setEnvironmentSelected] = useState('all')
    const [loading,setLoading] = useState(true)
    const [page,setPage] = useState(1)
    const [loadingMore,setLoadingMore] = useState(false)
    const navigation = useNavigation()
        function handleEnvironmentSelected(environment:string)
        {   
            setEnvironmentSelected(environment)
            if(environment ==="all")
            {
                return setFilteredPlants(plants)
            }
            const filtered = plants.filter(plant=>
                plant.environments.includes(environment));
            setFilteredPlants(filtered);
        }

        function handleFetchMore(distance:number)
        {
            if(distance<1)
            {
                return
            }
            else{
                setLoadingMore(true)
                setPage(oldValue => oldValue + 1)
                fetchPlants()
            }
        }

        function  handlePlantSelect(plant:PlantProps)
        {
            navigation.navigate('PlantSave',{plant})
        }

        useEffect(()=>{
            async function fetchPlants()
            {
                const{data} = await api.get(`plants?_sort=name&order=asc`)
            }
        })
        useEffect(()=>{
        async function fetchEnvironment() {
            const {data} = await api.get('plants_environments?_sort=title&_order=asc')
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
       
        fetchPlants()
    },[])

    async function fetchPlants() {
        const {data} = await api.get(`plants?_sort=name&_order=asc&_page=${page}&_limit=8`)
        if(!data)
        {
            return setLoading(true)
        }
        if(page>1)
        {
            setPlants(oldValue =>[...oldValue,...data])
            setFilteredPlants(oldValue =>[...oldValue,...data])
        }
        else
        {
            setPlants(data)
            setFilteredPlants(data)
        }
        setPlants(data)
        setLoading(false)
        setLoadingMore(false)
    }


    if(loading)
    {
        return <Load></Load>
    }
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
                    keyExtractor={(item)=>String(item.key)}
                    renderItem = {( {item})=> (
                        <EnvironmentButton
                        title={item.title}
                        active = {item.key===environmentSelected}
                        onPress = {() => handleEnvironmentSelected(item.key)}
                      />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                  
                    ListHeaderComponent={<View />}
                    ListHeaderComponentStyle={{ marginRight: 32 }}
                  
                  />

                    
                    
             

                   
                </View>
                             
                <View style = {styles.plants}>
                    <FlatList
                    keyExtractor={(item)=>String(item.name)}
                    data = {filteredPlants}
                    
                    renderItem = {({item})=> (
                        <PlantCardPrimary 
                        data = {item}
                        onPress = {()=>handlePlantSelect(item)}
                        />
                      
                       
                    )}
                    
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    onEndReachedThreshold = {0.1}
                    onEndReached={({distanceFromEnd})=>
                    handleFetchMore(distanceFromEnd)
                    
                }
                    
                    ListFooterComponent = 
                    {
                        loadingMore 
                        ?<ActivityIndicator color={colors.green}
                    />: <></>
                    }
                    />
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

