import React from 'react'

const About = () => {
  return (
    <div className="min-h-[calc(100vh-3.5rem)] py-20 px-10 flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold text-white mb-10">Who We Are</h1>
      <p className="text-xl text-gray-300 text-center leading-relaxed text-white">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam labore quasi, minus reprehenderit corporis quidem debitis nisi error sit!
      </p>
      <div className="flex flex-wrap justify-center mt-10">
        <div className="w-full md:w-1/2 p-4">
          <h2 className="text-2xl font-bold text-white mb-4 text-center">Our Products</h2>
          <p className="text-xl text-gray-300 text-justify bg-richblack-5 shadow py-4 px-2 rounded-md">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore explicabo sunt repellat! Lorem ipsum dolor sit Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio,</p>
        </div>
        <div className="w-full md:w-1/2 p-4">
          <h2 className="text-2xl font-bold text-white mb-4 text-center">Trusted Brands</h2>
          <p className="text-xl text-gray-300 text-justify bg-richblack-5 shadow py-4 px-2 rounded-md">
           Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error mollitia pariatur cupiditate illo placeat ducimus vitae ex. Commodi Lorem ipsum dolor sit amet consectetur.
          </p>
        </div>
      </div>
      <div className="mt-10">
        <button className="bg-richblack-5  text-richblack-900 hover:bg-richblack-10 font-bold py-2 px-4 rounded-full">
          Know More
        </button>
      </div>
    </div>
  )
}
export default About;