export const ELEMENT_ID = 'redux-ssr'
export const GLOBAL_KEY = '__PRELOADED_STATE__'

export const DEFAULT_COMMUNITY = {
  txId: 'cp1ka-VbZJJj_GOraw9cuJznspR2Vdvcqp71TJ3R03Q',
  name: 'Outpost-Dev'
}

export const PLACEHOLDER_COMMUNITY = {
  name: 'Community',
  txId: 'PLACEHOLDER'
}

export const PLACEHOLDER_POST = {
  title: 'Placeholder',
  subtitle: 'Placeholder',
  body: 'loading content ...',
  timestamp: 1596463285,
  community: {
    name: 'Placeholder'
  },
  user: {
    did: 'did:3:bafyreiagk6hlbhdnu5glvllprgflwxib3xz4l35lb74ictkwhicgbnvf6e'
  },
  transaction: {
    blockHash: '0x0'
  }
}

export const EMPTY_POST = {
  title: '',
  subtitle: '',
  postText: '',
  transaction: {
    txId: undefined
  }
}

export const LAST_CONNECTOR = 'LAST_CONNECTOR'
export const LAST_EMAIL = 'LAST_EMAIL'
export const CONNECTOR_NAMES = {
  walletConnect: 'walletConnect',
  injected: 'injected',
  magic: 'magic'
}
