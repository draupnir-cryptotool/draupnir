import React, { Component } from 'react';
import ImageDisplay from './ImageDisplay'
import Photo from './Photo'
import * as imageAPI from '../api/image'

export default function Image({
  uploadPhoto, 
  image, 
  clientId, 
  closeImageModal
}) {
    return (
      <div>
        <ImageDisplay 
          uploadPhoto = { uploadPhoto }
          clientId={ clientId }
          closeImageModal={ closeImageModal }
        />
        {
          !! image ? (
            <Photo url={ image.s3URL } />
          ) :
          (
            <p>Loading..</p>
          )
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