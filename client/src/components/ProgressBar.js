

const ProgressBar = ({progress}) => {

  const colors= ['green', 'purple', 'blue', 'indigo','pink', 'red', 'grey', 'gold'];
  const randNumber=Math.floor(Math.random()*colors.length)
  const randomColor= colors[randNumber]
  console.log(randomColor)
  return (
    <div className="outer-bar">

      <div 
        className="inner-bar"
        style={{width:`${progress}%` , backgroundColor: `${randomColor}`}}
      >

      </div>
    </div>
  )
}

export default ProgressBar