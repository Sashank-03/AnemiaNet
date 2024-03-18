import React, { useState, useRef, useEffect } from "react";
import "./styles.css";
import { RiAddCircleLine } from "react-icons/ri";
import { FaUndo, FaCheck, FaTimes } from "react-icons/fa";
const FingerNail = ({ setfn, setf, setimg }) => {
  const [image, setImage] = useState(null);
  const [polygon, setPolygon] = useState([]);
  const [croppedImage, setCroppedImage] = useState(null);
  const [IsDone, setIsDone] = useState(false);
  const [IsPred, setIsPred] = useState(false);
  const [Data, setData] = useState("");
  const canvasRef = useRef(null);
  const canvasContRef = useRef(null);

  const div2Ref = useRef(null);

  const drawPoints = () => {
    if (image) {
      const ctx = canvasRef.current.getContext("2d");
      const radius = 2;
      ctx.fillStyle = "red";

      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      drawImage();

      polygon.forEach((point) => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, radius, 0, 2 * Math.PI);
        ctx.fill();
      });

      if (polygon.length > 1) {
        ctx.beginPath();
        ctx.moveTo(polygon[0].x, polygon[0].y);
        polygon.forEach((point) => {
          ctx.lineTo(point.x, point.y);
        });
        ctx.strokeStyle = "red";
        ctx.stroke();
      }

      if (polygon.length > 2 && isCloseToStart(polygon[polygon.length - 1])) {
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        ctx.beginPath();
        polygon.forEach((point, index) => {
          if (index === 0) {
            ctx.moveTo(point.x, point.y);
          } else {
            ctx.lineTo(point.x, point.y);
          }
        });
        ctx.closePath();
        ctx.fill();
        setIsDone(true);
        // Crop and display the resulting image
        cropAndDisplayImage();
      }
    }
  };

  const drawImage = () => {
    if (image) {
      const ctx = canvasRef.current.getContext("2d");
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      const displayWidth = ctx.canvas.width;
      const displayHeight = ctx.canvas.height;
      ctx.drawImage(image, 0, 0, displayWidth, displayHeight);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (image) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        // const x = image.width;
        // const y = image.height;
        const { clientWidth, clientHeight } = canvasContRef.current;
        var displayWidth = clientWidth;
        var displayHeight = clientHeight;
        console.log("resize");
        console.log(clientWidth);
        console.log(clientHeight);
        ctx.canvas.width = displayWidth;
        ctx.canvas.height = displayHeight;
        const div2 = div2Ref.current;

        // Ensure both elements are available
        if (div2) {
          const windoheight = window.innerHeight;
          const marginTop = 60 + (windoheight - 60 - 490) / 2;
          div2.style.top = "-" + marginTop + "px";
        }
        setPolygon([]);
        drawImage();
      }
    };

    // Add event listener for resize
    window.addEventListener("resize", handleResize);
  }, [image]);

  useEffect(() => {
    if (image) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      // const x = image.width;
      // const y = image.height;
      const { clientWidth, clientHeight } = canvasContRef.current;
      var displayWidth = clientWidth;
      var displayHeight = clientHeight;
      console.log(clientWidth);
      console.log(clientHeight);
      ctx.canvas.width = displayWidth;
      ctx.canvas.height = displayHeight;

      const div2 = div2Ref.current;

      // Ensure both elements are available
      if (div2) {
        const windoheight = window.innerHeight;
        const marginTop = 60 + (windoheight - 60 - 490) / 2;
        div2.style.top = "-" + marginTop + "px";
      }
      const comp1 = document.querySelector(".cropcomp1");
      const comp2 = document.querySelector(".cropcomp3");
      comp1.style.zIndex = 0;
      comp2.style.zIndex = 0;
      setPolygon([]);
      drawImage();
    }
  }, [image]);

  const loadImage = (input) => {
    const file = input.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const img = new Image();
        img.src = e.target.result;
        img.onload = () => setImage(img);
      };
      reader.readAsDataURL(file);
    }
  };

  const onCanvasClick = (event) => {
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setPolygon((prevPolygon) => [...prevPolygon, { x, y }]);
  };

  useEffect(() => {
    drawPoints();
  }, [polygon]);

  const isCloseToStart = (point) => {
    const start = polygon[0];
    const distance = Math.sqrt(
      (point.x - start.x) ** 2 + (point.y - start.y) ** 2
    );

    return distance < 20;
  };

  const cropAndDisplayImage = () => {
    // const x = image.width;
    // const y = image.height;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    var displayWidth = ctx.canvas.width;
    var displayHeight = ctx.canvas.height;
    // if (x > y) {
    //   const aspectRatio = x / y;
    //   displayWidth = 1000;
    //   displayHeight = 1000 * aspectRatio;
    // } else {
    //   const aspectRatio = y / x;
    //   displayWidth = 700 * aspectRatio;
    //   displayHeight = 700;
    // }

    const minX = Math.min(...polygon.map((point) => point.x));
    const minY = Math.min(...polygon.map((point) => point.y));
    const maxX = Math.max(...polygon.map((point) => point.x));
    const maxY = Math.max(...polygon.map((point) => point.y));
    const width = maxX - minX;
    const height = maxY - minY;

    const newCanvas = document.createElement("canvas");
    newCanvas.width = displayWidth;
    newCanvas.height = displayHeight;

    const newContext = newCanvas.getContext("2d");

    // Set up a clipping path based on the scaled polygon
    newContext.beginPath();
    newContext.moveTo(polygon[0].x, polygon[0].y);
    polygon.forEach((point) => {
      newContext.lineTo(point.x, point.y);
    });
    newContext.closePath();

    // Clip the canvas based on the scaled polygon
    newContext.clip();

    // Draw the original image onto the cropped canvas
    newContext.drawImage(
      image,

      0,
      0,
      displayWidth,
      displayHeight
    );
    // Reset the clipping path
    newContext.restore();
    const imageData = newContext.getImageData(minX, minY, width, height);
    const newCanvas1 = document.createElement("canvas");
    newCanvas1.width = width;
    newCanvas1.height = height;

    const newContext1 = newCanvas1.getContext("2d");
    newContext1.putImageData(imageData, 0, 0);
    const newCanvas2 = document.createElement("canvas");
    newCanvas2.width = 224;
    newCanvas2.height = 224;
    const newContext2 = newCanvas2.getContext("2d");
    newContext2.drawImage(newContext1.canvas, 0, 0, 224, 224);
    newContext2.fillStyle = "black";
    const dataURL = newCanvas2.toDataURL("image/png");
    setData(dataURL);
    const newImage = new Image();
    newImage.src = newCanvas2.toDataURL("image/png");

    setCroppedImage(newImage);
  };

  function sendToServer(dataURL) {
    // Send dataURL to server route /finger nail
    fetch("https://anemianetserver-j553.onrender.com/finger_nail", {
      method: "POST",
      body: JSON.stringify({ image_data: dataURL }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle response from server
        setimg(dataURL);
        setf((prevData) => {
          const newData = [...prevData];
          newData[1] = data.cnn;
          newData[4] = data.knn;
          newData[7] = data.rf;
          return newData;
        });
        setfn(true);
        displayPredictions(data);
        console.log(data);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
      });
  }
  const undoLastPoint = () => {
    setPolygon((prevPolygon) => {
      const newPolygon = [...prevPolygon];
      newPolygon.pop(); // Remove the last point
      return newPolygon;
    });
  };
  const handleDoneClick = () => {
    setImage(null);
    const comp1 = document.querySelector(".cropcomp1");
    const comp2 = document.querySelector(".cropcomp3");
    comp1.style.zIndex = 1;
    comp2.style.zIndex = 1;
    setIsDone(false);
  };
  const claercrop = () => {
    setCroppedImage(null);
    setIsPred(false);
    setfn(false);
    const comp1 = document.querySelector(".cropcomp2");
    comp1.style.boxShadow =
      " rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,rgba(0, 0, 0, 0.3) 0px 30px 60px -30px";
  };
  const clearpopup = () => {
    setCroppedImage(null);
    setImage(null);
    setIsDone(false);
    const comp1 = document.querySelector(".cropcomp1");
    const comp2 = document.querySelector(".cropcomp3");
    comp1.style.zIndex = 1;
    comp2.style.zIndex = 1;
  };
  const Prediction = () => {
    if (!image && croppedImage && !IsPred) {
      sendToServer(Data);
      setIsPred(true);
      const comp1 = document.querySelector(".cropcomp2");
      comp1.style.boxShadow =
        "rgb(0, 255, 0) 0px 50px 100px -20px, rgb(0, 255, 0) 0px 30px 60px -30px";
    }
  };

  const displayPredictions = (data) => {
    const cnnPrediction = document.getElementById("cnnfn");
    if (parseFloat(data.cnn) < 0.5) {
      cnnPrediction.style.color = "red";
      cnnPrediction.textContent =
        "CNN - Anemic" + ((parseFloat(data.cnn) - 1) * 100).toFixed(2) + "%";
    } else {
      cnnPrediction.style.color = "green";
      cnnPrediction.textContent =
        "CNN - Non-Anemic" + (parseFloat(data.cnn) * 100).toFixed(2) + "%";
    }
    const knnPrediction = document.getElementById("knnfn");
    if (parseFloat(data.knn) < 0.5) {
      knnPrediction.style.color = "green";
      knnPrediction.textContent = "KNN - Non-Anemic";
    } else {
      knnPrediction.style.color = "red";
      knnPrediction.textContent = "KNN - Anemic";
    }
    const rfPrediction = document.getElementById("rffn");
    if (parseFloat(data.rf) < 0.5) {
      rfPrediction.style.color = "green";
      rfPrediction.textContent = "RF - Non-Anemic";
    } else {
      rfPrediction.style.color = "red";
      rfPrediction.textContent = "RF - Anemic";
    }
  };

  return (
    <div className="cropcomp2" id="crop-container">
      <h2>Finger Nail</h2>
      {!image && !croppedImage && (
        <div
          className="file-upload-box"
          onClick={() => document.getElementById("file-input2").click()}
        >
          <RiAddCircleLine className="plus-icon" />
          <p className="file-text">
            {image ? "file chosen" : "No file chosen"}
          </p>
          <input
            type="file"
            id="file-input2"
            accept="image/*" // Specify the file types you want to accept
            onChange={(e) => loadImage(e.target)}
          />
        </div>
      )}
      {image && (
        <div className="canvas-center" ref={div2Ref}>
          <div
            className="canvas-container"
            id="canvas-container"
            ref={canvasContRef}
          >
            <canvas
              ref={canvasRef}
              onClick={onCanvasClick}
              style={{ cursor: "crosshair" }}
            ></canvas>

            <button onClick={undoLastPoint} className="btn1">
              <FaUndo />
            </button>
            {IsDone && (
              <button onClick={handleDoneClick} className="btn2">
                <FaCheck />
              </button>
            )}
            <button onClick={clearpopup} className="close-btn">
              <FaTimes />
            </button>
          </div>
        </div>
      )}

      {!image && croppedImage && (
        <div className="cropped-image">
          {/* <h3>Cropped Image:</h3> */}
          <img src={croppedImage.src} alt="Cropped" />

          <button onClick={claercrop} className="btn3">
            <FaTimes />
          </button>
        </div>
      )}
      {IsPred && !image && croppedImage && (
        <div className="predictions">
          <h3>Predictions</h3>
          <h4 id="cnnfn">CNN</h4>
          <h4 id="knnfn">KNN</h4>
          <h4 id="rffn">RF</h4>
        </div>
      )}

      <button className="pbtn" onClick={Prediction}>
        Predict
      </button>
    </div>
  );
};

export default FingerNail;
