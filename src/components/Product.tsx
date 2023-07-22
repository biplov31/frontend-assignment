type ProductProps = {
  title: string,
  price: number,
  image: string,
}

export const Product = ({ title, price, image }: ProductProps) => {
  return (
    <div className="product-card">
      <img src={image} alt={title} />
      <strong>{title}</strong>
      <span>${price}</span>
    </div>    
  )
}