import './Hero.css'

const Hero = () => {
  return (
    <div className="header">
      <a href="#" className="logo">Motor.sales</a>
      
      {/* Grouping navbar and social media together for clean alignment */}
      <div className="nav-container">
        <div className="navbar">
          <a href="#" style={{"--i": 1}}>Buy</a>
          <a href="#" style={{"--i": 2}}>How it works</a>
          <a href="#" style={{"--i": 3}}>Reviews</a>
          <a href="#" style={{"--i": 4}}>Services</a>
          <a href="#" style={{"--i": 5}}>Articles</a>
        </div>
        
        <div className="social-media">
          <a href="#" style={{"--i": 6}}><img src="fb.jpg" alt="Facebook" /></a>
          <a href="#" style={{"--i": 7}}><img src="ins.jpg" alt="Instagram" /></a>
          <a href="#" style={{"--i": 8}}><img src="twitter.jpg" alt="Twitter" /></a>
        </div>
      </div>
    </div>
  )
}

export default Hero