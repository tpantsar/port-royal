import { Card } from '../types/Card'

type CardDetailsProps = {
  card: Card | undefined
}

const CardDetails = ({ card }: CardDetailsProps) => {
  return (
    <div>
      {card ? (
        <>
          <div>{card.id}</div>
          <div>{card.name}</div>
          <div>{card.displayImage.toString()}</div>
          <div>{card.imageName}</div>

          <img src={`/cards/${card.imageName}`} alt="card" />
        </>
      ) : null}
    </div>
  )
}

CardDetails.displayName = 'CardDetails'
export default CardDetails
