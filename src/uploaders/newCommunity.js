import axios from 'axios'
import { ADD_CHILD } from 'outpost-protocol/functionTypes'
import uploadContractInteraction from './contractInteraction'
import {
  DEV_CONTRACT_ID, PROD_CONTRACT_ID
} from 'outpost-protocol'
import { isProduction } from '../utils'

const CONTRACT_ID = isProduction() ? PROD_CONTRACT_ID : DEV_CONTRACT_ID

const ARWEAVE_UPLOAD_SERVICE = process.env.ARWEAVE_UPLOAD_SERVICE

export const uploadNewCommunity = async com => {
  const createData = {
    name: com.name,
    isOpen: com.isOpen,
    did: window.box.DID
  }

  const createRes = await createContract(createData)
  const childTxId = createRes.txId
  const initState = createRes.initState

  const interaction = {
    contractId: CONTRACT_ID,
    input: {
      function: ADD_CHILD,
      communityId: childTxId
    }
  }

  await uploadContractInteraction(interaction)

  return {
    txId: childTxId,
    initState,
    parentTxId: CONTRACT_ID
  }
}

const createContract = async comData => {
  const createRes = await axios.post(`${ARWEAVE_UPLOAD_SERVICE}/create-community`, comData)

  const txId = createRes.data

  return txId
}
