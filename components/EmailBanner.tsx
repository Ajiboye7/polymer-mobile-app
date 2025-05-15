import { View, Text, Image } from 'react-native'
import { icons } from '@/constants'
import React from 'react'
import { EmailBannerProps } from '@/types/types'

const EmailBanner = ({parentContainer, childContainer} : EmailBannerProps ) => {
  return (
    <View className={`bg-primary-300 h-[60px] px-5 justify-center -mx-4 ${parentContainer}`}>
    <View className={`flex flex-row space-x-1 ${childContainer}`}>
      <Image source={icons.pee} resizeMode="contain" />
      <Text className="text-white text-[16px] mt-3 font-gilroyBold">
        Polymer
      </Text>
    </View>
  </View>
  )
}

export default EmailBanner