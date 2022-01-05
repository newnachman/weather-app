import React from 'react';

const ScrollButton = (props) => {
  
  const {showScrollButton} = props;

  const goTop = () => {
    window.scrollTo(0, 0);
  }

  const onKeyPressed = (e) => {
    if (e.key === "Enter") {
      goTop();
    }
  }

  return (
    <div 
      tabIndex="17" 
      onClick={goTop} 
      className={`scroll-top-wrp ${showScrollButton ? "" : "hide-smooth"}`}
      onKeyDown={(e) => onKeyPressed(e)}
      >
      <div className="scroll-top" >
        <div className="arrow">⇡</div>
        <div className="text">UP</div>
      </div>
    </div>
  )
}

export default ScrollButton
