"use client";

import { Modal, Spinner } from "react-bootstrap";
import GlobalContext from "@/context/GlobalContext";
import { useContext, useState } from "react";
import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player"));

const ModalVideo = ({ videoModal, setVideoModal, url }) => {
  const { videoModalURL } = useContext(GlobalContext);

  const [loading, setLoading] = useState(true);

  return (
    <Modal
      show={videoModal}
      onHide={() => setVideoModal(!videoModal)}
      className="video-modal"
      centered
    >
      <Modal.Header closeButton />
      <Modal.Body>
        <div className={`video-screen ${loading ? "loading" : "loaded"}`}>
          {loading && (
            <div className="spinner-wrapper">
              <Spinner animation="grow" variant="light" />
            </div>
          )}
          <ReactPlayer
            url={`${url}`}
            width="100%"
            height="100%"
            controls
            onReady={() => {
              setLoading(false);
            }}
            playing={true}
            config={{
              youtube: {
                playerVars: { showinfo: 1 },
              },
            }}
          />
        </div>
      </Modal.Body>
    </Modal>
  );
};
export default ModalVideo;
