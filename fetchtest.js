const fetchData = async () => {
  console.log("before fetch")

  const data = await fetch("https://jsonplaceholder.typicode.com/posts/1").then(
    (response) => response.json()
  )
  console.log(data)
  console.log("after fetch")
}

fetchData()
