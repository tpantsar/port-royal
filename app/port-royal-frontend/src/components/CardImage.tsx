import React from 'react'

type CardImageProps = {
  imageName: string
}

const CardImage: React.FC<CardImageProps> = ({ imageName }) => {
  const imagePath = `/assets/cards/${imageName}` // Static path to public folder

  return <img src={imagePath} alt={imageName} />
}

export default CardImage
