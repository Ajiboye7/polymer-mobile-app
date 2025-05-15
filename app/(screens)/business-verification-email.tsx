import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import EmailHeader from '@/components/EmailHeader'
import EmailBanner from '@/components/EmailBanner'
import EmailContent from '@/components/EmailContent'
import EmailFooter from '@/components/EmailFooter'

const BusinessVerificationEmail = () => {
  return (
   <SafeAreaView className='px-4 pt-3'>
    <EmailHeader 
    text='Polymer business'
    />
    <EmailBanner/>
    <EmailContent 
    headerText='Business verification' 
    message='To have total access to all the great features on our Polymer business account , verify your email using the link below for a smooth and easy transaction. '
    link='abbcebvcvbhh//ggddjhuhuffjjdddh/nig.com'
    //showFooterText={true}
    />
    <EmailFooter/>
   </SafeAreaView>
  )
}

export default BusinessVerificationEmail