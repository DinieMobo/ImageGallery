let currentIndex = 0;
const images = document.querySelectorAll('.gallery img');
const totalImages = images.length;

// Opens the Lightbox module
function openLightbox(event) {
  if (event.target.tagName === 'IMG') {
	const clickedIndex = Array.from(images).indexOf(event.target);
 	currentIndex = clickedIndex;
 	updateLightboxImage();
   	document.getElementById('lightbox').style.display = 'flex';
  }
}

// Closes the Lightbox module
function closeLightbox() {
   document.getElementById('lightbox').style.display = 'none';
}

// Change the Image of the Lightbox based on direction (1 for next, -1 for prev)
function changeImage(direction) {
   currentIndex += direction;
    if (currentIndex >= totalImages) {
        currentIndex = 0;
    } else if (currentIndex < 0) {
        currentIndex = totalImages - 1;
    }
    updateLightboxImage();
    }

// Update the image and image thumbnails of the lightbox module
function updateLightboxImage() {
const lightboxImg = document.getElementById('lightbox-img');
const thumbnailContainer = document.getElementById('thumbnail-container');

// Update the main image of the lightbox module
lightboxImg.src = images[currentIndex].src;

// Clear existing thumbnails of the module
thumbnailContainer.innerHTML = '';

// Add new thumbnails for the module
images.forEach((image, index) => {
  const thumbnail = document.createElement('img');
  thumbnail.src = image.src;
  thumbnail.alt = `Thumbnail ${index + 1}`;
  thumbnail.classList.add('thumbnail');
  thumbnail.addEventListener('click', () => updateMainImage(index));
  thumbnailContainer.appendChild(thumbnail);
});

// Highlight the current thumbnail image of the module
const thumbnails = document.querySelectorAll('.thumbnail');
  thumbnails[currentIndex].classList.add('active-thumbnail');
}

// Update the main image of the module when a thumbnail is clicked
function updateMainImage(index) {
    currentIndex = index;
    updateLightboxImage();
}

// Add initial thumbnails
updateLightboxImage();


// To add keyboard navigation (left/right arrow keys)
document.addEventListener('keydown', function (e) {
  if (document.getElementById('lightbox').style.display === 'flex') {
      if (e.key === 'ArrowLeft') {
         changeImage(-1);
      } else if (e.key === 'ArrowRight') {
         changeImage(1);
  }
 }
});