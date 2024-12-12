let tododiv=document.getElementById('todo2')//todoların koyulacağı div
let sayac;
let editİD=0;
let newinfo;

//sayfa her yeni açıldığında todolar gelsin
window.onload = function () {
    getTodo(); 
};
function getTodo(){ 
    tododiv.innerHTML=``//her verileri çekerken önce todoalrın olduğu yeri boşalt
    sayac=0;//id ler için sayac 0 dan başlat
    fetch('http://localhost:3000/todos',{
        'Access-Control-Allow-Origin':"*"
}).then(response => response.json())
     .then(todos => { 
         todos.forEach(todo => {
         if(sayac<todo.id){
             sayac=todo.id
            }
            tododiv.innerHTML+=`<div class="getTodos" id =${todo.id}>
                 <div class="labelİnput">
                 <input type="checkbox" class="getİnput"  id="td">
                 <label  id="label${todo.id}" for="td">${todo.info}</label>
                 </div>
                 <div class="delete-edit">
                 <i onclick="duzenle2('${todo.info}','${todo.id}')" style="color: deeppink;" class="fa-solid fa-pen"></i>
                 <i onclick="sil(${todo.id})" style="color: deeppink;" class="fa-solid fa-trash"></i>
                 </div>
             </div>
         `;
         });
         sayac++;//yeni eklenece olan todoların id si önceki ile aynısı olmaması için koyuldu
     })
 }
        
function sil(numara){//numara =id
    fetch('http://localhost:3000/todos/'+numara,{
        method :"DELETE"
}).then(response => {
        if(!response.ok){
            return  console.log("hata var")
    }
    const html=document.getElementById(numara)
    html.style.display="none"
}).catch(err =>{
    return console.log(err);
})
}
function ekle(){//save tuşuna basınca olacaklar
    if(sayac===undefined){
        sayac=0;
     }
 let newinfo=document.getElementById('addinput').value
 
 fetch('http://localhost:3000/todos',{
     method:"POST",
     headers: {
         "Content-Type": "application/json",
     },
     body: JSON.stringify({
          "info": newinfo,
          "id":sayac
          }),
 }).then(response =>{
    
     if(!response.ok){///true ya da false donüyor ona göre işleme devam ediyoruz
         return console.log("olmadı")
     }
     return response.json();
     
      
 }).then(data =>{
     getTodo();//verileri veri tabanında düzeltip verileri yeniden çekmek için 
     sayac++;//yeni eklenecek olan todonun id si aynı olmasın diye sayac arttırıldı
 }).catch(err =>{
     return console.log("burda hata var");
 })
} 
function duzenle(){
    input=document.getElementById('edit')
    newinfo=input.value
    fetch('http://localhost:3000/todos/'+editİD,{
        method:"PUT",
        headers: {
            "Content-Type": "application/json", // JSON formatında veri göndermek için bunu yazılıyor
        },
        body:JSON.stringify({
            "newinfo":newinfo
     })
 }).then(response => {
        getTodo();//veri düzenlendikten sonra  todoları veri tabanından çağırıyoruz
 })
}

function duzenle2(bilgi,number){//düzenleme işaretine basınca önce düzenlenecek olan todonun id si ve verisini alıyoruz
    editİD=number
    let input=document.getElementById('edit')
    input.value=bilgi
}

        

