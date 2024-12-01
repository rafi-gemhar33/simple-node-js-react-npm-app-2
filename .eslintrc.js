module.exports = {
  "env": {
      "browser": true,
      "es2021": true,
      "node": true,
      "jest": true  // This will fix the 'it' and 'expect' undefined errors
  },
  "extends": [
      "eslint:recommended",
      "plugin:react/recommended"
  ],
  "parserOptions": {
      "ecmaFeatures": {
          "jsx": true
      },
      "ecmaVersion": 12,
      "sourceType": "module"
  },
  "plugins": [
      "react"
  ],
  "rules": {
      "react/prop-types": 0,
      "react/react-in-jsx-scope": "off"
  },
  "settings": {
      "react": {
          "version": "detect"
      }
  }
}