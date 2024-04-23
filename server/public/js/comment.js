/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';


export const createComment = async(data, postId)=>{

    try {
        const res = await axios.post(`http://localhost:4000/api/v1/posts/${postId}/comment`, data);
    
        if (res.data.status === 'success') {
          showAlert('success', 'created successfully!');
          window.setTimeout(() => {
            location.assign(`/posts/${postId}`);
          }, 1500);
        }
      } catch (err) {
        showAlert('error', err.response.data.message);
      }
}