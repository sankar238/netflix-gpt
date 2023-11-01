

const VideoTitle = ({title,overview}) => {
  return (
    <div className="w-screen aspect-video pt-[18%] px-24 absolute text-white bg-gradient-to-r  from-black">
    <h1 className="font-bold text-5xl">{title}</h1>
    <p className='py-6 text-lg w-1/4'>{overview}</p>
    <div>
        <button className=" bg-white text-black px-12 py-4 text-xl rounded-lg hover:bg-opacity-80 ">
            play 
        </button>
        <button className="mx-3 bg-gray-600 text-white px-12 py-4 text-xl bg-opacity-50 rounded-lg "> more info</button>
    </div>
    </div>
  )
}

export default VideoTitle