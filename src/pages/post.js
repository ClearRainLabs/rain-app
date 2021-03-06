import React, {
  useState, useEffect
} from 'react'
import { styled } from '@material-ui/core/styles'
import { CircularProgress } from '@material-ui/core'
import Iframe from 'react-iframe'
import { useWeb3React } from '@web3-react/core'

import useAuth from '../hooks/useAuth'
import { useOnePost } from '../hooks/usePosts'
import Post from '../components/Post'
import Toolbar from '../components/Toolbar'
import SEO from '../components/seo'
import {
  getBackPath,
  getId
} from '../utils'

const PostContainer = styled('div')({
  margin: '5em 0',
  padding: '0 20px',
  '@media only screen and (min-width: 700px)': {
    padding: '0 20vw 10vh',
    margin: '10vh auto',
    'max-width': '1000px'
  }
})

const IframeContainer = styled('div')({
  margin: '3em auto',
  width: '80%',
  display: 'flex',
  'justify-content': 'space-between',
  'align-items': 'center',
  'font-size': '30px',
  'text-align': 'center',
  '@media only screen and (max-width: 800px)': {
    'flex-direction': 'column',
    width: '95%'
  }
})

const StyledIFrame = styled(Iframe)({
  'border-radius': '10px'
})

const MessageContainer = styled('div')({
  padding: '0.5em',
  'max-width': '30%',
  '@media only screen and (max-width: 800px)': {
    'max-width': '100vw'
  }
})

const Message = styled('div')({
  'margin-bottom': '30px'
})

const SignInMessage = styled('div')({
  height: '100vh',
  'text-align': 'center',
  'font-size': '30px',
  display: 'flex',
  'align-items': 'center',
  'justify-content': 'center'
})

const LoginProgressContainer = styled('div')({
  margin: '15vh 15vw',
  display: 'flex',
  'align-items': 'center',
  height: '70vh',
  'justify-content': 'center'
})

const PostPage = ({ location, pageContext }) => {
  const { account } = useWeb3React()
  const txId = getId(location, '/post/')
  const backPath = getBackPath(location)
  const { authToken } = useAuth()

  if (!account || !authToken) {
    return (
      <PostLayout
        backPath={backPath}
        txId={txId}
        context={pageContext}
      >
        <SignInMessage>
          <div>
            You must sign in to view this post ➚
          </div>
        </SignInMessage>
      </PostLayout>
    )
  }

  return (
    <LoggedInPost
      backPath={backPath}
      txId={txId}
    />
  )
}

const PostLayout = ({ children, backPath, txId, context }) => {
  const { title, subtitle, image } = context || {}

  return (
    <>
      <SEO
        title={title}
        description={subtitle}
        image={image}
      />
      <Toolbar
        backPath={backPath}
      />
      <>
        {children}
      </>
    </>
  )
}

const LoggedInPost = ({ backPath, txId }) => {
  const { authToken, fetchToken } = useAuth()
  const [refetchedCalled, setRefetchCalled] = useState(false)
  const { postData, loading, error, refetch } = useOnePost(txId, authToken)

  useEffect(() => {
    const handleRefetch = async () => {
      await fetchToken()
      await refetch()
      setRefetchCalled(false)
    }

    if (error && !refetchedCalled) {
      setRefetchCalled(true)
      handleRefetch()
    }
  }, [error, fetchToken, refetchedCalled, refetch])

  if (loading) {
    return (
      <PostLayout
        backPath={backPath}
      >
        <LoginProgressContainer>
          <CircularProgress />
        </LoginProgressContainer>
      </PostLayout>
    )
  }

  const { userBalance, readRequirement, tokenSymbol, tokenAddress } = postData

  const hasInsufficientBalance = userBalance < readRequirement
  if (hasInsufficientBalance) {
    return (
      <PostLayout
        backPath={backPath}
      >
        <IframeContainer>
          <MessageContainer>
            <Message>
              You need {readRequirement} ${tokenSymbol} to access this post.
            </Message>
            <Message>
              Your Balance: {userBalance}
            </Message>
            <Message>
              Buy ${tokenSymbol} on uniswap
            </Message>
          </MessageContainer>
          <StyledIFrame
            url={`https://uniswap.exchange/?outputCurrency=${tokenAddress}`}
            height={'600px'}
            width={'700px'}
            frameBorder="0"
            style={{ border: 'none', outline: 'none', 'border-radius': '10px' }}
            display="initial"
            position="relative"
          />
        </ IframeContainer>
      </PostLayout>
    )
  }

  const post = postData.post
  const comments = postData.comments
  return (
    <PostLayout
      backPath={backPath}
      txId={txId}
    >
      <PostContainer>
        <Post
          post={post}
          comments={comments}
        />
      </PostContainer>
    </PostLayout>
  )
}

export default PostPage
