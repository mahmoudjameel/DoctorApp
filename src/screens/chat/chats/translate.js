import axios from 'axios'
import { REACT_APP_GOOGLE_TRANSLATE_API_KEY } from '@env'

const googleTranslateEndPoint = `https://translation.googleapis.com/language/translate/v2?key=${REACT_APP_GOOGLE_TRANSLATE_API_KEY}`
const headers = { 'Content-Type': 'application/json' }
export const translate = ({ text, target }) => {
    return axios.post(googleTranslateEndPoint, {
        q: text,
        target,
    }, headers)
}