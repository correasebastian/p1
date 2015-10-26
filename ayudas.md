


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

