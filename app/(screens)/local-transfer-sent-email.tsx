import { ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import EmailHeader from '@/components/EmailHeader'
import EmailReceipt from '@/components/EmailReceipt'
import EmailFooter from '@/components/EmailFooter'

const LocalTransferSentEmail = () => {
  return (
    <ScrollView>
       <SafeAreaView className='px-4 mt-3'>
      <EmailHeader 
      text='Polymer transfer'
      />

      <EmailReceipt 
      transactionType='Local Transfer'
      />
      <EmailFooter/>
    </SafeAreaView>
    </ScrollView>
   
  )
}

export default LocalTransferSentEmail