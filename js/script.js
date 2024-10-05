const loadAllPost = async (category) => {
  //   console.log(
  //     `https://openapi.programming-hero.com/api/retro-forum/posts${
  //       category ? `?category=${category}` : ""
  //     }`
  //   );

  const res = await fetch(
    `https://openapi.programming-hero.com/api/retro-forum/posts${
      category ? `?category=${category}` : ""
    }`
  );
  const data = await res.json();

  displayAllPost(data.posts);
};
loadAllPost();

const displayAllPost = (posts) => {
  const postContainer = document.getElementById("post-container");
  posts.forEach((post) => {
    const div = document.createElement("div");
    const {
      category,
      image,
      author,
      title,
      description,
      comment_count,
      view_count,
      posted_time,
      isActive,
    } = post;

    div.innerHTML = `
    <div>
          <div class="p-6 lg:p-12 flex gap-6 lg:flex-row flex-col items-center lg:items-start bg-[#F3F3F5] rounded-3xl">
      <div class="indicator">
          <span class="indicator-item badge ${
            isActive ? "bg-green-500" : "bg-red-500"
          }"></span>
          <div class="avatar">
              <div class="w-24 rounded-xl">
              <img src="${image}">
              </div>
          </div>
          </div>
          <div class="space-y-4 w-full">
            <div class="flex gap-4 *:opacity-60">
              <p># ${category}</p>
              <p>Author: ${author ? author.name : "Anoumus"}</p>
          </div>
          <h3 class="text-2xl font-bold opacity-70">
              ${title}
          </h3>
          <p class="opacity-40">
         ${description}
          </p>
          <hr class="border border-dashed border-gray-300">
          <div class="flex justify-between *:font-bold [&amp;>*:not(:last-child)]:opacity-45">
              <div class="flex gap-4">
              <div class="space-x-2 flex items-center">
                  <i class="fa-regular fa-comment-dots" aria-hidden="true"></i>
                  <p>${comment_count}</p>
              </div>
              <div class="space-x-2 flex items-center">
                  <i class="fa-regular fa-eye" aria-hidden="true"></i>
                  <p>${view_count}</p>
              </div>
              <div class="space-x-2 flex items-center">
                  <i class="fa-regular fa-clock" aria-hidden="true"></i>
                  <p>${posted_time} Min</p>
              </div>
              </div>
               <div class="opacity-100">
              <button id="addToList" onclick="markAsRead('${description}','${view_count}')" data-post="{&quot;id&quot;:101,&quot;category&quot;:&quot;Comedy&quot;,&quot;image&quot;:&quot;https://i.ibb.co/0QRxkd5/pexels-jan-kop-iva-3525908.jpg&quot;,&quot;isActive&quot;:true,&quot;title&quot;:&quot;10 Kids Unaware of Their Costume&quot;,&quot;author&quot;:{&quot;name&quot;:&quot;John Doe&quot;},&quot;description&quot;:&quot;It is one thing to subject yourself to a costume mishap&quot;,&quot;comment_count&quot;:560,&quot;view_count&quot;:1568,&quot;posted_time&quot;:5}" class="addToList btn btn-circle bg-green-500 btn-sm">
                  <i class="fa-solid fa-envelope-open text-white" aria-hidden="true"></i>
              </button>
              </div>
          </div>
          </div>
      </div>

    </div>
    `;

    postContainer.appendChild(div);
  });
};

const markAsRead = (description, view_count) => {
  const markAsReadContainer = document.getElementById("markAsReadContainer");
  let markAsCounter = document.getElementById("markAsReadCounter").innerText;
  markAsCounter++;
  const div = document.createElement("div");
  div.innerHTML = `
   <div class="flex">
        <div class="flex justify-between p-2 lg:p-3 bg-white rounded-2xl items-center gap-3">
            <div class="lg:w-4/5 w-11/12">
                <p>
               ${description}
                </p>
            </div>
            <div class="lg:w-1/5 w-4/12 flex justify-end">
                <p><i class="fa-regular
                fa-eye" aria-hidden="true"></i> ${view_count}</p>
            </div>
        </div>
    </div>
  `;
  markAsReadContainer.appendChild(div);
  document.getElementById("markAsReadCounter").innerText = markAsCounter;
};

const handleSearchByCategory = () => {
  const searchText = document.getElementById("searchPosts").value.trim();

  loadAllPost(searchText);
};
