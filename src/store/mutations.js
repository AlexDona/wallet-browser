import {
  SETKEY,
  CONNECTEOSNET,
  SETACCOUNTNAMES,
  SETEOSNETCONFIG,
  SETLANG,
  GETRESULTDATA
} from './type'

export default {
  [SETKEY] (state, key) {
    state.key = key
    state.isOnline = true
  },
  [CONNECTEOSNET] (state, eos) {
    state.eos = eos
  },
  [SETACCOUNTNAMES] (state, accountNames) {
    state.accountNames = accountNames
  },
  [SETEOSNETCONFIG] (state, config) {
    state.isOnline = false
    state.eos = null
    state.isOnline = false
    state.key = null
    state.accountNames = null
    state.eosConfig = config
  },
  [SETLANG] (state, lang) {
    state.lang = lang
  },
  [GETRESULTDATA] (state, data) {
    state.resultData = data
  }
}
