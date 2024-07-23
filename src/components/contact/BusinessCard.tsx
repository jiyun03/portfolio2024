import { useRef, useState } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { Text, useTexture, Plane } from '@react-three/drei'

export default function Card({ cardColor }: { cardColor: string }) {
  const ref = useRef<THREE.Group>(null)
  const [cardHover, setCardHover] = useState(false)

  // 이미지 로드
  const frontImg = useTexture('/assets/img/contact/front_img.png')
  const backImg = useTexture('/assets/img/contact/back_img.png')

  useFrame(() => {
    if (ref.current && !cardHover) {
      ref.current.rotation.y += 0.01
    }
  })

  return (
    <group
      ref={ref}
      onPointerOver={() => {
        setCardHover(true)
        document.body.style.cursor = 'pointer'
      }}
      onPointerOut={() => {
        setCardHover(false)
        document.body.style.cursor = 'auto'
      }}
      position={[0, 0, 0]}
    >
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[4.5, 2.5, 0.1]} />
        <meshStandardMaterial color={cardColor} />
      </mesh>

      {/* 앞면 */}
      <Plane args={[4.1, 0.02]} position={[0, -0.8, 0.06]}>
        <meshStandardMaterial color="#ffffff" />
      </Plane>
      <Plane args={[3, 0.9]} position={[-0.5, 0.55, 0.06]}>
        <meshStandardMaterial transparent={true} map={frontImg} />
      </Plane>
      <Text position={[-1.25, -1.02, 0.06]} fontSize={0.1} anchorX="center" anchorY="middle" color="white">
        &#169; 2024. JIYUN. All rights reserved.
      </Text>

      {/* 뒷면 */}
      <Plane args={[3.5, 2]} position={[0, 0, -0.05]} rotation={[0, Math.PI, 0]}>
        <meshStandardMaterial attach="material" color={cardColor} />
        <Plane args={[0.75, 0.15]} position={[1.65, 1, 0.06]}>
          <meshStandardMaterial transparent={true} map={backImg} />
        </Plane>
        <Text position={[-1.6, -0.23, 0.01]} fontSize={0.3} color="white" anchorX="center" anchorY="middle">
          박지윤
        </Text>
        <Text position={[-0.7, -0.27, 0.01]} fontSize={0.15} color="white" anchorX="center" anchorY="middle">
          PARK JIYUN
        </Text>
        <Text position={[-1.3, -0.6, 0.01]} fontSize={0.2} color="white" anchorX="center" anchorY="middle">
          010-6610-8728
        </Text>
        <Text position={[-1, -0.9, 0.01]} fontSize={0.2} color="white" anchorX="center" anchorY="middle">
          sprare06@gmail.com
        </Text>
      </Plane>
    </group>
  )
}
