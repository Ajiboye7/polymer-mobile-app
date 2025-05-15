import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import EmailHeader from '@/components/EmailHeader'
import EmailBanner from '@/components/EmailBanner'
import EmailContent from '@/components/EmailContent'
import EmailFooter from '@/components/EmailFooter'

const BusinessAccountEmail = () => {
  return (
    <SafeAreaView className='px-4 pt-3'>
      <EmailHeader
      text='Polymer business'
      />
      <EmailBanner/>

      <EmailContent 
      headerText='Business account'
      message='Your business account ( name of business ) has been successfully created , you can now make local and international transfers with ease, check out the app for more business benefits.'
      //showFooterText={true}
      />

      <EmailFooter/>
      
    </SafeAreaView>
  )
}

export default BusinessAccountEmail