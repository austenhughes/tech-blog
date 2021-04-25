const url = "https://localhost3001";

$(function () {
    $("#savebtn").on("click", function (e) {
      const name = $("#name").val();
      const username = $("#username").val();
      const email = $("#email").val();
      const password = $("#password").val();
  
      const newUser = {
        name,
        username,
        email,
        password,
      };
      console.log(newUser);
      fetch(`/api/users/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);
        });
    });

    $("#commentbtn").on("click", function (e) {
      const comment = $("#commentBox").val();
      const date = $("#dateBox").val();
        // ids?
      const newComment = {
        comment,
        date
      };
      console.log(newComment);
      fetch(`/api/comments/newComment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newComment),
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);
        });
    });
  
    $("#postbtn").on("click", function (e) {
      const date = $("#date").val();
      const author = $("#author").val();
      const title = $("#title").val();
      const post = $("#post").val();
        // ids?
      const newPost = {
        date,
        author,
        title,
        post,
      };
      console.log(newPost);
      fetch(`/api/posts/newPost`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);
        });
    });

  });