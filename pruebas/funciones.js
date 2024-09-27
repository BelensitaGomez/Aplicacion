function saludar(nombre) {
    console.log("Hola..."+nombre);
}

//saludar(" Belen");

var saludo = (nombre)=>{
    console.log("Hola"+nombre);
}

saludo(" Manuel");

var saludo2 = (nombre1, nombre2)=>{
    console.log("Hola "+nombre1+" y "+nombre2);
}

saludo2("Mnauel", "Belen");

var saludo3 = (nombre1, nombre2)=>{
    return "Hola "+nombre1+" y "+nombre2;
   
}

console.log(saludo3("Belenchis", "Michis"));

var saludo4 = nombre=>"Hola "+nombre;

console.log(saludo4("Angelito"));

var saludo5 = function(){
    console.log("Hola con función anónima");
} 

saludo5();

var saludo6 = ()=>{
    console.log("Estas en saludo 6");
}

var saludo7 = (nombre="anónimo", s)=>{
    console.log("Hola "+nombre);
    s();
}

saludo7("Vivaldi", saludo6);




