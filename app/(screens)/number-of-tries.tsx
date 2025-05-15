import { View, Text, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@/constants'

const OneMinuteVerification = () => {
  return (
    <SafeAreaView className='flex-1 gap-10 items-center justify-center '>
        <View className="items-center">
          <View className="relative mb-3">
            <Image source={images.faceScan} />
            <Image
              source={images.warning}
              className="absolute top-[72px] left-16"
            />
          </View>

          <Image source={images.oops} />

          <Text className="w-[300px] text-[14px] text-secondary-600 font-semibold text-center my-5 ">
          You’ve reach the maximum number of tries allowed for this.
          </Text>

          <Text className='text-[14px] text-primary-300 font-gilroyBold underline'>Contact Support</Text>
        </View>
    </SafeAreaView>
  )
}

export default OneMinuteVerification