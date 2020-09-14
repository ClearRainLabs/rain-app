import React, {
  useEffect, useState, useRef
} from 'react'
import { styled } from '@material-ui/core/styles'
import makeBlockie from 'ethereum-blockies-base64'
import Box from '3box'

const Avatar = styled('img')({
  'border-radius': '50%',
  'margin-right': '10px',
  '@media only screen and (max-width: 700px)': {
    width: '30px',
    height: '30px'
  },
  '@media only screen and (min-width: 700px)': {
    width: '40px',
    height: '40px'
  }
})

const ProfileImage = ({ userDid, redirectURL }) => {
  const [imageSrc, setImageSrc] = useState('https://picsum.photos/40/40/?blur')
  const isMounted = useRef(true)

  useEffect(() => {
    const getImage = async () => {
      const profile = await Box.getProfile(userDid)
      const hash = profile.image ? profile.image[0].contentUrl['/'] : ''
      if (!hash) return null
      return `https://ipfs.infura.io/ipfs/${hash}`
    }

    const retreiveProfile = async () => {
      const imageSrc = await getImage()
      const img = imageSrc || await makeBlockie(userDid)
      if (isMounted.current) {
        setImageSrc(img)
      }
    }
    retreiveProfile()

    return () => { isMounted.current = false }
  }, [userDid])

  return (
    <>
      { redirectURL === null
        ? <Avatar
          src={imageSrc}
          alt='Profile image'
        />
        : <a
          rel='noreferrer'
          target='_blank'
          href={redirectURL}
        >
          <Avatar
            src={imageSrc}
            alt='Profile image'
          />
        </a>
      }
    </>
  )
}

export default ProfileImage
