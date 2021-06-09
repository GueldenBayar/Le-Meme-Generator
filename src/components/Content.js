import React from "react";

const Content = ({
    imageContainerRef,
    activeImage,
    imageDimensions,
    textTop,
    textBottom,
    onImgLoad
}) => {
    const overflowStyle = imageDimensions
 ? {
    maxWidth: imageDimensions.width,
    maxHeight: imageDimensions.height < 280 ? "50px" : "140px"
}
: {};

return (
    <div stlye={{ width: "100%", display: "flex", justifyContent: "center"}} >
        <div className="content maxSize" ref={imageContainerRef}>
            <img 
            onLoad={onImgLoad}
            src={activeImage}
            alt="Meme"
            className="memeImg maxSize"
            />
            <h1 className="textOverflow" style={overflowStyle}>
                {overflowStyle}
            </h1>
            <h2 className="textOverflow" style={overflowStyle}>
                {textBottom}
            </h2>
        </div>
    </div>       
);
};

export default Content;
