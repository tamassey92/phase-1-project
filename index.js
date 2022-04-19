  //Fetch data from memes API - Done 4.18.22
  //We need our own db.json to post the comments (so they persist) - Created 4.18.22
  fetch('https://api.imgflip.com/get_memes')
  .then(res => res.json())
  .then(json => console.log((json.data.memes)));


 //Use array iteration to get data from our API onto our page. The data should have the meme image/url only. 


//Like button should increment count by 1 each time it is clicked - Partially Done 4.18.22 (Will need to ensure this works for each meme on the page)
  const likeBtn = document.querySelector('button')
  likeBtn.addEventListener('click', () => {
const likes = document.getElementById('likes')
const count = parseInt(likes.innerText)
likes.innerText = count + 1 + ' likes';
})

//Form Submit should append new comment/caption to the ul underneath the specified meme - Partially Done 4.18.22(Will need to ensure this works for each meme on the page)
const form = document.querySelector('#caption-form')
form.addEventListener('submit', (e) => {
  e.preventDefault()
  const newComment = document.createElement('li')  
  const ul = document.querySelector('#caption-comment')
  newComment.innerText = e.target.comment.value;
  ul.append(newComment)
  form.reset()
})
