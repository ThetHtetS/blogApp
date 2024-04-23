/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';


export const createCatz = async( data, editMode )=>{
   
    try {
      let res;
      if (editMode) {
         res = await axios.put(`http://localhost:4000/api/v1/category/${data._id}`, data);
    
      }
      else {
        res = await axios.post(`http://localhost:4000/api/v1/category`, data);
    
      }
   
        if (res.data.status === 'success') {
          showAlert('success', 'created successfully!');
          window.setTimeout(() => {
            location.assign('/admin/category');
          }, 1500);
        }
      } catch (err) {
        showAlert('error', err.response.data.message);
      }
}

export const deleteCatz = async(cat_id)=>{

  try {
      const res = await axios.delete(`http://localhost:4000/api/v1/category/${cat_id}`);
  
      if (res.status === 204) {
        showAlert('success', 'deleted successfully!');
        window.setTimeout(() => {
          location.assign('/admin/category');
        }, 1500);
      }
    } catch (err) {
      showAlert('error', err.response.data.message);
    }
}