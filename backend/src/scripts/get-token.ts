import dotenv from 'dotenv'
dotenv.config()

import axios from 'axios'
import { applicationDefault, initializeApp } from 'firebase-admin/app'
import admin from 'firebase-admin'

const [, , ...params] = process.argv

initializeApp({
    credential: applicationDefault(),
    databaseURL: 'https://learning-drive-fe98e.firebaseio.com'
})

/**
 * gets the users validation token (JWT) from the google firebase API.
 *
 * @param uid - the unique identifier (string)
 */
const getToken = async (uid: string) => {
    try {
        const customToken = await admin.auth().createCustomToken(uid)

        const res = await axios({
            url: `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyCustomToken?key=${process.env.FIREBASE_API_KEY}`,
            method: 'post',
            data: {
                token: customToken,
                returnSecureToken: true
            }
        })

        console.log(res.data.idToken)
    } catch (error) {
        console.log(error)
    }
}

getToken(params[0])
