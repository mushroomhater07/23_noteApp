$( document ).ready(function() {
  const fileExplorer = $('#file-explorer');
  $.getJSON('/api/files').done((data) => {
    console.log(data);
    data.forEach(element => {
      renderFile(element)
    });
  });

  function renderFile(file, addclassName) {
    const element = $('<div>');
    const icon = $('<div>').addClass('icon');
    icon.css('background-image', `url(${file.isDirectory ? 'folder-2x.png' : 'file-2x.png'})`);

    const name = $('<div>').addClass('name').text(file.name);  
    const size = $('<div>').addClass('size').text(`${file.size} ${formatFileSize(file.name)}`);
    const created = $('<div>').addClass('created').text(`Created: ${file.created}`);
    const modified = $('<div>').addClass('modified').text(`Modified: ${file.modified}`);
  
    element.append(icon, name);
    if(file.isDirectory){  element.click(() => { 
        const allfile = $(`.${file.path.replace("/","-")}`);
        if(allfile.length== 0){
      $.get(`/api/files?path=${encodeURIComponent(file.path)}`).done((data) => {
          data.forEach(element => {
            renderFile(element, file.path.replace("/","-"))
          });
        });
      }   else{ allfile.remove();  }    });
      element.addClass('file').addClass('folder')
    }else {element.addClass('file').append(size)}
    
    if (addclassName) {element.addClass(addclassName);}
    fileExplorer.append(element);
  }
});



function formatFileSize(size) {
  size = parseFloat(size)
  let units = ["B", "KB", "MB", "GB", "TB"];
  let unitIndex = 0;
  while (size >1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
    console.log(size)
  }
  return units[unitIndex];
}



// Get the directories and file lists
const dir1 = document.getElementById('directory1');
const dir2 = document.getElementById('directory2');
const fileList1 = dir1.querySelector('.file-list');
const fileList2 = dir2.querySelector('.file-list');

// Add event listeners for drag and drop
dir1.addEventListener('dragover', (e) => {
  e.preventDefault();
});

dir1.addEventListener('drop', (e) => {
  e.preventDefault();
  const files = Array.from(e.dataTransfer.files);
  files.forEach((file) => {
    addFileToDirectory(fileList1, file);
  });
});

dir2.addEventListener('dragover', (e) => {
  e.preventDefault();
});

dir2.addEventListener('drop', (e) => {
  e.preventDefault();
  const files = Array.from(e.dataTransfer.files);
  files.forEach((file) => {
    addFileToDirectory(fileList2, file);
  });
});

function addFileToDirectory(fileList, file) {
  const li = document.createElement('li');
  li.classList.add('file');
  li.innerText = file.name;
  fileList.appendChild(li);
}
