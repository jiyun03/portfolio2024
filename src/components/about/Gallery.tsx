import { useState, useEffect } from 'react'
import Image from 'next/image'

import Ratio from '@/components/common/Ratio'
import Portal from '@/components/common/Portal'

import styled from 'styled-components'
import IC_Arrow_Right from '/public/assets/icons/arrow_right.svg'

interface ImageType {
  src: string
  desc: string
}

interface GalleryTypes {
  images: ImageType[]
}

export default function Gallery({ images }: GalleryTypes) {
  const [open, setOpen] = useState(false)
  const [image, setImage] = useState({ src: '', desc: '' })
  const [imageIndex, setImageIndex] = useState(0)

  const dimmedClick = () => {
    setOpen(!open)
  }

  useEffect(() => {
    setImage(images[imageIndex])
  }, [imageIndex, images])

  return (
    <GalleryWrapper>
      <div className="gallery">
        {images.map((img, index) => {
          return (
            <div
              key={index}
              className="gallery__item"
              onClick={() => {
                setOpen(true)
                setImageIndex(index)
              }}
            >
              <Ratio ratio="1_1" src={img.src} />
            </div>
          )
        })}
      </div>
      {open && (
        <Portal dimmed={dimmedClick}>
          <GalleryModal>
            <Image src={image.src} width={0} height={0} sizes="100vw" alt="갤러리 이미지" />
            <div className="gallery__title">{image.desc}</div>
            <IC_Arrow_Right
              onClick={() => {
                if (imageIndex === 0) {
                  setImageIndex(images.length - 1)
                } else {
                  setImageIndex(imageIndex - 1)
                }
              }}
            />
            <IC_Arrow_Right
              onClick={() => {
                if (imageIndex + 1 === images.length) {
                  setImageIndex(0)
                } else {
                  setImageIndex(imageIndex + 1)
                }
              }}
            />
          </GalleryModal>
        </Portal>
      )}
    </GalleryWrapper>
  )
}

const GalleryWrapper = styled.div`
  .gallery {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -10px;
    &__item {
      flex: 0 0 25%;
      max-width: 25%;
      padding: 0 10px;
      margin-bottom: 20px;
      cursor: pointer;
      ${({ theme }) => theme.sm`
        flex: 0 0 50%;
        max-width: 50%;
      `}
      .ratio__content {
        border-radius: 15rem;
      }
    }
  }
`

const GalleryModal = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  img {
    max-width: 80vw;
    max-height: 100%;
    width: 100%;
    height: auto;
    border-radius: 30rem;
  }
  svg {
    width: 100rem;
  }
  .gallery {
    &__title {
      font-size: 18rem;
      //   color: ;
    }
  }
`
