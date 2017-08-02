import React, { Component } from 'react';
import ImageForm from './ImageForm'
import Photo from './Photo'
import * as imageAPI from '../api/image'

export default function uploadImage({
  uploadPhoto, 
  image, 
  clientId, 
  closeImageModal
}) {
    return (
      <div>
        <ImageForm
          uploadPhoto = { uploadPhoto }
          clientId={ clientId }
          closeImageModal={ closeImageModal }
        />
        {
          !! image ? (
            <Photo url={ image.s3URL } />
          ) 
          :
            ""
        }  
      </div>
    )
  }
// <Dropzone onDrop={ this.onDrop }>
//           <p>Try dropping some files here, or click to select files to upload.</p>
//         </Dropzone>
//         {
//           !!image ? (
//             <Photo url={ image }/>
//           ) : (
//             <p>loading..</p>
//           )
//         }


  // onDrop(image) {
  //   let file = image[0]
  //   imageAPI.createImage({ file })
  //   .then(image => {
  //       console.log(image);
  //       this.props.setState({ image: image })
  //   })
  //   .catch(error => {
  //     this.setState({ error })
  //   })
  // }