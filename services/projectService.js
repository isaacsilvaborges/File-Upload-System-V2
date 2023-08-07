// Função para obter todos os projetos
async function obterTodosProjetos() {
  try {
    const response = await fetch('/api/v1/projects');
    return await response.json();
  } catch (error) {
    console.error('Erro ao obter todos os projetos:', error.message);
    throw error;
  }
}

// Função para criar um projeto
async function criarProjeto(data) {
  try {
    const response = await fetch('/api/v1/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    // Verifica o status da resposta HTTP
    if (response.ok) {
      // Se a resposta tiver status 201 (OK), retorna 'true'
      return true;
    } else {
      // Caso contrário, lança um erro com a mensagem do status da resposta
      throw new Error('Erro na requisição. Status: ' + response.status);
    }

  } catch (error) {
    console.error('Erro ao criar o projeto:', error.message);
    throw error;
  }
}



// Função para obter um projeto pelo ID
async function obterProjetoPorId(id) {
  try {
    const response = await fetch(`api/v1/projects/${id}`);
    return await response.json();
  } catch (error) {
    console.error(`Erro ao obter o projeto com o ID ${id}:`, error.message);
    throw error;
  }
}

// Função para deletar um projeto pelo ID
 async function deletarProjetoPorId(id) {
  try {
    const response = await fetch(`/api/v1/projects/${id}`, {
      method: 'DELETE',
    });
    // Verifica o status da resposta HTTP
    if (response.ok) {
      // Se a resposta tiver status 201 (OK), retorna 'true'
      return true;
    } else {
      // Caso contrário, lança um erro com a mensagem do status da resposta
      throw new Error('Erro na requisição. Status: ' + response.status);
    }

  } catch (error) {
    console.error('Erro ao deletar projeto:', error.message);
    throw error;
  }
}

// Função para atualizar um projeto
async function atualizarProjeto(data) {
  try {
    const response = await fetch(`/api/v1/projects`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    // Verifica o status da resposta HTTP
    if (response.ok) {
      // Se a resposta tiver status 201 (OK), retorna 'true'
      return true;
    } else {
      // Caso contrário, lança um erro com a mensagem do status da resposta
      throw new Error('Erro na requisição. Status: ' + response.status);
    }

  } catch (error) {
    console.error('Erro ao atualizar projeto:', error.message);
    throw error;
  }
}

module.exports = {
  obterTodosProjetos,
  criarProjeto ,
  deletarProjetoPorId ,
  atualizarProjeto ,
  obterProjetoPorId
};
