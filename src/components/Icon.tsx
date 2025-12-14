'use client'

import Image from 'next/image'

interface IconProps {
  name: string
  size?: number
  className?: string
  alt?: string
}

export function Icon({ name, size = 48, className = '', alt = '' }: IconProps) {
  // Convert icon name to the proper filename format
  const iconPath = `/icons/${name}.svg`
  
  return (
    <div className={`icon-wrapper ${className}`} style={{ width: size, height: size }}>
      <Image
        src={iconPath}
        alt={alt || name}
        width={size}
        height={size}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  )
}
