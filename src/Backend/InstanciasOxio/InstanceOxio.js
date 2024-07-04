import axios from 'axios'

// Credentials
const oxioApiKey = 'vialte_OK5J5nFwuwC2F9n26zdqLBRj'
const oxioApiSecret = '1u1B/nZjDlS0tHrP6wF37fReyrcWmLMf'

// Base64 Codification
// const oxioEncodedCredentials = Buffer.from(`${oxioApiKey}:${oxioApiSecret}`).toString('base64')
const oxioEncodedCredentials = btoa(`${oxioApiKey}:${oxioApiSecret}`)

export const oxioBaseURL = 'https://api-staging.brandvno.com/v2/'

// Axios config
const apiInstanceOxio = axios.create({
    baseURL: oxioBaseURL,
    headers: {
        'Authorization': `Basic ${oxioEncodedCredentials}`,
        'Content-type': 'application/json'
    }
})

export default apiInstanceOxio
