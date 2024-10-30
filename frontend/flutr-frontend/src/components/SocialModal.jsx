import React, {useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import QRCode from "react-qr-code";

export default function SocialModal({show, handleClose, type, link}) {
    // useEffect(() => {
    //   // Set a timeout to close the modal after 30 seconds
    //   const timeoutId = setTimeout(() => {
    //     handleClose();
    //   }, 30000); // 30 seconds in milliseconds

    //   // Clear the timeout on unmount to avoid memory leaks
    //   return () => clearTimeout(timeoutId);
    // }, []);
    return(
        <div>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Go To {type}!</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <QRCode
                  size={256}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  value={link}
                  viewBox={`0 0 256 256`}
                />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
        </div>
    )
}