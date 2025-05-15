import { View, Text, TouchableOpacity, Image } from 'react-native'
import { icons } from '@/constants'
import React from 'react'

const EmailFooter = () => {
  return (

    <>
     <View className="bg-primary-300 py-7 px-3 -mx-4 h-[191px]">
        <View className="space-y-8 ">
          <View className="flex flex-row space-x-4">
            <TouchableOpacity>
              <View className=" items-center justify-center w-[30px] h-[30px] rounded-full">
                <Image source={icons.linkedIn} resizeMode="contain" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View className="bg-white items-center justify-center w-[30px] h-[30px] rounded-full">
                <Image source={icons.facebook} resizeMode="contain" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <View className="bg-white items-center justify-center w-[30px] h-[30px] rounded-full">
                <Image source={icons.instagram} resizeMode="contain" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <View className="bg-white items-center justify-center w-[30px] h-[30px] rounded-full">
                <Image source={icons.twitter} resizeMode="contain" />
              </View>
            </TouchableOpacity>
          </View>

          <View className="space-y-3">
            <Text className="text-white text-[12px] font-gilroyBold">
              Need help or enquiries, kindly send a message to
            </Text>
            <Text className="text-white text-[12px] font-gilroyBold underline">help@polymer.com</Text>
          </View>

          <View className="flex flex-row items-center space-x-5 ">
            <Text className="text-white text-[10px] font-gilroyBold">Lagos , Nigeria</Text>
            <Text className="text-white text-[10px] font-gilroyBold underline">Privacy policy</Text>
            <Text className="text-white text-[10px] font-gilroyBold underline">Unsubcribe</Text>
          </View>
        </View>
      </View>

      <Text className='text-[12px] text-center mt-3 font-gilroyBold '>@2023. All rights reserved.</Text>
    </>
   
  )
}

export default EmailFooter