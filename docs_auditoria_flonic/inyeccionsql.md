# Inyección SQL

La inyección SQL es una vulnerabilidad de seguridad que permite a un atacante modificar consultas enviadas a una base de datos.

## Ejemplo

Entrada del usuario:

```sql
' OR '1'='1
```

Consulta vulnerable:

```sql
SELECT * FROM usuarios
WHERE usuario = '$usuario'
AND password = '$password';
```

## Prevención

* Utilizar consultas preparadas.
* Validar las entradas del usuario.
* Aplicar el principio de mínimo privilegio.
