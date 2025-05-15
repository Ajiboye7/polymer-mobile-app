import { View, Text, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@/constants'
import Button from '@/components/Button'

const VerifcationNetworkError = () => {
  return (
    <SafeAreaView className="flex-1 px-5 bg-white justify-center">
        <View className="items-center">
          <View className="relative mb-3">
            <Image source={images.oppsRetry} />
            <Image
              source={images.exclamation}
              className="absolute bottom-[80px] left-[120px]"
            />
          </View>

          <Text className="w-[300px] text-[14px] text-secondary-600 font-semibold text-center my-5 ">
          We ran into trouble trying to connect to the server. You may need to check your network and try again.
          </Text>
        </View>
        <Button title="Retry" buttonStyle="my-10 h-[49.77px] w-full" />
    </SafeAreaView>
  )
}

export default VerifcationNetworkError;