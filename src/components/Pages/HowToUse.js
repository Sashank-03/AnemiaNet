import React, { useState, useRef } from "react";
import "./howtouse.css";
import imgcap from "../../images/ImageCapture.jpg";
import imgup from "../../images/ImageUpload.jpg";
import imgcrp from "../../images/ImageCrop.png";
import pred from "../../images/Predict.jpg";
import rpt from "../../images/Repeat.jpg";
import fpred from "../../images/FinalPredict.jpg";
import tt from "../../images/Tutorial-Thumbnail.jpg";
import tutorial from "../../video/Tutorial.mp4";
const HowToUse = () => {
  const instructionsRef = useRef(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrolllLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (event) => {
    setIsMouseDown(true);
    setStartX(event.pageX - instructionsRef.current.offsetLeft);
    setScrollLeft(instructionsRef.current.scrollLeft);
  };

  const handleMouseMove = (event) => {
    if (!isMouseDown) return;
    const x = event.pageX - instructionsRef.current.offsetLeft;
    const walk = x - startX;
    instructionsRef.current.scrollLeft = scrolllLeft - walk;
  };

  const handleMouseUp = () => {
    if (!isMouseDown) return;

    setIsMouseDown(false);

    const itemWidth = instructionsRef.current.offsetWidth;
    const halfItemWidth = itemWidth / 2;
    const currentScroll = instructionsRef.current.scrollLeft;

    if (currentScroll % itemWidth < halfItemWidth) {
      instructionsRef.current.scrollLeft =
        Math.floor(currentScroll / itemWidth) * itemWidth;
    } else {
      instructionsRef.current.scrollLeft =
        Math.ceil(currentScroll / itemWidth) * itemWidth;
    }
  };

  const scrollCard = (scrollAmount) => {
    const maxScroll =
      instructionsRef.current.scrollWidth - instructionsRef.current.clientWidth;
    let newScroll = instructionsRef.current.scrollLeft + scrollAmount;

    // Check if new scroll position exceeds maximum scroll position
    if (newScroll > maxScroll || newScroll < 0) {
      newScroll = 0; // Set scroll position to 0
    }

    instructionsRef.current.scrollLeft = newScroll;
  };

  const scrollLeft = () => {
    const cardWidth = instructionsRef.current.offsetWidth; // Width of the card
    scrollCard(-cardWidth);
  };

  const scrollRight = () => {
    const cardWidth = instructionsRef.current.offsetWidth; // Width of the card
    scrollCard(cardWidth);
  };

  return (
    <div className="htumain">
      <div className="scroll-container">
        <button className="scroll-button left" onClick={scrollLeft}>
          {"<"}
        </button>
        <div
          className="instructions"
          ref={instructionsRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div className="i-card">
            <div className="leftbox">
              <img src={imgcap} alt="Capture"></img>
            </div>
            <div className="rightbox">
              <h2>1 Image Capture</h2>
              <p>
                -Take the images of your Palm, Nails and the conjunctiva of the
                eye to upload them in the predictions page.
              </p>
              <p>
                {" "}
                -Please follow the Image Guidelines mentioned below in order to
                get the accurate results
              </p>
            </div>
          </div>
          <div className="i-card">
            <div className="leftbox">
              <img src={imgup} alt="upload"></img>
            </div>
            <div className="rightbox">
              <h2> 2 Image Upload</h2>
              <p>- Upload the captured images into the predictions page</p>
              <p>- Carefully upload the image in the Designated input feilds</p>
            </div>
          </div>
          <div className="i-card">
            <div className="leftbox">
              <img src={imgcrp} alt="Crop"></img>
            </div>
            <div className="rightbox">
              <h2>3 Image Cropping</h2>
              <p>
                - Now you need to crop the uploaded image according to the video
                guide given below.
              </p>
              <p>
                {" "}
                - Kindly note that you follow the exact method of cropping as
                shown in the video guide
              </p>
            </div>
          </div>
          <div className="i-card">
            <div className="leftbox">
              <img src={pred} alt="Predict"></img>
            </div>
            <div className="rightbox">
              <h2> 4 Prediction</h2>
              <p>
                -Press the predict button for each of the uploaded image to know
                the various results for that particular image
              </p>
            </div>
          </div>
          <div className="i-card">
            <div className="leftbox">
              <img src={rpt} alt="Repeat"></img>
            </div>
            <div className="rightbox">
              <h2> 5 Repetition</h2>
              <p>
                -Repeat the above steps similarly for each image to get the
                output{" "}
              </p>
              <p>
                -The final output can only be accessed after all three outputs
                are predicted
              </p>
            </div>
          </div>
          <div className="i-card">
            <div className="leftbox">
              <img src={fpred} alt="Final Predict"></img>
            </div>
            <div className="rightbox">
              <h2> 6 Final Prediction</h2>
              <p>
                -After completing the above mentioned process the final
                prediction button appears on the screen
              </p>
              <p>
                -Upon clicking the button you will be directed to the final
                result whether you are Anemic or Not .
              </p>
            </div>
          </div>
        </div>
        <button className="scroll-button right" onClick={scrollRight}>
          {">"}
        </button>
      </div>
      <div className="vbox">
        <div className="video">
          <h2>Tutorial Video</h2>
          <video
            poster={tt}
            src={tutorial}
            controls
            autoPlay={false}
            onPause={() => console.log("pause")}
            onPlay={() => console.log("play")}
            className="orgv"
          />
        </div>
        <div className="tips">
          <h2>Guidelines for Image Capture and Upload </h2>
          <ul>
            <li>Click the images in a well-lit environment</li>
            <li>Keep the device stable while clicking the image</li>
            <li>Ensure that the lenses are clean before clicking the image</li>
            <li>Follow the video guide for reference</li>
            <li>
              Consider taking the image in landscape for better aspect ratio
            </li>
            <li>For the fingernail image upload the image of the thumb</li>
            <li>
              For the conjunctiva image carefully observe the video to
              understand how to capture the conjunctiva clearly in the eye
            </li>
            <li>
              Ensure that the hands are clean before taking the image of the
              Palm
            </li>
            <li>
              Be careful while taking the image of the eye as it is a very
              sensitive organ, ensure your hands are clean before touching the
              conjunctiva region and try not to harm your eyes while capturing
              the image.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default HowToUse;
