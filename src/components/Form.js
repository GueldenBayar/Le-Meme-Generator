import React from "react";

const Form = ({
    textTop,
    textBottom,
    handleInputChange,
    handleImageChange,
    handleImageInputChange,
    handleGenerateMeme,
    handleResetMeme,
    isGenerated
}) => {
    return (
        <div className="form">
        <div className="form__inputs">
        <input
        name="text-top"
        placeholder="Text top"
        type="text"
        value={textTop}
        onChange={handleInputChange}
    />
    <input
    name="text-bottom"
    placeholder="Text bottom"
    type="text"
    value={textBottom}
    onChange={handleInputChange}
    />
    </div>
    <div className="form__btns">
        <button
        className="btn btn-primary"
        type="button"
        onClick={handleImageChange}
        >
        Change picture
    </button>
    <label className="btn btn-primary" htmlFor="fileInput">
    Load picture
    <input
    id="fileInput"
    name="fileInput"
    type="file"
    accept=".jpg, .jpeg, .png"
    onChange={handleImageInputChange}
    hidden
    />
    </label>
    <button
    className="btn btn-primary"
    type="button"
    onClick={handleGenerateMeme}
    >
    Generate
    </button>
    {isGenerated && (
        <button
        className="btn btn-danger"
        type="button"
        onClick={handleResetMeme}
        >
        Reset
        </button>
    )}
    </div>
    </div>
    );
};

export default Form;