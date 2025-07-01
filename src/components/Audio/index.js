"use client";
import React from "react";
import ReactPlayer from "react-player";

const Audio = ({ data, spaceBefore, spaceAfter }) => {
  const renderAudio = () => {
    return (
      <ReactPlayer
        url={`${data.audio[0].publicUrl}`}
        width="100%"
        controls
        playing={data.audio[0].properties.autoplay === 0 ? false : true}
        style={{ maxHeight: "100px" }}
      />
    );
  };

  return (
    <>
      {data &&
        data.audio &&
        data.audio.length > 0 &&
        data.audio[0].publicUrl && (
          <section
            className={`audio-section ${
              spaceBefore && `frame-space-before-${spaceBefore}`
            } ${spaceAfter && `frame-space-after-${spaceAfter}`}`}
          >
            {renderAudio()}
          </section>
        )}
    </>
  );
};
export default Audio;
