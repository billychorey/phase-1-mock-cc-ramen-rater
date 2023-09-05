document.addEventListener("DOMContentLoaded", () => {
  const fetchUrl = "http://localhost:3000/ramens";
  let imgContainer = document.getElementById("ramen-menu");
  let ramenName = document.getElementById("ramenName");
  let restaurantName = document.getElementById("restaurantName");
  let rating = document.getElementById("rating-display");
  let comment = document.getElementById("comment-display");

  fetch(fetchUrl)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      data.forEach((item) => {
        let ramenImage = document.createElement("img");
        ramenImage.src = item.image;

        imgContainer.appendChild(ramenImage);

        ramenImage.addEventListener("click", handleImageClick);

        function handleImageClick(e) {
          e.preventDefault();
          ramenName.textContent = item.name;
          restaurantName.textContent = item.restaurant;
          rating.textContent = item.rating;
          comment.textContent = item.comment;
        }
      });

      let newRamen = document.getElementById("new-name");
      let newRestaurant = document.getElementById("new-restaurant");
      let newImage = document.getElementById("new-image");
      let newRating = document.getElementById("new-rating");
      let newComment = document.getElementById("new-comment");

      let createRamen = document.getElementById("new-ramen-submit");

      createRamen.addEventListener("click", handleSubmit);

      function handleSubmit(e) {
        e.preventDefault();

        const dbNewName = newRamen.value;
        const dbRestaurant = newRestaurant.value;
        const dbRating = newRating.value;
        const dbImage = newImage.value;
        const dbComment = newComment.value;

        const dbToPost = {
          name: dbNewName,
          restaurant: dbRestaurant,
          image: dbImage,
          rating: dbRating,
          comment: dbComment,
        };

        // Send a POST request to the server
        fetch(fetchUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(dbToPost),
        })
          .then((res) => res.json())
          .then((newRamenData) => {
            console.log("New ramen added:", newRamenData);

            newRamen.value = "";
            newRestaurant.value = "";
            newRating.value = "";
            newImage.value = "";
            newComment.value = "";
          })
          .catch((error) => {
            console.error("Error adding new ramen:", error);
          });
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
});
