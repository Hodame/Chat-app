type CustomButton = {
  btnText: string,
  click?: React.MouseEventHandler<HTMLButtonElement>
}

export default function CustomButton({ btnText, click }: CustomButton) {
  return (
    <button className="py-6 bg-purple-400" onClick={ click }>
      { btnText }
    </button>
  )
}