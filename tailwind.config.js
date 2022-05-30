module.exports = {
  content: [ './src/**/*.{html,jsx}' ],
  theme: {
    colors: {
      'transparent': 'transparent',
      'black': {
        DEFAULT: '#000000',
        500: '#00000080'
      },
      'white': {
        DEFAULT: '#FFFFFF',
        100: '#FFFFFF1A',
        500: '#FFFFFF80'
      },
      'primary': {
        100: '#212235',
        200: '#272A3D',
        300: '#484764',
        400: '#7600AE',
        500: '#CDBBFF33'
      },
      'secondary': {
        DEFAULT: '#FF0099'
      }
    },
    letterSpacing: {
      'widest': '.2rem'
    },
    extend: {},
  },
}
