import User from "../models/UserModels";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";

const createToken = (_id: string) => {
  if (!JWT_SECRET) {
    throw new Error("JWT secret is not defined");
  }

  return jwt.sign({ _id }, JWT_SECRET, { expiresIn: "1h" });
};

export const signUpUser = async (req: Request, res: Response): Promise<any> => {
  const { name, account, email, password, confirmPassword } = req.body;

  try {
    const user = await User.signUp(
      name,
      account,
      email,
      password,
      confirmPassword
    );
    const token = createToken(user._id);

    return res.status(201).json({
      success: true,
      message: "User created successfully. OTP sent to email.",
      data: {
        user: {
          _id: user._id,
          name: user.name,
          account: user.account,
          email: user.email,
          token,
        },
      },
    });
  } catch (error) {
    console.error("Signup error:", error);

    if (error instanceof Error) {
      const errorMessage = error.message;

      const clientErrors = [
        "All fields are to be filled",
        "Passwords do not match",
        "Please enter a valid email",
        "Account number already exists",
        "Password not strong enough",
        "Email already exists",
        "Failed to send OTP email. Please try again.",
      ];

      if (clientErrors.some((msg) => errorMessage.includes(msg))) {
        return res.status(400).json({
          success: false,
          message: errorMessage,
        });
      }
    }

    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred during registration",
    });
  }
};

export const signInUser = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;

  try {
    const user = await User.signIn(email, password);

    if (!user.isVerified) {
      return res.status(403).json({
        success: false,
        message: "Account not verified. Please check your email for OTP.",
      });
    }

    const token = createToken(user._id);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        user: {
          _id: user._id,
          name: user.name,
          account: user.account,
          email: user.email,
          token,
          pinSet: user.pinSet,
          isVerified: user.isVerified,
          identityNumber: user.identityNumber,
          identityType: user.identityType,
        },
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    if (error instanceof Error) {
      const errorMessage = error.message;

      const clientErrors = [
        "email and password require",
        "Please enter a valid email",
        //"User does not exist",
        'Incorrect Credentials',
        'Incorrect Credentials'
       /// "Incorrect password",
      ];

      if (clientErrors.some((msg) => errorMessage.includes(msg))) {
        return res.status(400).json({
          success: false,
          message: errorMessage,
        });
      }
    }

    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred during login",
    });
  }
};

{
  /*<ScreenWrapper>
         <StatusBar hidden />
        <Swiper
          ref={swiperRef}
          loop={false}
          dot={
            <View className="w-[5px] h-[5px] mx-1 bg-gray-300 rounded-full" />
          }
          activeDot={
            <View className="w-[15px] h-[5px] mx-1 bg-primary-300 rounded-full" />
          }
          onIndexChanged={(index) => setActiveIndex(index)}
        >
          {onboarding.map((item) => (
            <View key={item.id} className="flex-1 ">
              <ImageBackground
                source={images.onboardingBgImg}
                resizeMode="cover"
                className="w-full h-[422px] justify-center items-center"
              >
                <Image
                  source={item.image}
                  className="w-[250px] h-[250px] mb-6"
                  resizeMode="contain"
                />
              </ImageBackground>

              <View className="px-2 ">
                <View className="items-start ">
                  <Text className="text-[32px] text-primary-300 font-bold mb-4 w-[270px] leading-[44.66px]">
                    {item.title}
                  </Text>

                  <Text className="text-[14px] text-secondary-600 font-semibold w-[300px] leading-[25px]">
                    {item.description}
                  </Text>
                </View>

                <View className="my-3">
                  <Button
                    title={isLastSlide ? "Get Started" : "Next"}
                    buttonStyle="w-[145px] h-[50px]"
                    handleClick={handleGetStarted}
                  />
                </View>

                <Text className="mb-10">
                  Already have an account?
                  <Link
                    href={ROUTES.SIGN_IN}
                    className="text-primary-300 font-semibold"
                  >
                    Log in
                  </Link>
                </Text>
              </View>
            </View>
          ))}
        </Swiper>
       </ScreenWrapper>



       <SafeAreaView className="h-full ">
             <ScrollView className="">
             <StatusBar hidden />
               <Swiper
                 ref={swiperRef}
                 loop={false}
                 dot={
                   <View className="w-[5px] h-[5px] mx-1 bg-gray-300 rounded-full" />
                 }
                 activeDot={
                   <View className="w-[15px] h-[5px] mx-1 bg-primary-300 rounded-full" />
                 }
                 onIndexChanged={(index) => setActiveIndex(index)}
               >
                 {onboarding.map((item) => (
                   <View key={item.id} className="flex-1 ">
                     <ImageBackground
                       source={images.onboardingBgImg}
                       resizeMode="cover"
                       className="w-full h-[422px] justify-center items-center"
                     >
                       <Image
                         source={item.image}
                         className="w-[250px] h-[250px] mb-6"
                         resizeMode="contain"
                       />
                     </ImageBackground>
       
                     <View className="px-2 ">
                       <View className="items-start ">
                         <Text className="text-[32px] text-primary-300 font-bold mb-4 w-[270px] leading-[44.66px]">
                           {item.title}
                         </Text>
       
                         <Text className="text-[14px] text-secondary-600 font-semibold w-[300px] leading-[25px]">
                           {item.description}
                         </Text>
                       </View>
       
                       <View className="my-3">
                         <Button
                           title={isLastSlide ? "Get Started" : "Next"}
                           buttonStyle="w-[145px] h-[50px]"
                           handleClick={handleGetStarted}
                         />
                       </View>
       
                       <Text className="mb-10">
                         Already have an account?
                        
                         <Link
                           href={ROUTES.SIGN_IN}
                           className="text-primary-300 font-semibold"
                         >
                           Log in
                         </Link>
                       </Text>
                     </View>
                   </View>
                 ))}
               </Swiper>
             </ScrollView>
           </SafeAreaView>*/
}
