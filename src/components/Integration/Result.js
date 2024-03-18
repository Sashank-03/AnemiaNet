import "./result.css";
import rst from "../../images/res.png";
const Result = ({ data }) => {
  return (
    <div class="frcontainer">
      <div class="image-section">
        <img src={rst} alt="Resultimg" />
      </div>
      <div class="text-section">
        <h1>Final Results</h1>
        <div  className="head">
          <div>
            <h2>Anemic</h2>
            <h2>{data.yes}%</h2>
          </div>
          <div>
            <h2> Non-Anemic</h2>
            <h2>{data.no}%</h2>
          </div>
        </div>
        <div>
          <h4>
            To Know more about the Anemia click{" "}
            <span>
              <a
                href="https://en.wikipedia.org/wiki/Anemia"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                Here
              </a>
            </span>
          </h4>
        </div>
        <div>
          <p>
            <strong style={{ color: "red" }}>Disclaimer:</strong>
            This anemia detection tool provides informational predictions based
            on machine learning and deep learning models trained on images of
            conjunctiva, palm, and fingernails. It is not a substitute for
            professional medical advice, diagnosis, or treatment.
            {/* The accuracy of
            the predictions may vary, and users should not rely solely on the
            results for healthcare decisions.If you have concerns about your
            health, consult with a licensed healthcare professional for proper
            diagnosis and treatment. */}
          </p>
          <p>
            By using this anemia detection tool, you acknowledge and agree to
            the terms of this disclaimer.
          </p>
        </div>
      </div>
    </div>
  );
};
export default Result;
