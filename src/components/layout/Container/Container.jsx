import React from 'react'
//we define styling property in the container component and then we can use it in the header and footer component
const Container = ({ children }) => {
  return (
    <div className='w-full max-w-7xl mx-auto px-4'>
      {children}
    </div>
  )
}

export default Container
