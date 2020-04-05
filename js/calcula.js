window.onload = function () { //Acciones tras cargar la página
    pantalla = document.getElementById("textoPantalla"); //elemento pantalla de salida
}

x = "0"; //número en pantalla
xi = 1; //iniciar número en pantalla: 1=si; 0=no;
coma = 0; //estado coma decimal 0=no, 1=si;
ni = 0; //número oculto o en espera.
op = "no"; //operación en curso; "no" =  sin operación.
valordecimal = "";
basedecimal = "si";


//mostrar número en pantalla según se va escribiendo:
function numero(xx) { //recoge el número pulsado en el argumento.
    if (basedecimal == "no") {
        pantalla.innerHTML = valordecimal
        basedecimal = "si";
    }
    if (x == "0" || xi == 1) { // inicializar un número, 
        pantalla.innerHTML = xx; //mostrar en pantalla
        x = xx; //guardar número
        if (xx == ".") { //si escribimos una coma al principio del número
            pantalla.innerHTML = "0."; //escribimos 0.
            x = xx; //guardar número
            coma = 1; //cambiar estado de la coma
        }
    } else { //continuar escribiendo un número
        if (xx == "." && coma == 0) { //si escribimos una coma decimal pòr primera vez
            pantalla.innerHTML += xx;
            x += xx;
            coma = 1; //cambiar el estado de la coma  
        }
        //si intentamos escribir una segunda coma decimal no realiza ninguna acción.
        else if (xx == "." && coma == 1) {}
        //Resto de casos: escribir un número del 0 al 9: 	 
        else {
            pantalla.innerHTML += xx;
            x += xx
        }
    }
    xi = 0 //el número está iniciado y podemos ampliarlo.
}

function operar(s) {
    igualar() //si hay operaciones pendientes se realizan primero
    ni = x //ponemos el 1º número en "numero en espera" para poder escribir el segundo.
    op = s; //guardamos tipo de operación.
    xi = 1; //inicializar pantalla.
}

function igualar() {
    if (op == "no") { //no hay ninguna operación pendiente.
        pantalla.innerHTML = x; //mostramos el mismo número	
    } else { //con operación pendiente resolvemos
        if (op == '*(10**') {
            sl = ni + op + x + ")";
        } else {
            sl = ni + op + x; // escribimos la operación en una cadena
        }
        sol = eval(sl) //convertimos la cadena a código y resolvemos
        pantalla.innerHTML = sol //mostramos la solución
        x = sol; //guardamos la solución
        op = "no"; //ya no hay operaciones pendientes
        xi = 1; //se puede reiniciar la pantalla.
    }
}

function raizc() {
    x = Math.sqrt(x) //resolver raíz cuadrada.
    pantalla.innerHTML = x; //mostrar en pantalla resultado
    op = "no"; //quitar operaciones pendientes.
    xi = 1; //se puede reiniciar la pantalla 
}

function porcent() {
    x = x / 100 //dividir por 100 el número
    pantalla.innerHTML = x; //mostrar en pantalla
    igualar() //resolver y mostrar operaciones pendientes
    xi = 1 //reiniciar la pantalla
}

function opuest() {
    nx = Number(x); //convertir en número
    nx = -nx; //cambiar de signo
    x = String(nx); //volver a convertir a cadena
    pantalla.innerHTML = x; //mostrar en pantalla.
}

function inve() {
    nx = Number(x);

    nx = (nx==0)?"Math ERROR":(1 / nx);
    x = String(nx);
    pantalla.innerHTML = x;
    xi = 1; //reiniciar pantalla al pulsar otro número.
}

function retro() { //Borrar sólo el último número escrito.
    cifras = x.length; //hayar número de caracteres en pantalla
    br = x.substr(cifras - 1, cifras) //describir último caracter
    x = x.substr(0, cifras - 1) //quitar el ultimo caracter
    if (x == "") {
        x = "0";
    } //si ya no quedan caracteres, pondremos el 0
    if (br == ".") {
        coma = 0;
    } //Si el caracter quitado es la coma, se permite escribirla de nuevo.
    pantalla.innerHTML = x; //mostrar resultado en pantalla	 
}

function borradoParcial() {
    pantalla.innerHTML = 0; //Borrado de pantalla;
    x = 0; //Borrado indicador número pantalla.
    coma = 0; //reiniciamos también la coma				
}

function borradoTotal() {
    pantalla.innerHTML = 0; //poner pantalla a 0
    x = "0"; //reiniciar número en pantalla
    coma = 0; //reiniciar estado coma decimal 
    ni = 0 //indicador de número oculto a 0;
    op = "no" //borrar operación en curso.
}

function cuadrado() {
    igualar()
    var numero = parseFloat(pantalla.outerText);
    numero = Math.pow(numero, 2);
    pantalla.innerHTML = numero;
    x = numero;
    xi = 1;
}

function opavanzadas(funcion) {
    igualar()
    switch (funcion) {
        case "sin":
            x = Math.sin(x);
            break;
        case "cos":
            x = Math.cos(x);
            break;
        case "tan":
            x = Math.tan(x);
            break;
        case "log":
            x = Math.log10(x)
            break;
        case "ln":
            x = Math.log(x)
            break;
        case "fact":
            x = factorial();
            break;
        case "sin-1":
            x = Math.asin(x);
            break;
        case "cos-1":
            x = Math.acos(x);
            break;
        case "tan-1":
            x = Math.atan(x);
            break;
        default:
            break;
    }
    pantalla.innerHTML = x;
    xi = 1;
}

function factorial() {
    var total = 1;
    for (var i = 1; i <= x; i++) {
        total = total * i;
    }
    return total;
}

function calcularbase(base) {
    //Sirve para saber si es la primera vez que presionan una base
    if (basedecimal == "si") {
        valordecimal = pantalla.outerText; //Guarda el valor de pantalla
        basedecimal = "no"; //Sirve para que el valordecimal se pueda usar con otros sistemas
    }

    switch (base) {
        case 'b':
            binario();
            break;
        case 'o':
            octal();
            break;
        case 'h':
            hexadecimal();
            break;
        default:
            break;
    }
}

function binario() {
    var valoroctal = parseFloat(valordecimal).toString(2);
    pantalla.innerHTML = valoroctal;
}

function octal() {
    var valoroctal = parseFloat(valordecimal).toString(8);
    pantalla.innerHTML = valoroctal;
}

function hexadecimal() {
    var valoroctal = parseFloat(valordecimal).toString(16);
    valoroctal = valoroctal.toUpperCase();
    pantalla.innerHTML = valoroctal;
}