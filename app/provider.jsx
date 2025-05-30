import React from 'react'
import Header from './_components/Header'

function Provider({ children }) {
    return (
        <div>
            <Header />
            <div className='px-5 lg:px-5 xl:px-5 2xl:px-5'>
                {children}
            </div>
        </div>
    )
}

export default Provider
