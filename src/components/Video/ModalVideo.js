"use client";
import React, { useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import ReactPlayer from "react-player";

const ModalVideo = ({ videoModal, setVideoModal, videoModalURL }) => {
  const [loading, setLoading] = useState(true);

  // Function to extract YouTube video ID
  const getYouTubeVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };
  
  // Function to extract Vimeo video ID
  const getVimeoVideoId = (url) => {
    const regExp = /vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^/]*)\/videos\/|)(\d+)(?:|\/\?)/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };

  // Function to check if URL is direct embed
  const isDirectEmbedUrl = (url) => {
    return url.includes('youtube-nocookie.com/embed') || 
           url.includes('youtube.com/embed') ||
           url.includes('player.vimeo.com');
  };

  // Function to render video based on type
  const renderVideo = () => {
    if (!videoModalURL || !videoModalURL.url) return null;
    
    const url = videoModalURL.url;
    
    // Handle direct embed URLs (like youtube-nocookie.com)
    if (isDirectEmbedUrl(url)) {
      return (
        <div className="iframe-wrapper">
          <iframe
            width="100%"
            height="100%"
            src={url}
            title="Video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
            onLoad={() => setLoading(false)}
          ></iframe>
        </div>
      );
    }
    
    // Check if YouTube video
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const videoId = getYouTubeVideoId(url);
      if (videoId) {
        return (
          <div className="iframe-wrapper">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onLoad={() => setLoading(false)}
            ></iframe>
          </div>
        );
      }
    }
    
    // Check if Vimeo video
    if (url.includes('vimeo.com')) {
      const videoId = getVimeoVideoId(url);
      if (videoId) {
        return (
          <div className="iframe-wrapper">
            <iframe
              width="100%"
              height="100%"
              src={`https://player.vimeo.com/video/${videoId}?autoplay=1`}
              title="Vimeo video player"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              onLoad={() => setLoading(false)}
            ></iframe>
          </div>
        );
      }
    }
    
    // For local videos, use ReactPlayer
    return (
      <ReactPlayer
        url={url}
        width="100%"
        height="100%"
        controls
        onReady={() => {
          setLoading(false);
        }}
        playing={videoModalURL.autoplay}
      />
    );
  };

  const modalStyle = {
    maxWidth: '1200px',
    width: '100%',
    margin: '0 auto'
  };

  return (
    <Modal
      show={videoModal}
      onHide={() => setVideoModal(!videoModal)}
      className="video-modal"
      centered
      size="lg"
      dialogClassName="modal-90w"
    >
      <Modal.Header closeButton />
      <Modal.Body className="p-0">
        <div className={`video-screen ${loading ? "loading" : "loaded"}`}>
          {loading && (
            <div className="spinner-wrapper">
              <Spinner animation="grow" variant="light" />
            </div>
          )}
          {renderVideo()}
        </div>
      </Modal.Body>
    </Modal>
  );
};
export default ModalVideo;
