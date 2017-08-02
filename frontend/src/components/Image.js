import React from 'react'
import FaFileImg from 'react-icons/lib/fa/file-image-o'
import { Button, OverlayTrigger, Popover } from 'react-bootstrap'
import WarningDeleteModal from '../components/Modal/warningDeleteModal'

export default function Image({
  image,
  openWarningDeleteModalImage,
  openWarningImageModal,
  handleDeleteImage

}) {

  const viewImageStyle = {
    fontSize: '.7em',
    position: 'relative',
    left: '15%',
    marginTop: '1.9em'
  }

  const imageOverlay = (image) => (
    <Popover id="popover-positioned-top" title="Client ID">
      <div>
        <img width={ 200 } height={ 200 } src={image.s3URL} alt="id"/>
      </div>
    </Popover>
  )

  return (
    <div>

      <WarningDeleteModal
        showWarningDeleteModal={ openWarningImageModal }
        warningDeleteModal={ openWarningDeleteModalImage }
        deleteFunction={ handleDeleteImage }
        model={ 'image' }
        id={ image._id }
      />

      <div key={image._id} style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gridGap: '5px', color: "#CB2424"}}>
            <h3 style={{color: 'white'}}>{image.idType}</h3>
            <span className="imgIcon" style={ viewImageStyle }>
              <OverlayTrigger trigger="click" placement="top" overlay={imageOverlay(image)}>
                <FaFileImg size={30}/>
              </OverlayTrigger>
            </span>
            <span onClick={ openWarningDeleteModalImage }><p>[ delete ]</p></span>
          </div>
    </div>
  )
}
