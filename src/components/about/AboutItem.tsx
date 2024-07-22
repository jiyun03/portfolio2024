import { ReactNode } from 'react'
import Image from 'next/image'
import { AboutItemArray } from '@/types/about'

import styled from 'styled-components'

interface AboutItemProps {
  number: string
  name: string
  item: AboutItemArray
  children?: ReactNode
}

export default function AboutItem({ number, name, item, children }: AboutItemProps) {
  const itemKey = Object.keys(item)[0] as keyof AboutItemArray
  const itemContent = item[itemKey]

  return (
    <div className={`about__item about__item--${itemKey}`}>
      <div className="about__title-wrap">
        <div className="about__subtitle">{number}</div>
        <div className="about__title">{name.toUpperCase()}</div>
      </div>
      <div className="about__content-wrap">
        {children && children}
        <div className="about__content">
          {itemContent?.map((el) => (
            <div className="about__content-item" key={el.title}>
              <div className="about__content__title">{el.title}</div>
              <div className="about__content__content">
                {Array.isArray(el.content)
                  ? el.content.map((elContent, index) => (
                      <div className="content-item" key={index}>
                        {typeof elContent === 'object' && elContent.subtitle && (
                          <div className="content-item__subtitle">{elContent.subtitle}</div>
                        )}
                        {typeof elContent === 'string' && (
                          <div className="content-item__img">
                            <Image src={`/assets/img/about/skill/${elContent}.svg`} width="50" height="50" alt={elContent} />
                          </div>
                        )}
                        <div className="content-item__title">
                          {typeof elContent === 'string' ? elContent.toUpperCase() : elContent.title}
                        </div>
                      </div>
                    ))
                  : el.content}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
