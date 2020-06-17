import React, {
  useEffect,
  useState
} from 'react'
import { useSelector } from 'react-redux'
import { styled } from '@material-ui/core/styles'
import moment from 'moment'
import Box from '3box'

import { DEFAULT_COMMUNITY } from '../../constants'
import Feed from '../Feed'
import NewPost from '../NewPost'

const MainContainer = styled('div')({
  padding: '1em',
  'padding-left': '23vw',
  'padding-right': '23vw'
})

const Main = () => {
  const isLoggedIn = useSelector(state => state.isLoggedIn)
  const communities = useSelector(state => state.communities)
  const [allPosts, setPosts] = useState([])

  useEffect(() => {
    const getPosts = async () => {
      if (isLoggedIn) {
        setPosts(await fetchPostsLoggedIn(communities))
      } else {
        setPosts(await fetchPostsLoggedOut([DEFAULT_COMMUNITY]))
      }
    }

    const fetchPostsLoggedIn = async (communities) => {
      const tempPosts = []
      for (const community of communities) {
        const threadName = community.address.split('/').slice(-1)[0]
        const thread = await window.space.joinThreadByAddress(community.address)
        const posts = await thread.getPosts()
        posts.forEach((post) => {
          post.Id = post.postId
          post.threadName = threadName
        })
        tempPosts.push(posts)
      }
      return chronologicalSort(tempPosts.flat())
    }

    const fetchPostsLoggedOut = async (communities) => {
      const tempPosts = []
      for (const community of communities) {
        const threadName = community.address.split('/').slice(-1)[0]
        const posts = await Box.getThreadByAddress(community.address)
        posts.forEach((post) => {
          post.Id = post.postId
          post.threadName = threadName
        })
        tempPosts.push(posts)
      }
      return chronologicalSort(tempPosts.flat())
    }

    const chronologicalSort = (posts) => {
      posts.sort(function (a, b) {
        return moment.utc(b.timestamp).diff(moment.utc(a.timestamp))
      })
      return posts
    }

    getPosts()
  }, [communities, isLoggedIn])

  return (
    <MainContainer>
      { isLoggedIn &&
        <NewPost />
      }
      <Feed posts={allPosts} />
    </MainContainer>
  )
}

export default Main
