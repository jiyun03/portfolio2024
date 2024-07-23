import { useState, useEffect } from 'react'
import Image from 'next/image'
import { GalleryImage } from '@/types/about'
import { lock, unlock } from 'tua-body-scroll-lock'

import Ratio from '@/components/common/Ratio'
import Portal from '@/components/common/Portal'

import styled from 'styled-components'
import IC_Arrow_Right from '/public/assets/icons/arrow_right.svg'

interface GalleryTypes {
  images: GalleryImage[]
}

export default function Gallery({ images }: GalleryTypes) {
  const [open, setOpen] = useState(false)
  const [image, setImage] = useState({ src: '', desc: '' })
  const [imageIndex, setImageIndex] = useState(0)

  const dimmedClick = () => {
    setOpen(!open)
  }

  // 갤러리 - index
  useEffect(() => {
    setImage(images[imageIndex])
  }, [imageIndex, images])

  // 갤러리 - 스크롤락
  useEffect(() => {
    const scrollTargetElement = document.querySelector('.gallery')

    if (scrollTargetElement instanceof HTMLElement) {
      if (open) {
        lock(scrollTargetElement)
      } else {
        unlock(scrollTargetElement)
      }
    }
  }, [open])

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
              <div className="gallery__img">
                <Ratio ratio="1_1" src={img.src} />
              </div>
            </div>
          )
        })}
      </div>
      {open && (
        <Portal dimmed={dimmedClick}>
          <GalleryModal>
            <div className="gallery__modal">
              <Image src={image.src} width={0} height={0} sizes="100vw" alt="갤러리 이미지" />
              <div className="gallery__title">{image.desc}</div>
              <div className="gallery__arrow-wrap">
                <IC_Arrow_Right
                  className="gallery__arrow gallery__arrow--left"
                  onClick={() => {
                    if (imageIndex === 0) {
                      setImageIndex(images.length - 1)
                    } else {
                      setImageIndex(imageIndex - 1)
                    }
                  }}
                />
                <IC_Arrow_Right
                  className="gallery__arrow gallery__arrow--right"
                  onClick={() => {
                    if (imageIndex + 1 === images.length) {
                      setImageIndex(0)
                    } else {
                      setImageIndex(imageIndex + 1)
                    }
                  }}
                />
              </div>
            </div>
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
    }
    &__img {
      border: ${({ theme }) => theme.borderColor};
      border-radius: 10rem;
      overflow: hidden;
    }
  }
`

const GalleryModal = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 100rem 0;
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  .gallery {
    &__modal {
      position: relative;
      width: 100%;
      max-width: 50%;
      margin: auto;
      font-size: 0;
      ${({ theme }) => theme.lg`
        max-width: 70%;
      `}
      img {
        width: 100%;
        height: auto;
        border-radius: 20rem 20rem 0 0;
      }
    }
    &__title {
      padding: 13rem 20rem;
      font-size: 16rem;
      background-color: #222;
      color: #fff;
      border-radius: 0 0 20rem 20rem;
    }
    &__arrow {
      position: fixed;
      top: calc(50% - 50rem);
      width: 100rem;
      cursor: pointer;
      pointer-events: auto;
      ${({ theme }) => theme.sm`
        position: relative;
        width: 50rem;
      `}
      path {
        fill: ${({ theme }) => theme.textColor};
      }
      &-wrap {
        ${({ theme }) => theme.sm`
          text-align: right;
        `}
      }
      &--left {
        left: 0;
        transform: rotate(180deg);
      }
      &--right {
        right: 0;
      }
    }
  }
`
