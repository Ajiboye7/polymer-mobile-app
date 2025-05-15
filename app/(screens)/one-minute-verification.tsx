import { View, Text, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@/constants'

const OneMinuteVerification = () => {
  return (
    <SafeAreaView className='flex-1 gap-10 items-center justify-center '>
        <Image 
        source={images.faceScan}
        className='w-[230px] h-[266px]'
        resizeMode='contain'
        />
        <Text className='text-[16px] text-center leading-[19.85px] text-secondary-600 font-semibold'>This will only take a minute to verify your {"\n"}identity.</Text>
    </SafeAreaView>
  )
}

export default OneMinuteVerification