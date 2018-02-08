import * as types from './mutation-types'

const mutations = {
  [types.SET_MEETING_INFO] (state, meetingInfo) {
    state.meetingInfo = meetingInfo
  }
}

export default mutations
