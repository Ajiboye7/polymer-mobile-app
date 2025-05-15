/** @type {import('tailwindcss').Config} */
module.exports = {
 content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors:{
        primary:{
          100:"#34A4E40D",
          200:"#184484",
          300:"#0B274F"
        },

        secondary:{
          100:"#FCFCFC",
          200:"#FFFFFF",
          300:"#F0F2F6",
          400:"#858585",
          500:"#868688",
          600:"#788190",
          700:"#58585880",
          800:"#5E5C5C",
          900:"#00000040",
        },

        tertiary:{
          DEFAULT: "rgba(91, 190, 138, 0.1)"
        },

        danger:{
          DEFAULT:"#FF7171",
        },

        customGray:{
          DEFAULT : '#808B96',
        }
      },

      fontFamily:{
        sfProRoundedBlack:["SF-Pro-Rounded-Black, san-serif"],
        sfProRoundedBold:["SF-Pro-Rounded-Bold, san-serif"],
        sfProRoundedHeavy:["SF-Pro-Rounded-Heavy, san-serif"],
        sfProRoundedLight:["SF-Pro-Rounded-Light, san-serif"],
        sfProRoundedMedium:["SF-Pro-Rounded-Medium, san-serif"],
        sfProRoundedRegular:["SF-Pro-Rounded-Regular, san-serif"],
        sfProRoundedSemibold:["SF-Pro-Rounded-Semibold, san-serif"],
        sfProRoundedThin:["SF-Pro-Rounded-Thin, san-serif"],
        sfProRoundedUltralight:["SF-Pro-Rounded-UltraLIght, san-serif"],
        sfPro:["SF-Pro, san-serif"],
        sfProItalic:["SF-Pro-Italic, san-serif"],

        gilroyBold:["Gilroy-Bold, san-serif"],
        gilroyExtraBold:["Gilroy-ExtraBold, san-serif"],
        gilroyHeavy:["Gilroy-Heavy, san-serif"],
        gilroyLight:["Gilroy-Light, san-serif"],
        gilroyMedium:["Gilroy-Medium, san-serif"],
        gilroyRegular:["Gilroy-Regular, san-serif"],
        gilroySemiBold:["Gilroy-SemiBold, san-serif"],
        gilroyThin:["Gilroy-Thin, san-serif"],
        gilroyUltraLight:["Gilroy-UltraLight, san-serif"],



        interRegular:["Inter-Variable, san-serif"],
        interItalic:["Inter-Italic, san-serif"],
      }

    },
  },
  plugins: [],
}

