import { login, signup, logout } from './login';
import { createCatz, deleteCatz } from './catz';
import { createPost, deletePost } from './post';
import { updateSettings } from './updateSettings';
import { createComment } from './comment'

const loginForm = document.querySelector('.form--login');
const newCatzForm = document.querySelector('.form--category');
const signupForm = document.querySelector('.form--signup');
const userDataForm = document.querySelector('.form-user-data');
const logOutBtn = document.querySelector('.nav__el--logout');
const newPostForm = document.querySelector('.form--post');
const commentForm = document.querySelector('.form--comment');
const btnDeleteCatz = document.querySelectorAll('.btnDelete--category');
const btnEditCatz = document.querySelectorAll('.btnEdit--category')
const btnDeletePost = document.querySelectorAll('.btnDelete--post')
const userMenuBtn = document.getElementById('userMenuBtn');
const userMenuCloseBtn = document.getElementById('userMenuCloseBtn');
const adminMenuBtn = document.getElementById('adminMenuBtn');
const adminMenuCloseBtn = document.getElementById('adminMenuCloseBtn')
var editMode = false; 
var cat_id;

if(adminMenuCloseBtn)
  adminMenuCloseBtn.addEventListener('click', ()=>{
    let element = document.getElementById("sidebar");
    element.classList.remove("active");
  })

if(adminMenuBtn)
  adminMenuBtn.addEventListener('click', ()=>{
    let element = document.getElementById("sidebar");
    element.classList.toggle("active");
  })
  

if (userMenuBtn) 
  userMenuBtn.addEventListener('click', ()=>{
    let sidebar = document.querySelector('.sidebar--nav');
    sidebar.style.display ="flex"
  })

if(userMenuCloseBtn)
  userMenuCloseBtn.addEventListener('click', ()=> {
    let sidebar = document.querySelector('.sidebar--nav');
    sidebar.style.display ="none"
})

if (btnDeletePost)
  Array.from(btnDeletePost).forEach( item => {
  item.addEventListener('click', e => {
    deletePost(e.target.dataset.post_id)
  })
  })

if (btnEditCatz)
  Array.from(btnEditCatz).forEach(item => {
  item.addEventListener("click", (e)=>{
  let data = JSON.parse(e.target.dataset.edit);
  editMode= true;
  document.getElementById('name').value= data.name
  cat_id = data._id
})
})


if (newCatzForm)
  newCatzForm.addEventListener("submit", e => {
     e.preventDefault();
     const name = document.getElementById('name').value;
     createCatz({name , _id: cat_id}, editMode) 
     editMode= false;
  })

if (btnDeleteCatz)
  Array.from(btnDeleteCatz).forEach(item => {
   item. addEventListener("click", e => {
    deleteCatz(e.target.dataset.catid)
   })
})
 

if (loginForm)
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });

if (signupForm)
  signupForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password').value;
    signup(name, email, password, passwordConfirm);
  });

if (logOutBtn) logOutBtn.addEventListener('click', logout);


if (userDataForm)
  userDataForm.addEventListener('submit', e => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);
    updateSettings(form, 'data');
  });

 
if(newPostForm)
  newPostForm.addEventListener('submit', e => {
    e.preventDefault();
    const form = new FormData();
    form.append('title', document.getElementById('title').value);
    form.append('body', document.getElementById('body').value);
    form.append('category', document.getElementById('category').value)
    if(document.getElementById('imageCover').files[0])
      form.append('imageCover', document.getElementById('imageCover').files[0]);
    if(document.getElementById('image1').files[0])
      form.append('images', document.getElementById('image1').files[0]);
    if(document.getElementById('image2').files[0])
      form.append('images', document.getElementById('image2').files[0]);
    if(document.getElementById('image3').files[0])
      form.append('images', document.getElementById('image3').files[0]);
    let data = JSON.parse(document.getElementById('postEdit--data').dataset.post_edit)
    createPost(form, data);
  });
 
 
  if (commentForm)
  commentForm.addEventListener('submit', e => {
    e.preventDefault();
    const comment = document.getElementById('comment').value;
    const postId = document.getElementById('post').dataset.postid;
   createComment({comment}, postId );
  });



// if(newCatBtn)
//   newCatBtn.addEventListener('click', ()=>{
//     const markup = `<form class="form form--cat" id="form--cat">
//     <div class="form__group flex" id="new-cat">
//                         <input class="form__input" id="category"> </input>
//                         <button class="btn-cat btn-green" id="">Create </button>
//                    </div>
//     </form>`;
//     console.log(newCatForm);
//    if(!newCatForm)  
//      document.querySelector('.newcat--form').insertAdjacentHTML('afterbegin', markup);
//   })
