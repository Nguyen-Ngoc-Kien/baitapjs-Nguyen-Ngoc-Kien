const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const previewContainer = document.getElementById('previewContainer');
const textDrop = document.getElementsByClassName('text-drop')[0];


dropZone.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', (event) => {
    handleFiles(event.target.files);
});

dropZone.addEventListener('dragover', (event) => {
    event.preventDefault();
    dropZone.style.borderColor = 'blue'; 
});

dropZone.addEventListener('dragleave', () => {
    dropZone.style.borderColor = 'black';
});

dropZone.addEventListener('drop', (event) => {
    event.preventDefault();
    dropZone.style.borderColor = 'black';
    handleFiles(event.dataTransfer.files);
});

function handleFiles(files) {
    if (files.length > 0) {
        const file = files[0];

        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const img = document.createElement('img');
                img.src = event.target.result;
                img.classList.add('preview-image');

                const imgAndIcons = document.createElement('div');
                imgAndIcons.classList.add('img-and-icons');
                imgAndIcons.appendChild(img);

                const fileName = document.createElement('span');
                fileName.textContent = file.name; 
                imgAndIcons.appendChild(fileName);

                const icon = document.createElement('div');
                icon.classList.add('icon');
                icon.innerHTML = '<i class="fas fa-times-circle"></i>';
                imgAndIcons.appendChild(icon);

                previewContainer.appendChild(imgAndIcons);

                icon.addEventListener('click', (e) => {
                    e.stopPropagation(); 
                    imgAndIcons.remove(); 
                });
            };
            reader.readAsDataURL(file);
        } else {
            const imgAndIcons = document.createElement('div');
            imgAndIcons.classList.add('img-and-icons', 'preview-file'); 

            const fileIcon = document.createElement('span');
            fileIcon.innerHTML = '<i class="fas fa-file-alt"></i>'; 
            fileIcon.classList.add('file-icon');
            imgAndIcons.appendChild(fileIcon);

            const fileName = document.createElement('span');
            fileName.textContent = file.name; 
            imgAndIcons.appendChild(fileName);

            const icon = document.createElement('div');
            icon.classList.add('icon-blue'); 
            icon.innerHTML = '<i class="fas fa-times-circle"></i>';
            imgAndIcons.appendChild(icon);

            previewContainer.appendChild(imgAndIcons);

            icon.addEventListener('click', (e) => {
                e.stopPropagation(); 
                imgAndIcons.remove(); 
            });
        }
    }
}
