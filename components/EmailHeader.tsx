import { View, Text, TouchableOpacity, Image } from 'react-native'
import { icons } from '@/constants'
import React from 'react'
import { EmailHeaderProps } from '@/types/types'

const EmailHeader = ({text}:EmailHeaderProps) => {
  return (
    <>
    <View className="flex flex-row items-center justify-between">
    <Text className="text-[16px] text-[#000000] font-bold">
      {text}
    </Text>
    <TouchableOpacity>
      <Image source={icons.star} resizeMode="contain"/>
    </TouchableOpacity>
  </View>

  <View className="flex flex-row items-center justify-between my-8 ">
    <View className="flex flex-row items-center space-x-1">
      <View className="bg-primary-300 items-center justify-center rounded-full h-[35px] w-[35px] ">
        <Image source={icons.pee} />
      </View>

      <View className="space-y-1">
        <Text className="text-[14px] font-light">Polymer</Text>
        <Text className="text-[10px]">to me</Text>
      </View>
    </View>

    <TouchableOpacity>
      <Image source={icons.list} resizeMode="contain" />
    </TouchableOpacity>
  </View>
    </>
    
  )
}

export default EmailHeader