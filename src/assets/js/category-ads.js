import BasePage from './base-page';

class CategoryAds extends BasePage {
  async  onReady() {
const CatElement = document.querySelector('#category-ads');

if (!CatElement || !salla.url.is_page('product.index')) {
    return;
}

const cat_id = CatElement.dataset.catid;

    try {
        await salla.api.request('component/list', { params: { paths: ['home.category-ads'] } })
        .then((res) => {
             const catArray = res.data[0].component.category_ads;
 
            catArray.forEach(element => {
                if(element.category[0] == cat_id || element.category.id == cat_id){

                    // Check if video should be used
                    if (element.use_video && element.video_url) {
                        CatElement.innerHTML = ''; // Clear existing content
                        const video = document.createElement('video');
                        video.src = element.video_url;
                        video.muted = true;
                        video.autoplay = true;
                        video.loop = true; // Added loop for continuous play
                        video.playsinline = true; // Added for better mobile compatibility
                        video.style.width = '100%';
                        video.style.height = '100%';
                        video.style.objectFit = 'cover'; // Make video cover the container
                        CatElement.appendChild(video);
                        CatElement.style = 'display: block;'; // Adjust display style for video
                    } else if (element.image) { // Keep original logic if no video or image exists
                        CatElement.style.backgroundImage = `url(${element.image})`;
                        CatElement.style.display = 'flex';
                       // CatElement.style.fontFamily = element.title_font[0];
                        CatElement.style.color = element.title_color;
                        console.log(element);
                     //   console.log(element.title_color);
                        if (element?.title) CatElement.innerHTML = `<h3 class="place-self-center text-3xl">${element.title}</h3>`;
                    }
                }
                
            });
          
             
        });
  
    } catch (e) {
        salla.logger.error(e);
    }
 
}
}

CategoryAds.initiateWhenReady(['product.index']);


    