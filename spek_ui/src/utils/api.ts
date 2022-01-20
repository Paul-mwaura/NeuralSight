import { BACKEND_URL, BASE_URL } from '../config';
import axios from 'axios';
import React, { useContext } from 'react';
import { ImageContext } from '../contextManagers/imagesContext';
import { useHistory } from 'react-router';

export const getMessage = async () => {
  const response = await fetch(BACKEND_URL);
  const data = await response.json();

  if (data.message) {
    return data.message;
  }

  return Promise.reject('Failed to get message from backend');
};



export const imageUpload = async (
  conf_thresh: any,
  iou_thresh: any,
  patient_id: any,
  files: any) => {
  
  const body = new FormData();
  body.append('file', files[0][0]);
  const token = localStorage.getItem('token');

  const response = await axios.post(`https://prod.api.neurallabs.africa/api/v1/pred/?patient_id=${patient_id}3&conf_thresh=${conf_thresh}&iou_thresh=${iou_thresh}`, body,
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      }
    })

  if (response.status === 200) {;
    const result = {
      crop_image: `${BASE_URL}/${response.data.image_crops[0]}`,
      full_image: `${BASE_URL}/${response.data.file_response.path}/${response.data.file_response.filename}`
    }
    return result;
  }
  // else {
  //   if (response.data.file_response.status === 400) {
  //     throw new Error('Internal server error');
  //   }
  //   if (response.status >= 400 && response.status < 500) {
  //     if (response.detail) {
  //       throw response.detail;
  //     }
  //     throw response;
  //   }
  // }
}

