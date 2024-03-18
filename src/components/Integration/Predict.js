import React, { useRef, useState } from "react";
import Conjunctiva from "./Conjunctiva";
import FingerNail from "./FingerNail";
import Palm from "./Palm";
import "./predict.css";
import Result from "./Result";
import { getUserEmail } from "../auth/UserEmail";
import { db } from "../../firebase";
import {
  collection,
  addDoc,
  updateDoc,
  serverTimestamp,
  doc,
} from "firebase/firestore";
const Predict = () => {
  const fbcontRef = useRef(null); // Create a ref

  const [Cj, setCj] = useState(false);
  const [Cjimg, setCjimg] = useState("");
  const [Fn, setFn] = useState(false);
  const [Fnimg, setFnimg] = useState("");
  const [Pm, setPm] = useState(false);
  const [Pmimg, setPmimg] = useState("");
  const [Final, setFinal] = useState(false);
  const [Data, setData] = useState(null);
  const [Features, setFeatures] = useState(Array(9).fill("0"));
  const finalprediction = () => {
    document.removeEventListener("mouseup", handleMouseUp);
    fetch("https://anemianetserver-j553.onrender.com/final", {
      method: "POST",
      body: JSON.stringify({ features: Features }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle response from server
        const res = {
          cjcnn: Features[0],
          cjknn: Features[3],
          cjrf: Features[6],
          fncnn: Features[1],
          fnknn: Features[4],
          fnrf: Features[7],
          pmcnn: Features[2],
          pmknn: Features[5],
          pmrf: Features[8],
          yes: data.yes,
          no: data.no,
          cjimg: Cjimg,
          fnimg: Fnimg,
          pmimg: Pmimg,
          time: serverTimestamp(),
        };
        try {
          const email = getUserEmail();
          addDoc(collection(db, email), res).then((docRef) => {
            updateDoc(doc(db, email, docRef.id), { DocId: docRef.id });
            console.log(docRef.id);
          });
        } catch (error) {
          console.error("Error storing data: ", error);
        }

        setData(data);
        setFinal(true);
        console.log(data);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
      });
  };
  const newprediction = () => {
    setFinal(false);
    setCj(false);
    setFn(false);
    setPm(false);
  };
  // Event handler for mouse down (click and hold)
  const handleMouseDown = () => {
    if (fbcontRef.current) {
      fbcontRef.current.style.display = "none"; // Hide .fbcont
    }
  };
  const handleMouseUp = () => {
    if (fbcontRef.current) {
      fbcontRef.current.style.display = "flex"; // Show .fbcont
    }
  };
  document.addEventListener("mouseup", handleMouseUp);

  return (
    <div className="predict">
      {!Final && (
        <div className="prediction">
          <Conjunctiva
            setcj={setCj}
            setf={setFeatures}
            setimg={setCjimg}
          ></Conjunctiva>
          <FingerNail
            setfn={setFn}
            setf={setFeatures}
            setimg={setFnimg}
          ></FingerNail>
          <Palm setpm={setPm} setf={setFeatures} setimg={setPmimg}></Palm>
          {Cj && Fn && Pm && (
            <div className="fbcont" ref={fbcontRef}>
              <div
                style={{
                  position: "absolute",
                  height: "40%",
                  width: "50%",
                  top: "0",
                  right: "0",
                }}
                onMouseDown={handleMouseDown}
              >
                {" "}
              </div>
              <div className="popup-content">
                <h2>Final Anemic Prediction</h2>
                <p>
                  Aquired all the required data. Press below button for a final
                  prediction
                </p>
                <button className="fpred" onClick={finalprediction}>
                  Predict
                </button>
                <p style={{ marginTop: "30px", marginBottom: "0" }}>
                  <span style={{ color: "red" }}>Note:</span>Click and Hold on
                  top right area to view previous predictions
                </p>
              </div>
            </div>
          )}
        </div>
      )}
      {Final && (
        <div className="result">
          <Result data={Data}></Result>
          <button className="npred" onClick={newprediction}>
            New Prediction
          </button>
        </div>
      )}
    </div>
  );
};

export default Predict;
