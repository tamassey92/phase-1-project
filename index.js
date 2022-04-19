//Fetch data from memes API - Done 4.18.22
//We need our own db.json to post the comments (so they persist) - Created 4.18.22
fetch("https://api.imgflip.com/get_memes")
  .then((res) => res.json())
  .then((json) => getData(json.data.memes.slice(1, 11)));

//TO-DO
//Get data (6-10 memes to display on page) - done 4.19.22
//Each Meme should have its own like button & form submit(caption!)
//Persist added comments/captions by using POST method to the db.json file we created

//Use array iteration to get data from our API onto our page. The data should have the meme image/url only.
function getData(memes) {
  memes.forEach((meme) => {
    const image = document.createElement("img");
    const container = document.querySelector("#meme-container");
    image.src = meme.url;
    container.append(image);

    const span = document.createElement("span");
    const btn = document.createElement("button");
    span.innerText = "0 likes";
    btn.innerText = "Like";
    container.append(span, btn);

    btn.addEventListener("click", () => {
      const count = parseInt(span.innerText);
      span.innerText = count + 1 + " likes";
    });

    const form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", "submit.php");
    const input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("name", "comment");
    const submit = document.createElement("input");
    submit.setAttribute("type", "submit");
    submit.setAttribute("value", "Caption!");

    container.append(form);
    form.appendChild(input);
    form.appendChild(submit);

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const newComment = document.createElement("li");
      const ul = document.querySelector("#caption-comment");
      newComment.innerText = e.target.comment.value;
      ul.append(newComment);
      form.reset();
      console.log("Caption clicked");
    });
  });
}

//Like button should increment count by 1 each time it is clicked - Partially Done 4.18.22 (Will need to ensure this works for each meme on the page)

// const likeBtn = document.querySelector("button");
// likeBtn.addEventListener("click", () => {
//   const likes = document.getElementById("likes");
//   const count = parseInt(likes.innerText);
//   likes.innerText = count + 1 + " likes";
// });

// //Form Submit should append new comment/caption to the ul underneath the specified meme - Partially Done 4.18.22(Will need to ensure this works for each meme on the page)
// const form = document.querySelector("#caption-form");
// form.addEventListener("submit", (e) => {
//   e.preventDefault();
//   const newComment = document.createElement("li");
//   const ul = document.querySelector("#caption-comment");
//   newComment.innerText = e.target.comment.value;
//   ul.append(newComment);
//   form.reset();
// });
