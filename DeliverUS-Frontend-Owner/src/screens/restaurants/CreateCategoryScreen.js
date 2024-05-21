import React, { useState } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import * as yup from 'yup'
import { createCategories } from '../../api/RestaurantEndpoints'
import InputItem from '../../components/InputItem'
import TextRegular from '../../components/TextRegular'
import * as GlobalStyles from '../../styles/GlobalStyles'

import { showMessage } from 'react-native-flash-message'
import { Formik } from 'formik'
import TextError from '../../components/TextError'

export default function CreateRestaurantScreen ({ navigation }) {
  const [backendErrors, setBackendErrors] = useState()

  const initialRestaurantValues = { name: null }
  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .max(50, 'Name too long')
      .required('Name is required')
  })

  const createCategory = async (values) => {
    setBackendErrors([])
    try {
      await createCategories(values)
      showMessage({
        message: 'The category succesfully created',
        type: 'success',
        style: GlobalStyles.flashStyle,
        titleStyle: GlobalStyles.flashTextStyle
      })
      navigation.navigate('CreateRestaurantScreen', { dirty: true })
    } catch (error) {
      console.log(error)
      setBackendErrors(error.errors)
      showMessage({
        message: `There was an error while creating category. ${error} `,
        type: 'error',
        style: GlobalStyles.flashStyle,
        titleStyle: GlobalStyles.flashTextStyle
      })
    }
  }
  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialRestaurantValues}
      onSubmit={createCategory}>
      {({ handleSubmit }) => (
          <View style={{ alignItems: 'center' }}>
            <View style={{ width: '60%' }}>
              <InputItem
                name='name'
                label='Name:'
              />

              {backendErrors &&
                backendErrors.map((error, index) => <TextError key={index}>{error.param}-{error.msg}</TextError>)
              }

              <Pressable
                onPress={handleSubmit}
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed
                      ? GlobalStyles.brandSuccessTap
                      : GlobalStyles.brandSuccess
                  },
                  styles.button
                ]}>
              <View style={[{ flex: 1, flexDirection: 'row', justifyContent: 'center' }]}>
                <MaterialCommunityIcons name='content-save' color={'white'} size={20}/>
                <TextRegular textStyle={styles.text}>
                  Save
                </TextRegular>
              </View>
              </Pressable>
            </View>
          </View>

      )}
    </Formik>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    height: 40,
    padding: 10,
    width: '100%',
    marginTop: 20,
    marginBottom: 20
  },
  actionButton: {
    borderRadius: 8,
    height: 40,
    marginTop: 12,
    margin: '1%',
    padding: 10,
    alignSelf: 'center',
    flexDirection: 'column',
    width: '50%'
  },
  text: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginLeft: 5
  },
  imagePicker: {
    height: 40,
    paddingLeft: 10,
    marginTop: 20,
    marginBottom: 80
  },
  image: {
    width: 100,
    height: 100,
    borderWidth: 1,
    alignSelf: 'center',
    marginTop: 5
  }
})
