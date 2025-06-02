/// <reference types="cypress" />

describe('Testando Funcionalidades - agenda de contatos', () => {
  beforeEach(() => {
    cy.visit('https://agenda-contatos-react.vercel.app/')
    // Limpa todos os contatos existentes antes de cada teste
    cy.get('body').then(($body) => {
      while ($body.find('.contato').length > 0) {
        cy.get('.contato').first().find('button.delete').click()
      }
    })
  })

  it('Adiciona → Edita → Remove contato', () => {
    // 1. ADICIONAR CONTATO JOAO ALUNO EBAC :)
    const contatoOriginal = {
      nome: 'João Silva',
      email: 'joao@ebac.com.br',
      telefone: '11999999999'
    }

    // Preenche o formulário 
    cy.get('input[placeholder="Nome"]').type(contatoOriginal.nome)
    cy.get('input[placeholder="E-mail"]').type(contatoOriginal.email)
    cy.get('input[placeholder="Telefone"]').type(contatoOriginal.telefone)
    
    // Submete o formulário
    cy.get('button.adicionar').click()

    // Aguarda a API e verifica o contato
    cy.contains('.contato li:nth-child(1)', contatoOriginal.nome, { timeout: 10000 }).should('exist')
    cy.contains('.contato li:nth-child(2)', contatoOriginal.telefone).should('exist')

    // 2. EDITAR CONTATO JOAO PARA JOAO OLIVEIRA ALUNO EBAC :)
    const contatoEditado = {
      nome: 'João Oliveira',
      email: 'joao.oliveirateste@ebac.com.br',
      telefone: '11988888888'
    }

    // Clica no botão de edição do ÚLTIMO contato adicionado
    cy.get('.contato').last().within(() => {
      cy.get('button.edit').click()
    })

    // Edita os campos
    cy.get('input[placeholder="Nome"]').clear().type(contatoEditado.nome)
    cy.get('input[placeholder="E-mail"]').clear().type(contatoEditado.email)
    cy.get('input[placeholder="Telefone"]').clear().type(contatoEditado.telefone)

    // Salva a edição
    cy.get('button.alterar').click()

    // Verifica a edição
    cy.contains('.contato li:nth-child(1)', contatoEditado.nome, { timeout: 10000 }).should('exist')
    cy.contains('.contato li:nth-child(1)', contatoOriginal.nome).should('not.exist')

    // 3. REMOVER CONTATO JOAO OLIVEIRA
    cy.get('.contato').last().within(() => {
      cy.get('button.delete').click()
    })

    // Verifica a remoção
    cy.contains('.contato li:nth-child(1)', contatoEditado.nome).should('not.exist')
  })
})