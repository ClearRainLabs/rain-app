import React from 'react'
import { styled } from '@material-ui/core/styles'
import moment from 'moment'
// import UserName from '../Profile/UserName'

import { use3boxProf } from '../../hooks/use3boxProf'
import ProfileImage from '../Profile/ProfileImage'
import { shortenAddress } from '../../utils'

const Container = styled('div')({
  display: 'inline-flex',
  'align-items': 'center'
})

const Time = styled('div')({
  color: '#999'
})

const MinWidthDiv = styled('div')({
  'min-width': '150px'
})

const DATE_FORMAT = 'D MMMM YYYY'

const PostContext = ({ userAddress, communityName, timestamp, dateFormat }) => {
  const format = dateFormat || DATE_FORMAT
  const time = moment.unix(timestamp).format(format)

  const { name } = use3boxProf(userAddress)

  return (
    <Container>
      <ProfileImage />
      <MinWidthDiv>
        <div>
          <span>{name}</span>
          { communityName &&
           <>{name || shortenAddress(userAddress) } · {communityName} </>
          }
        </div>
        <Time>
          {time}
        </Time>
      </MinWidthDiv>
    </Container>
  )
}

export default PostContext
