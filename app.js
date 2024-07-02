console.log("JS");
const API__URL = "https://dummyjson.com";
const categories = document.querySelector(".filter__categories");

async function fetchData(URL, category = "") {
  let endpoint = `${URL}/products`;
  if (category && category !== "all") {
    endpoint = `${URL}/products/category/${category}`;
  }
  const data = await fetch(endpoint, {
    method: "GET",
  });
  data
    .json()
    .then((res) => mapProducts(res))
    .catch((err) => console.log(err));
}

fetchData(API__URL);

async function filterCategory(url) {
  let data = await fetch(`${url}/products/categories`, {
    method: "GET",
  });

  data
    .json()
    .then((res) => createCategories(res))
    .catch((err) => console.log(err));
}

filterCategory(API__URL);

function createCategories(data) {
  console.log(data);
  let categoryTag = `<li class="filter__category"><a href='#'>all</a></li>`;
  data.forEach((category) => {
    categoryTag += `
            <li class="filter__category"><a href='#'>${category.name}</a></li>
        `;
  });
  categories.innerHTML = categoryTag;
}

categories.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    let categoryName = e.target.innerHTML;
    fetchData(API__URL, categoryName);
  }
});

function mapProducts(data) {
  console.log(data);
  let products = "";
  data.products.forEach((product) => {
    products += `
         <tr>
            <td class="owner__wrapper">
                <img src=${product?.images[0]} alt="img">
                <p>${product?.title}</p>
            </td>
            <td class="owner__date">${product?.returnPolicy}</td>
            <td class="owner__profits">$ ${product?.price}</td>
            <td class="owner__losses">${product?.stock}</td>
            <td class="owner__phone">${product?.category}</td>
        </tr>
        `;
  });
  document.querySelector(".tbody").innerHTML = products;
}
