import React, { useState, useEffect, useCallback } from "react";
import { db } from "../../firebase";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { getUserEmail } from "../auth/UserEmail";
import { MdDelete } from "react-icons/md";
import "./history.css";
const History = () => {
  {
    /* <img src={entry.pmimg} alt="Palm" /> */
  }
  {
    /* <img src={entry.fnimg} alt="FingerNail" /> */
  }
  {
    /* </div> */
  }
  {
    /* <img src={entry.cjimg} alt="Conjunctiva" /> */
  }
  {
    /* <h2 style={{ marginBottom: "13px", marginTop: "17px" }}>Image</h2> */
  }
  {
    /* <h2 style={{ marginBottom: "13px", marginTop: "17px" }}>Image</h2> */
  }
  // <div className="card-content">
  //             <div className="column">
  //               <h2>CNN</h2>
  //               <h2>KNN</h2>
  //               <h2>RF</h2>
  //             </div>
  //             <div className="column">
  //               <div
  //                 style={{
  //                   position: "absolute",
  //                   right: "-30px",
  //                   fontWeight: "bold",
  //                   top: "-10px",
  //                 }}
  //               >
  //                 Conjunctiva
  //               </div>
  //               <div className="cell">{entry.cjcnn}</div>
  //               <div className="cell">{entry.cjknn}</div>
  //               <div className="cell">{entry.cjrf}</div>
  //             </div>
  //             <div className="column">
  //               <div style={{ position: "relative" }}>
  //                 <div
  //                   style={{
  //                     position: "absolute",
  //                     right: "-20px",
  //                     fontWeight: "bold",
  //                     top: "-10px",
  //                   }}
  //                 >
  //                   FingerNail
  //                 </div>
  //               </div>
  //               <div className="cell">{entry.fncnn}</div>
  //               <div className="cell">{entry.fnknn}</div>
  //               <div className="cell">{entry.fnrf}</div>
  //             </div>
  //             <div className="column">
  //               <div style={{ position: "relative" }}>
  //                 <div
  //                   style={{
  //                     position: "absolute",
  //                     right: "0px",
  //                     fontWeight: "bold",
  //                     top: "-10px",
  //                   }}
  //                 >
  //                   Palm
  //                 </div>
  //               </div>
  //               <div className="cell">{entry.pmcnn}</div>
  //               <div className="cell">{entry.pmknn}</div>
  //               <div className="cell">{entry.pmrf}</div>

  // const [historyData, setHistoryData] = useState([]);

  // async function fetchHistoryData() {
  //   const email = getUserEmail();
  //   const historyRef = collection(db, email); // Replace with your collection name
  //   const querySnapshot = await getDocs(historyRef);
  //   const data = [];
  //   querySnapshot.forEach((doc) => {
  //     var datadoc = doc.data();
  //     console.log(doc.data());
  //     const convertValue = (value) => {
  //       if (value === "0") return "Non-Anemic";
  //       else if (value === "1") return "Anemic";
  //       else {
  //         const floatValue = parseFloat(value);
  //         return floatValue > 0.5 ? "Non-Anemic" : "Anemic";
  //       }
  //     };
  //     // Convert values for specified properties
  //     [
  //       "cjcnn",
  //       "cjknn",
  //       "cjrf",
  //       "fncnn",
  //       "fnknn",
  //       "fnrf",
  //       "pmcnn",
  //       "pmknn",
  //       "pmrf",
  //     ].forEach((property) => {
  //       datadoc[property] = convertValue(datadoc[property]);
  //     });
  //     const floatValue = parseFloat(datadoc["yes"]);
  //     datadoc["yes"] = floatValue < 50 ? "Non-Anemic" : "Anemic";
  //     //   console.log(doc);
  //     data.push({ ...datadoc }); // Add timestamp as property
  //   });
  //   data.sort((a, b) => b.time.toDate() - a.time.toDate());
  //   return data;
  // }
  // const loadHistory = async () => {
  //   const data = await fetchHistoryData();
  //   setHistoryData(data);
  // };
  // useEffect(() => {
  //   loadHistory();
  // }, []);

  // const deleteHistoryEntry = async (timestamp) => {
  //   const email = getUserEmail();
  //   await deleteDoc(doc(db, email, timestamp));
  //   loadHistory();
  // };

  const [historyData, setHistoryData] = useState([]);
  const [load, setLoad] = useState(true);

  const fetchHistoryData = useCallback(async () => {
    const email = getUserEmail();
    const historyRef = collection(db, email);
    const querySnapshot = await getDocs(historyRef);
    const data = [];
    querySnapshot.forEach((doc) => {
      var datadoc = doc.data();
      console.log(doc.data());
      const convertValue = (value) => {
        if (value === "0") return "Non-Anemic";
        else if (value === "1") return "Anemic";
        else {
          const floatValue = parseFloat(value);
          return floatValue > 0.5 ? "Non-Anemic" : "Anemic";
        }
      };

      [
        "cjcnn",
        "cjknn",
        "cjrf",
        "fncnn",
        "fnknn",
        "fnrf",
        "pmcnn",
        "pmknn",
        "pmrf",
      ].forEach((property) => {
        datadoc[property] = convertValue(datadoc[property]);
      });
      const floatValue = parseFloat(datadoc["yes"]);
      const am = "Anemic (" + datadoc["yes"]+"%)";
      const nam = "Non-Anemic (" + datadoc["no"]+"%)";
      datadoc["yes"] = floatValue < 50 ? nam : am;
      data.push({ ...datadoc });
    });
    data.sort((a, b) => b.time.toDate() - a.time.toDate());
    return data;
  }, []);

  const loadHistory = useCallback(async () => {
    const data = await fetchHistoryData();
    setHistoryData(data);
    setLoad(false);
  }, [fetchHistoryData]);
  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  const deleteHistoryEntry = async (timestamp) => {
    const email = getUserEmail();
    await deleteDoc(doc(db, email, timestamp));
    setLoad(true);
    setHistoryData([]);
    loadHistory();
  };

  return (
    <div className="history-container">
      {historyData.map((entry) => (
        <div
          key={entry.DocId}
          className="history-box"
          style={
            {
              // boxShadow:
              //   entry.no > 50
              //     ? "0px 29px 52px 0px rgba(126,211,33,1),0px 25px 16px 0px rgba(184,233,134,1)"
              //     : "0px 29px 52px 0px rgba(208,2,27,1),0px 25px 16px 0px rgba(208,2,27,1)",
            }
          }
        >
          <div className="seg1">
          <h3 style={{ color: entry.yes.includes("Non-Anemic") ? "green" : "red" }}>{entry.yes}</h3>
          </div>
          <div className="seg2">
            <div className="col1">
              <div className="nan ele">ABC</div>
              <div className="ele">CNN</div>
              <div className="ele">KNN</div>
              <div className="ele">RF</div>
            </div>
            <div className="col2">
              <div className="shd ele">Conjuctiva</div>
              <div className="ele">{entry.cjcnn}</div>
              <div className="ele">{entry.cjknn}</div>
              <div className="ele">{entry.cjrf}</div>
            </div>
            <div className="col3">
              <div className="shd ele">FingerNail</div>
              <div className="ele">{entry.fncnn}</div>
              <div className="ele">{entry.fnknn}</div>
              <div className="ele">{entry.fnrf}</div>
            </div>
            <div className="col4">
              <div className="shd ele">Palm</div>
              <div className="ele">{entry.pmcnn}</div>
              <div className="ele">{entry.pmknn}</div>
              <div className="ele">{entry.pmrf}</div>
            </div>
          </div>

          <div className="seg3">
            <span className="">
              <p>Time of Prediction:</p>
              {new Date(entry.time.toDate()).toLocaleString()}
            </span>
            <button
              className="button-30"
              onClick={() => deleteHistoryEntry(entry.DocId)}
            >
              <MdDelete />Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default History;
