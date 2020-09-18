import React from 'react'
import { styled } from '@material-ui/core/styles'
import moment from 'moment'
import Loadable from '@loadable/component'
import UserName from '../Profile/UserName'

const LoadableProfileImage = Loadable(() => import('../Profile/ProfileImage'))

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

const PostContext = ({ userDid, communityName, timestamp, dateFormat }) => {
  const format = dateFormat || DATE_FORMAT
  const time = moment.unix(timestamp).format(format)

  return (
    <Container>
      <LoadableProfileImage
        userDid={userDid}
      />
      <MinWidthDiv>
        <div>
          <UserName userDid={userDid} />
          { communityName &&
           <> · {communityName} </>
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
