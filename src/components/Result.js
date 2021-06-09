import React from "react";

const Result = ({ resultContainer, isGenerated }) => {
    return (
        <div className="resultBox">
            {isGenerated && <h3>Right click and save your meme!</h3>}
            <div ref={resultContainerRef} />
        </div>
    );
};
export default Result;