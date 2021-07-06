USE SP_Medical_Group;

SELECT * FROM TiposUsuarios;

SELECT * FROM Usuarios;

SELECT * FROM Pacientes;

SELECT * FROM Especialidades;

SELECT * FROM Clinicas;

SELECT * FROM Medicos;

SELECT * FROM StatusConsultas;

SELECT * FROM Consultas;

SELECT Pacientes.NomePaciente AS Paciente,Pacientes.RG,Pacientes.CPF,CONVERT(VARCHAR(10),DataNascimento,3) AS DataNascimento,Pacientes.Endereco,Pacientes.Telefone FROM Pacientes	

SELECT COUNT(IdUsuario)AS QuantidadeDeUsuarios FROM Usuarios ;

SELECT NomePaciente AS Paciente, DataNascimento FROM Pacientes;

SELECT NomePaciente AS Paciente, CONVERT(VARCHAR(10),DataNascimento,3) AS DataNascimento FROM Pacientes;

SELECT * FROM Medicos;

SELECT Medicos.NomeMedico AS [Médico],Especialidades.DescricaoEspecialidade AS Especialidade,Medicos.CRM,Clinicas.NomeFantasia AS LocalAtendimento FROM Medicos
INNER JOIN Especialidades
ON Medicos.IdEspecialidade = Especialidades.IdEspecialidade
INNER JOIN Clinicas
ON Medicos.IdClinica = Clinicas.IdClinica;

SELECT COUNT(IdMedico) AS Quantidade_Medicos FROM Medicos
INNER JOIN Especialidades
ON Medicos.IdEspecialidade = Especialidades.IdEspecialidade AND DescricaoEspecialidade = 'Urologia';

SELECT Pacientes.NomePaciente,Medicos.NomeMedico,Consultas.DataConsulta,Consultas.HorarioConsulta,StatusConsultas.DescricaoStatusConsulta AS [Status],Consultas.DescricaoAtendimento
FROM Consultas
INNER JOIN Pacientes
ON Pacientes.IdPaciente = Consultas.IdPaciente
INNER JOIN StatusConsultas
ON Consultas.IdStatusConsulta = StatusConsultas.IdStatusConsulta
INNER JOIN Medicos
ON Medicos.IdMedico = Consultas.IdMedico
WHERE Pacientes.NomePaciente ='Maria';