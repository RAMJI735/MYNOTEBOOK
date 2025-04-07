let file =document.querySelector('#file');

console.log(file)

file.addEventListener('change',(e)=>{
    console.log(e.target.files[0])
})