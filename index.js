//Fetch data from memes API - Done 4.18.22
//We need our own db.json to post the comments (so they persist) - Created 4.18.22
fetch("https://api.imgflip.com/get_memes")
  .then((res) => res.json())
  .then((json) => getData(json.data.memes.slice(1, 11)));

//TO-DO
//Get data (6-10 memes to display on page) - done 4.19.22
//Each Meme should have its own like button & form submit(caption!) -done 4.19.22
//Persist added comments/captions by using POST method to the db.json file we created - work in progress 4.20.22

//Use array iteration to get data from our API onto our page. The data should have the meme image/url.
function getData(memes) {
  memes.forEach((meme) => {
    const image = document.createElement("img");
    const container = document.querySelector("#meme-container");
    image.src = meme.url;
    container.append(image);
    //create like button forEach meme
    const span = document.createElement("span");
    const btn = document.createElement("button");
    //Add classes for styling
    span.className = "like-container";
    btn.className = "like-btn";

    span.innerText = "0 likes";
    btn.innerText = "Like";

    // const favSpan = document.createElement('span')
    // const favBtn = document.createElement('button')
    // favSpan.innerText = 'Favorite'
    // favBtn.innerText =

    const ul = document.createElement("ul");

    ul.className = "comment-section";

    container.append(span, btn, ul);
    //add event listener forEach meme's button with event that counts up for each click
    btn.addEventListener("click", () => {
      const count = parseInt(span.innerText);
      span.innerText = count + 1 + " likes";
    });
    //create form forEach meme
    const form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", "submit.php");
    const input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("name", "comment");
    const submit = document.createElement("input");
    submit.setAttribute("type", "submit");
    submit.setAttribute("value", "Caption!");
    //Add class names for styling
    form.className = "form-container";
    input.className = "form-container";
    submit.className = "form-container";
    container.append(form);
    form.appendChild(input);
    form.appendChild(submit);
    //add event listener for Each memes form submit, event will create new comment and append it to that meme's ul
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const newComment = document.createElement("li");
      newComment.className = "comment-section";
      newComment.innerText = e.target.comment.value;
      ul.append(newComment);
      form.reset();
      console.log("Caption clicked");
      //PERSIST comments by using POST to db.json

      const id = meme.id;
      const commentsObj = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          memeId: id,
          content: newComment.innerText,
        }),
      };
      fetch(`http://localhost:3000/comments`, commentsObj)
        .then((res) => res.json())
        .then((object) => object);
    });
  });
}

// window.addEventListener("scroll", (event) => {
//   console.log("Scrolling...");
// });
