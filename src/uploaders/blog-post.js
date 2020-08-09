import axios from 'axios'

const ARWEAVE_UPLOAD_SERVICE = process.env.ARWEAVE_UPLOAD_SERVICE

export const uploadPost = async (postData, communityTxId) => {
  const payload = {
    postData,
    communityTxId
  }

  const jwt = await window.box._3id.signJWT(payload)

  const uploadData = {
    jwt,
    communityTxId,
    did: window.box.DID
  }

  return await axios.post(`${ARWEAVE_UPLOAD_SERVICE}/blog-post`, uploadData)
}