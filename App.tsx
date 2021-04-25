import React, { useEffect } from 'react';
import * as Notifications from 'expo-notifications'
import AppLoading from 'expo-app-loading'
import Routes  from './src/routes';
import { PlantProps } from './src/libs/storage';

import
 {
        useFonts,
        Jost_400Regular,
        Jost_600SemiBold
}from '@expo-google-fonts/jost'



export default function App()
{
const[fontsLoaded ] = useFonts({
  Jost_400Regular,
  Jost_600SemiBold
});

useEffect( ()=> {
  const subscription = Notifications.addNotificationReceivedListener(
    async notification => {
        const data = notification.request.content.data.plant as PlantProps
        console.log(data)
      })
      return () => subscription.remove()//escuta as notificações
      /*async function notifications() {
        
          const data = await Notifications.getAllScheduledNotificationsAsync()
          console.log("NOTIFICAÇÕES AGENDADAS")
          console.log(data)///Vê as notificações agendadas

      }
      notifications()*/
},[])


if(!fontsLoaded)
return <AppLoading/>


  return(
       < Routes/>
  );
}

