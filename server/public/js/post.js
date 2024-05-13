/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
 

export const createPost = async( form , data)=>{
    try {
        let res;
        if(data.editMode=='true') {
          res = await axios.put(`https://d13om1uypm19bv.cloudfront.net/api/v1/posts/${data.postId}`, form, 
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
          );
        }
        else {
          res = await axios.post(`https://d13om1uypm19bv.cloudfront.net/api/v1/posts`, form, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
        }
    
        if (res.data.status === 'success') {
          showAlert('success', 'created successfully!');
          // window.setTimeout(() => {
          //   location.assign('/admin/posts');
          // }, 1500);
        }
      } catch (err) {
        showAlert('error', err.response.data.message);
      }
}

export const deletePost = async(post_id)=>{

  try {
      const res = await axios.delete(`http://localhost:4000/api/v1/posts/${post_id}`);
  
      if (res.status === 204) {
        showAlert('success', 'deleted successfully!');
        window.setTimeout(() => {
          location.assign('/admin/posts');
        }, 1500);
      }
    } catch (err) {
      showAlert('error', err.response.data.message);
    }
}