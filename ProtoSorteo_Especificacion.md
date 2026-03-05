Sorteo{
    Organizador:nombre del que inicio sesion
    Opciones:vector de nombres que son opciones(incluyendo organizador)
    NombreSorteo:nombre del sorteo
    Fecha:fecha del sorteo
    Presupuesto:presupuesto
    Sorteados: map con sorteos
    Exclusiones: map con exclusiones
}

formato para map sorteos

map(key,value)donde Key le da a Value
Key nombre(string)
Value nombre(string)

formato para map exclusiones

map(key,value) donde Key no le puede dar a Value

key nombre(string)

value vector de nombres


---------------------------------------------------
Estamos trabajando con objetos de json para guardar las cosas en el ls por lo que dejare de lado
la parte de los maps, esto complicaria todo. solo trabajaremos con arreglos.

Quite la parte de los sorteados en esta parte, eso se calculara una vez que el usuario pretenda iniciar el sorteo