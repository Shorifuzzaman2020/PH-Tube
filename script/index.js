function removeActiveClass(){
    const activeButtons=document.getElementsByClassName("active");
    for(let btn of activeButtons){
        btn.classList.remove("active");
    }
}

function loadCategory(){
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res)=>res.json())
    .then((data)=>displayCategory(data.categories));
}
function loadVideos(){
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res)=>res.json())
    .then((data)=>{
        removeActiveClass();
        document.getElementById("btn-all").classList.add("active");
        displayVideo(data.videos)
        
    })
}
const loadCategoryVideos=(id)=>{
    const url=`https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
    fetch(url)
    .then((res)=>res.json())
    .then((data)=>{
        removeActiveClass();
        const clickedButton=document.getElementById(`btn-${id}`);
        clickedButton.classList.add("active");
        displayVideo(data.category);
    })
}
const loadVideoDetails=(videoId)=>{
    const url=`https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`
    fetch(url)
    .then(res=>res.json())
    .then(data=>{
        displayVideoDetails(data.video);
    })
}
const displayVideoDetails=(video)=>{
    document.getElementById("video_details").showModal();
    const detailsContainer=document.getElementById("details-container");
    detailsContainer.innerHTML=`
    <div class="card bg-base-100 image-full shadow-sm">
  <figure>
    <img
      src="${video.thumbnail}"
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">Title: <p>${video.title}</p></h2>
    
    <p> Author: ${video.authors[0].profile_name}</p>
    <p> Views: ${video.others.views}</p>
    <p> Description: ${video.description}</p>
    <div class="card-actions justify-end">
    </div>
  </div>
</div> `
}

function displayCategory(categories){
    const categoryContainer=document.getElementById("category-container");
    for(let cat of categories){
        const categoryDiv=document.createElement("div");
        categoryDiv.innerHTML=`
        <button id="btn-${cat.category_id}" onclick="loadCategoryVideos(${cat.category_id})" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
        `;
        categoryContainer.append(categoryDiv);
    }
}
const displayVideo=(videos)=>{
    const videoContainer=document.getElementById("video-container");
    videoContainer.innerHTML="";
    if(videos.length==0){
        videoContainer.innerHTML=`
        <div class="col-span-full text-center flex flex-col justify-center items-center py-20">
            <img class="w-300px" src="./assets/Icon.png" alt="">
            <h2 class="text-2xl font-bold my-6">Oops!! Sorry, There is no content here</h2>
        </div>
        `
    }
    videos.forEach(video => {
        const videoCart=document.createElement("div");
        videoCart.innerHTML=`
        <div class="card bg-base-100">
            <figure class="relative">
              <img class="w-full h-[150px] object-cover"
                src="${video.thumbnail}"
                alt="Song" />
                <span class="absolute bottom-2 right-2 bg-black text-white p-1 text-sm rounded">3hrs 56 min ago</span>
            </figure>
            <div class="py-5 flex gap-3 px-0">
             <div class="profile">
                <div class="avatar">
                    <div class="ring-primary ring-offset-base-100 w-7 rounded-full ring ring-offset-2">
                      <img src="${video.authors[0].profile_picture}"/>
                    </div>
                  </div>
             </div>
             <div class="intro">
                <h2 class="text-sm font-semibold mb-3">${video.title}</h2>
                <p class="text-sm text-gray-400 flex gap-1 mb-3">${video.authors[0].profile_name} <img class="w-5 h-5" src="https://img.icons8.com/?size=100&id=SRJUuaAShjVD&format=png&color=000000" alt=""></p>
                <p class="text-sm text-gray-400">${video.others.views} views</p>
             </div>
        </div>
             <button onclick="loadVideoDetails('${video.video_id}')" class="btn btn-block">Show Details</button>
        
        `;
        videoContainer.append(videoCart);
    });
}
loadCategory();
