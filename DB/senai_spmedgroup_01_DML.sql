USE SP_Medical_Group;


INSERT INTO TiposUsuarios(TituloTipoUsuario)
VALUES ('Administrador')
	  ,('Paciente')
	  ,('Médico');

INSERT INTO Usuarios(IdTipoUsuario,Email,Senha)
VALUES (2,'maria@gmail.com.br','1234')
      ,(2,'joão@gmail.com.br','1234')
	  ,(3,'rodrigo@gmail.com.br','1234')
      ,(3,'roberta@gmail.com.br','1234')
	  ,(3,'paulo@gmail.com.br','1234')
	  ,(1,'matheus@gmail.com.br','1234');

INSERT INTO Pacientes(IdUsuario,NomePaciente,RG,CPF,DataNascimento,Telefone,Endereco)
VALUES (4,'Maria','414008807','56127006872','01/01/2000','11922222222','Av. São Miguel, 204')
      ,(4,'João','326543457','73556944057','23/04/2000','11933333333','Av. Paulista, 110');

INSERT INTO Especialidades(DescricaoEspecialidade)
VALUES ('Acupuntura')
	  ,('Dermatologia')
	  ,('Radioterapia')
	  ,('Urologia')
	  ,('Pediatria')
	  ,('Psiquiatria');

INSERT INTO Clinicas(RazaoSocial,NomeFantasia,Endereco,HorarioAbertura,HorarioFechamento,[Site],CNPJ)
VALUES ('Clinica de Dermatologia','Clinica Pele','Av. Paulista, 111','06:00','20:00','pele.com.br','111111111111');

INSERT INTO Medicos(IdUsuario,IdClinica,IdEspecialidade,NomeMedico,CRM)
VALUES (1,1,2,'Paulo Rocha','11111-SP')
      ,(2,1,1,'Roberta Silva','22222-SP')
	  ,(3,1,4,'Rodrigo Santos','33333-SP');

INSERT INTO StatusConsultas(DescricaoStatusConsulta)
VALUES ('Agendada')
      ,('Concluida')
	  ,('Cancelada');

INSERT INTO Consultas(IdPaciente,IdMedico,IdStatusConsulta,DataConsulta,HorarioConsulta,DescricaoAtendimento)
VALUES (2,3,2,'01/01/2021','14:00','')
      ,(2,2,1,'09/09/2019','8:00','');