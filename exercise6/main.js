// Khai báo các biến
const btnAddNew = document.getElementsByClassName('add-new')[0];
const bgBlur = document.getElementsByClassName('background-grey')[0];
const modelAddNew = document.getElementsByClassName('modelAddNew')[0];
const modelFixNote = document.getElementsByClassName('modelFixNote')[0];
const btnSubmit = document.getElementsByClassName('submit')[0];
const valueInputTitle = document.getElementById('text-title');
const valueInputContent = document.getElementById('input-content');
const editTitle = document.getElementById('edit-title'); 
const editContent = document.getElementById('edit-content'); 
const cover = document.getElementsByClassName('cover')[0];
const btnSubmitEdit = document.getElementsByClassName('submit-edit')[0];
const iconClosed = document.getElementsByClassName('icon')[0];
const iconClosed2 = document.getElementsByClassName('icon')[1];

let notes = JSON.parse(localStorage.getItem('notes')) || [];
let currentEditIndex = null;

document.addEventListener('DOMContentLoaded', loadNotes);

btnAddNew.addEventListener('click', function () {
    bgBlur.classList.add('visible');
    modelAddNew.classList.add('visible');
});

iconClosed.addEventListener('click',function(){
    bgBlur.classList.remove('visible');
    modelAddNew.classList.remove('visible');
})

iconClosed2.addEventListener('click',function(){
    bgBlur.classList.remove('visible');
    modelFixNote.classList.remove('visible');
})

btnSubmit.addEventListener('click', function () {
    if (valueInputTitle.value.trim().length === 0 || valueInputContent.value.trim().length === 0) {
        alert("Vui lòng điền đủ thông tin.");
    } else {
        const newNote = {
            title: valueInputTitle.value,
            content: valueInputContent.value
        };

        notes.push(newNote);
        localStorage.setItem('notes', JSON.stringify(notes));
        addNewNoteToDOM(newNote, notes.length - 1);

        valueInputTitle.value = '';
        valueInputContent.value = '';

        bgBlur.classList.remove('visible');
        modelAddNew.classList.remove('visible');
    }
});

function addNewNoteToDOM(note, index) {
    const newNote = document.createElement('div');
    newNote.classList.add('layer');

    newNote.innerHTML = `
        <div class="content-text">
            <h3 class="title">${note.title}</h3>
            <p class="text-content">${note.content}</p>
        </div>
        <div class="group-button">
            <button class="edit">Edit</button>
            <button class="delete">Delete</button>
        </div>
    `;

    cover.appendChild(newNote);

    const deleteBtn = newNote.querySelector('.delete');
    deleteBtn.addEventListener('click', function () {
        cover.removeChild(newNote);
        deleteNoteFromStorage(note);
    });

    const editBtn = newNote.querySelector('.edit');
    editBtn.addEventListener('click', function () {
        currentEditIndex = index; 
        editTitle.value = note.title; 
        editContent.value = note.content; 
        bgBlur.classList.add('visible'); 
        modelFixNote.classList.add('visible'); 
    });
}

function loadNotes() {
    notes.forEach((note, index) => {
        addNewNoteToDOM(note, index);
    });
}

function deleteNoteFromStorage(noteToDelete) {
    notes = notes.filter(note => note.title !== noteToDelete.title || note.content !== noteToDelete.content);
    localStorage.setItem('notes', JSON.stringify(notes));
}

btnSubmitEdit.addEventListener('click', function () {
    if (editTitle.value.trim().length === 0 || editContent.value.trim().length === 0) {
        alert("Vui lòng điền đủ thông tin.");
    } else {
        // Cập nhật nội dung ghi chú trong mảng notes
        notes[currentEditIndex] = {
            title: editTitle.value,
            content: editContent.value
        };

        localStorage.setItem('notes', JSON.stringify(notes));

        cover.innerHTML = ''; // Xóa tất cả các ghi chú hiện có trong DOM
        loadNotes(); // Tải lại tất cả ghi chú từ localStorage vào DOM

        bgBlur.classList.remove('visible'); // Ẩn background mờ
        modelFixNote.classList.remove('visible'); // Ẩn modal sửa
    }
});