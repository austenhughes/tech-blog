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
      const date = $.now();
      const post_id = $("#postid").text();
      const username = $("#usernameComment").val();
        
      const newComment = {
        comment,
        date,
        post_id,
        username
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
      const date = $.now();
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

    $("#updateThisbtn").on("click", function (e) {
      const id = $("#postid").text();
      const date = $.now();
      const author = $("#author").val();
      const title = $("#title").val();
      const post = $("#post").val();
     
      const updatedPost = {
        id,
        date,
        author,
        title,
        post,
      };
      console.log(updatedPost);
      fetch(`/api/posts/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPost),
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);
        });
    });

    $("#deletebtn").on("click", function (e) {
      const id = $("#postid").text();
      const deletedPost = {

      }
      
      fetch(`/api/posts/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(deletedPost),
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);
        });
    });

  });