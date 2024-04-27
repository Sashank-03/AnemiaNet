import "./home.css";
import img from "../../images/home4.jpg";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="mhome">
      <div className="hmain">
        <div className="home">
          <div className="content">
            <p className="p1">
              <span style={{ fontSize: "4em" }}>Anemia,</span>
              <br></br> a common medical condition, occurs when there's a
              shortage of red blood cells or hemoglobin, impacting the blood's
              ability to carry oxygen efficiently.
            </p>
            {/* <p className='p2'>Causes: Nutritional deficiencies (iron, vitamin B12, folate), chronic diseases (kidney disease, cancer), genetic conditions (sickle cell anemia, thalassemia), and blood loss from injury or menstruation.</p> */}

            <div className="carousel-parent">

                <ul className="carousel">

                  <li className="p3">
                    <span style={{ fontWeight: "500" }}>Symptoms:&nbsp;</span> Fatigue,
                    weakness, shortness of breath, dizziness, pale skin, cold hands
                    and feet, chest pain, and headache.
                  </li>

                  <li className="p4">
                    In India, as of 2021, around 50% of women and 20% of men are
                    affected by anemia, according to the World Health Organization
                    (WHO).
                  </li>

                  <li className="p5">
                    Globally, anemia affects approximately 1.62 billion people,
                    with the highest prevalence in preschool-age children,
                    pregnant women, and women of reproductive age, as reported by
                    the Global Burden of Disease study in 2020.
                  </li>
                </ul>
            </div>


          </div>
          <div className="image">
            <img src={img} alt="sjdbcjh" />
          </div>
        </div>
        <p className="ftxt">
          Our website, <span style={{ fontSize: "1.5em" }}>AnemiaNet,</span>{" "}
          uses advanced algorithms like CNN, KNN, Decision Trees, and SVM to
          predict anemia, helping users detect it early and plan personalized
          treatments.
        </p>
        <Link to="/prediction">
          <button className="button-30-home" role="button">
            Predict Now!!
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
