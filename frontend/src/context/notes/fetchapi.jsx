fetch(url, {
  method: "POST", 
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(data),
})
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json(); 
  })
  .then((data) => {
    console.log("Message edited created:", data); 
  })
  .catch((error) => {
    console.error("Error creating post:", error);
  });