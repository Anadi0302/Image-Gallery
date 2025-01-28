import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";

// Home Page Component
const Home = ({ dogs, loading, setSelectedImage, setBackgroundColor }) => {
  return (
    <div>
      <h1 className="header">Anadi's Dog Gallery 🐶</h1>

      <div className="description">
        <p>
          Welcome to Anadi's Dog Picture Gallery! Explore a curated collection
          of the cutest dog images from around the world. Click on any dog to
          view it in a larger size and enjoy the beauty and charm of our furry
          friends. You can also choose a background color for your gallery
          experience.
        </p>
      </div>

      <div className="color-picker">
        <label>Background Color:</label>
        <input
          type="color"
          onChange={(e) => setBackgroundColor(e.target.value)}
        />
      </div>

      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <div className="grid">
          {dogs.map((dog, index) => (
            <div
              key={index}
              className="grid-item"
              onClick={() => setSelectedImage(dog)}
            >
              <img src={dog} alt="dog" className="dog-image" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// About Us Page Component
const AboutUs = () => {
  return (
    <div className="about-us">
      <h1>About Us</h1>
      <p>
        Welcome to Anadi's Dog Gallery app! We bring you the best dog images
        from all over the world. Our mission is to share the joy and happiness
        dogs bring into our lives. This app was created with love and a passion
        for dogs! 🐶
      </p>
      <p>
        You can contact me at:
        <br />
        <a href="mailto:anadirajput.pat@gmail.com" className="contact-link">
          anadirajput.pat@gmail.com
        </a>
      </p>
      <p>
        Check out my work on GitHub:
        <br />
        <a
          href="https://github.com/Anadi0302"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-link"
        >
          Anadi0302
        </a>
      </p>
    </div>
  );
};

const App = () => {
  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");

  const fetchDogImages = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://dog.ceo/api/breeds/image/random/12"
      );
      const data = await response.json();
      setDogs(data.message);
    } catch (error) {
      console.error("Error fetching dog images:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDogImages();
  }, []);

  return (
    <Router>
      <div className="app" style={{ backgroundColor }}>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route
            exact
            path="/"
            element={
              <Home
                dogs={dogs}
                loading={loading}
                setSelectedImage={setSelectedImage}
                setBackgroundColor={setBackgroundColor}
              />
            }
          />
          <Route path="/about" element={<AboutUs />} />
        </Routes>

        {selectedImage && (
          <div className="modal" onClick={() => setSelectedImage(null)}>
            <div className="modal-content">
              <img src={selectedImage} alt="dog" className="modal-image" />
              <button
                className="close-btn"
                onClick={() => setSelectedImage(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </Router>
  );
};

export default App;