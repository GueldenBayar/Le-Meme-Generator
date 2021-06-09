import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import domtoimage from "dom-to-image";
import Content from "./components/Content";
import Form from "./components/Form";
import Result from "./components/Result";
import "./styles/styles.css";
import './App.css';


const App = () => {

  let imageContainer = useRef();
  let resultContainer = useRef();

  const [images, setImages] = useState([]);
  const [activeImage, setActiveImage] = useState("");
  const [imageDimensions, setImageDimensions] = useState(null);
  const[textTop, setTextTop]=useState("");
  const [textBottom, setTextBottom]=useState("");
  const [isGenerated, setIsGenerated]=useState(false);

  const getRandom = useCallback(() => {
    return Math.floor(Math.random() * images.length);
  }, [images.length]);

  const fetchImages = useCallback(async () => {
    const res = await axios.get("https://api.imgflip.com/get_memes");
    return res.data.data.memes;
  }, []);

  useEffect(() => {
    fetchImages().then((res) => {
      setImages(res);
      setActiveImages(res[getRandom()].url);
    });
  }, [getRandom, fetchImages]);

  const handleInputChange = ({ target: { name, value} }) => {
    name === "text-top" ? setTextTop(value) : setTextBottom(value);
  };

  const handleImageChange = () => {
    const newPic = images[getRandom()];
    setActiveImage(newPic.url);
  };

  const handleImageInputChange = ({ target }) => {
    try {
      const userImageUrl = window.URL.createObjectURL(target.files[0]);
      setActiveImage(userImageUrl);
      target.value = "";
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleGenerateMeme = () => {
    const { current: container } = imageContainerRef;
    const { current: result } = resultContainerRef;
    if(result.childNodes.length > 0) {
      result.removeChild(result.childNodes[0]);
    }
    domtoimage
    .toPng(container)
    .then((dataUrl) => {
      let meme = new Image();
      meme.src = dataUrl;
      meme.className = "memeResult";
      result.appendChild(meme);
      setIsGenerated(true);
    })
    .catch((error) => {
      console.error("oooooooops, something went wrong!", error);
    });
  };

  const handleImageLoad = ({ target: { offsetHeight, offsetWidth } }) => {
    setImageDimensions({
      width: offsetWidth,
      height: offsetHeight
    });
  };

  const handleResetMeme = () => {
    const { current } = resultContainerRef;
    if (current.childNodes.length) {
      current.removeChild(current.childNodes[0]);
      setIsGenerated(false);
      setTextTop("");
      setTextBottom("");
    }
  };

  return (
    <>
      <p className="generatorTitle">I Can Has Memes?</p>
      <Form
      textTop={textTop}
      textBottom={textBottom}
      handleImageInputChange={handleImageInputChange}
      handleInputChange={handleInputChange}
      handleImageChange={handleImageChange}
      handleGenerateMeme={handleGenerateMeme}
      handleResetMeme={handleResetMeme}
      isGenerated={isGenerated}
      />
      <Content 
      activeImage={activeImage}
      onImgLoad={handleImageLoad}
      imageDimensions={imageDimensions}
      imageContainerRef={imageContainerRef}
      textBottom={textBottom}
      textTop={textTop}
      />
      <Result 
      resultContainerRef={resultContainerRef}
      isGenerated={isGenerated}
      />
    </>
  );
}

export default App;
