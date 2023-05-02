import './navbar.css'
import $ from "jquery";

export default function Sidebar(){
    
    const fileExplorer = $('#file-explorer');
  $.getJSON('localhost:3000/api/files').done((data) => {
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
  
  };

  