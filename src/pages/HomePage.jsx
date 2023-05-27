import React from 'react'
import Header from '../components/Header'
import '../style/Home.css'

function HomePage() {
  return (
    <>
    <Header/>
    <div className="containerHome">
        <div className="leftSideHome">
          <div className="leftFeed">
            <p>Feed</p>
          </div>
        </div>

        <div className="centerHome">
          <header className='welcomeTextHome'>
           <p className= 'textHeaderHome'>
            Welcome <strong>username</strong>
           </p>
          </header>
        </div>
        <div className="rightSideHome">
          <button>Add</button>
        </div>
      </div>
    </>

  )
}

export default HomePage