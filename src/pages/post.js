import React from 'react'
import { useSelector } from 'react-redux'
import { navigate } from '@reach/router'
import { styled } from '@material-ui/core/styles'
import { IconButton } from '@material-ui/core'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'

import { usePost } from '../hooks'
import Post from '../components/Post'
import Toolbar from '../components/Toolbar'
import SEO from '../components/seo'
import { PLACEHOLDER_POST } from '../constants'
import {
  getBackPath,
  getId
} from '../utils'

const PostContainer = styled('div')({
  margin: '3em 0',
  padding: '10vh 23vw'
})

const BackButton = styled(IconButton)({
  margin: '5px',
  position: 'absolute',
  top: '0',
  left: '0',
  'z-index': 2
})

const PostPage = ({ location }) => {
  const isLoggedIn = useSelector(state => state.isLoggedIn)
  const backPath = getBackPath(location)
  const txId = getId(location, '/post/')
  const { data } = usePost(txId)
  const post = data && data.Posts && data.Posts[0] ? data.Posts[0] : PLACEHOLDER_POST

  return (
    <>
      <SEO
        title="Post"
      />
      <BackButton
        color="inherit"
        aria-label="Go back"
        edge="end"
        onClick={() => navigate(backPath)}
      >
        <ChevronLeftIcon />
      </BackButton>
      { isLoggedIn &&
        <Toolbar />
      }
      <PostContainer>
        <Post
          post={post}
        />
      </PostContainer>
    </ >
  )
}

export default PostPage
