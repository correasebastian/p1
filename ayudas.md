
------PLACAS

---como voy a generas el pk con unixtimestamp todo lo voy a guardar en placas con sync=true;

  var query = 'select i.idinspeccion, placa, i.sync, bt.Nombre as servicio, ro.idsub as revEst, 
              case when iss.idinspeccion is null then 0 else 1 end as calificado , iss.idsubproceso as idsubproceso ';
                from idinspeccion i ';
              left join  Base_Tipos bt on bt.IdTipo= i.appidsrv ';
              left join  Ro_Servicios ro on ro.idSrv= i.appidsrv ';
              left join (select idinspeccion, idsubproceso from  idsubprocesoseguimiento ';
                        where idestado=477) ';
               iss on iss.idinspeccion=i.idinspeccion';
            WHERE UserName=? and fecha> ?';
       Order by i.idinspeccion DESC Limit 10';


----servicios

insert into @MyHierarchy SELECT * from dbo.ParseXML(
---your SQL Goes here --->
  (
SELECT [IdTipo] as value ,[Nombre] as label, rs.idsub as revEst 
FROM Base_Tipos bt 
 inner join ro_servicios rs on rs.idSrv=bt.IdTipo   
 where rs.enabled=1   order by label
    --WHERE UserName=? and fecha> ?
 
---You add this magic spell, making it XML, and giving a name for the 'list' of rows and the root     
  for XML path ('carroceria'), root('info')
-- end of SQL
  )
)


----------------------

DECLARE @MyHierarchy Hierarchy -- to pass the hierarchy table around
insert into @MyHierarchy SELECT * from dbo.ParseXML(
---your SQL Goes here --->
  (SELECT     TOP (200) idfoto, idinspeccion, path, sync, uuid, deleted, fecha, idtipo, latitude, longitude, altitude, accuracy, placa, idajustev, onUpload, rutaSrv
FROM         idfotos
WHERE     (sync = 1) AND (idinspeccion = 7471)
---You add this magic spell, making it XML, and giving a name for the 'list' of rows and the root     
  for XML path ('foto'), root('fotos')
-- end of SQL
  )
)
SELECT dbo.ToJSON(@MyHierarchy)
----------------------------------------------

PARA NAMES


DECLARE @MyHierarchy Hierarchy -- to pass the hierarchy table around
insert into @MyHierarchy SELECT * from dbo.ParseXML(
---your SQL Goes here --->
  (


  select fc.idTipoFoto, NombreFoto,fc.orden, fc.cantidad 
       from tiposFoto tf 
       inner join fotoscia fc on tf.idTipoFoto=fc.idTipoFoto 
       and tf.enabled=1 and fc.enabled=1 
      order by fc.orden 
---You add this magic spell, making it XML, and giving a name for the 'list' of rows and the root     
  for XML path ('TIPOFOTO'), root('tipofotos')
-- end of SQL
  )
)
SELECT dbo.ToJSON(@MyHierarchy)


-----------------custon loading bar 
http://codepen.io/ionic/pen/pEter
https://css-tricks.com/html5-progress-element/
http://victorbjelkholm.github.io/ngProgress/



-------CALIFICACION

---para tipos

DECLARE @MyHierarchy Hierarchy -- to pass the hierarchy table around
insert into @MyHierarchy SELECT * from dbo.ParseXML(
---your SQL Goes here --->
  (
select idtipovehiculo as value , nombre as label from tipos where enabled=1
---You add this magic spell, making it XML, and giving a name for the 'list' of rows and the root     
  for XML path ('tipo'), root('tipos')
-- end of SQL
  )
)
SELECT dbo.ToJSON(@MyHierarchy)

--para clases


DECLARE @MyHierarchy Hierarchy -- to pass the hierarchy table around
insert into @MyHierarchy SELECT * from dbo.ParseXML(
---your SQL Goes here --->
  (
SELECT  distinct cc.idclase as value  , bt.Nombre as label  FROM clases_tipoVehiculo ct  inner join   clases_carrocerias cc on cc.idclase=ct.idclase   inner join Base_Tipos bt on bt.IdTipo=cc.idclase  where ct.idtipovehiculo=829
---You add this magic spell, making it XML, and giving a name for the 'list' of rows and the root     
  for XML path ('clase'), root('clases')
-- end of SQL
  )
)
SELECT dbo.ToJSON(@MyHierarchy)


----carrocerias


DECLARE @MyHierarchy Hierarchy -- to pass the hierarchy table around
insert into @MyHierarchy SELECT * from dbo.ParseXML(
---your SQL Goes here --->
  (
SELECT  distinct cc.idcarroceria as value , bt.Nombre as label  FROM    clases_carrocerias cc  inner join Base_Tipos bt on bt.IdTipo=cc.idcarroceria   where cc.idclase=378
---You add this magic spell, making it XML, and giving a name for the 'list' of rows and the root     
  for XML path ('carroceria'), root('carrocerias')
-- end of SQL
  )
)
SELECT dbo.ToJSON(@MyHierarchy)



--  INFO va entrar a consideracion, por que si yo ya tengo toda la informacion en placas, para que lo hago, a menos que sea una consulta muy rapida

la idea tambien puede dejar a placas muy rapido y consultar si esta calificaco ya en calificaicon para quitarle carga a als consultas sqlite

select top (1) i.idinspeccion, placa, i.sync, bt.Nombre as servicio, ro.idsub as revEst, 
      case when iss.idinspeccion is null then 0 else 1 end as calificado ,
       iss.idsubproceso as idsubproceso 
        from idinspeccion i 
      left join  Base_Tipos bt on bt.IdTipo= i.appidsrv 
      left join  Ro_Servicios ro on ro.idSrv= i.appidsrv 
      left join (select idinspeccion, idsubproceso from  idsubprocesoseguimiento 
                where idestado=477) 
       iss on iss.idinspeccion=i.idinspeccion
    --WHERE UserName=? and fecha> ?
Order by i.idinspeccion DESC 


----obteniendo clase carroceria


DECLARE @MyHierarchy Hierarchy -- to pass the hierarchy table around
insert into @MyHierarchy SELECT * from dbo.ParseXML(
---your SQL Goes here --->
  (
SELECT [idclasecarroceria] ,[idclase] ,[idcarroceria]  ,[idcodigocalificacion]  ,[idextrainfo]   
FROM [clases_carrocerias] WHERE idclase=378 and idcarroceria=105 
 
---You add this magic spell, making it XML, and giving a name for the 'list' of rows and the root     
  for XML path ('clasecarroceria'), root('items')
-- end of SQL
  )
)
SELECT dbo.ToJSON(@MyHierarchy)