import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import EmailHeader from '@/components/EmailHeader'
import EmailBanner from '@/components/EmailBanner'
import EmailContent from '@/components/EmailContent'
import EmailFooter from '@/components/EmailFooter'

const LoginSuccessfulEmail = () => {
  return (
   <SafeAreaView className='px-4 pt-3'>
    <EmailHeader 
    text='Polymer login'
    />
    <EmailBanner/>
    <EmailContent 
    headerText='Login successful'
    message='You have successfully logged into your Polymer account, if this was not you , click the link below to reset your password.'
    link='abbcebvcvbhh//ggddjhuhuffjjdddh/nig.com'
    showFooterText={true}
    />
    <EmailFooter/>
   </SafeAreaView>
  )
}

export default LoginSuccessfulEmail