## 📌 1. Configurações Iniciais

# Configura seu nome globalmente (aparecerá nos commits)

git config --global user.name "Nome"

# Configura seu email globalmente (aparecerá nos commits)

git config --global user.email "E-mail

Esses comandos configuram o nome e o e-mail que serão usados nos commits.

---

## 📁 2. Criar Projeto Local

```bash
# Cria o diretório do projeto
mkdir projeto-js

# Navega para dentro do diretório
cd projeto-js

# Inicializa um repositório Git vazio
git init
```

---

## 📄 3. Criar Arquivos e Pastas

```bash
# Cria diretórios para organizar o projeto
mkdir src
mkdir docs

# Cria arquivo README com descrição do projeto
echo "# Meu Projeto JavaScript" > README.md

# Cria arquivo JavaScript inicial
echo "console.log('Olá Mundo');" > src/app.js

# Cria arquivo HTML básico
echo "<!DOCTYPE html><html><head><title>JS</title></head><body><script src='src/app.js'></script></body></html>" > index.html
```

---

## 🔍 4. Verificar o Status

```bash
# Mostra arquivos modificados, não rastreados e staged
git status

---

## ✅ 5. Adicionar Arquivos ao Staging

```bash
# Adiciona todos os arquivos ao staging area
git add .

# Ver diferenças nos arquivos ainda não adicionados
git diff

---

## 💾 6. Criar um Commit

```bash
# Cria commit com mensagem descritiva
git commit -m "Estrutura inicial do projeto JavaScript"
```

---

## ➕ 7. Criar Mais Arquivos

```bash
# Adiciona arquivo de estilos CSS
echo "body { font-family: Arial; background-color: #f0f0f0; }" > style.css

# Adiciona arquivo de utilitários JavaScript
echo "// Funções utilitárias" > src/utils.js
echo "function formatarData(data) { return data.toLocaleDateString(); }" >> src/utils.js

# Atualiza index.html para incluir o CSS
echo "<!DOCTYPE html><html><head><title>JS</title><link rel='stylesheet' href='style.css'></head><body><script src='src/app.js'></script></body></html>" > index.html
```

---

## ✅ 8. Adicionar e Comitar Novamente

```bash
# Adiciona todas as modificações
git add .

# Cria segundo commit
git commit -m "Adiciona CSS e arquivo de utilitários"
```

---

## 🧾 9. Ver Histórico

```bash
# Mostra histórico resumido (uma linha por commit)
git log --oneline

# Mostra histórico completo
git log

```

---

## 🌿 10. Criar Nova Branch

```bash
# Troca no nome da branch principal
git branch -m master main # Renomeia o branch master para main. Mas precisa estar na master para isso
ou
git branch -M main # Força a renomeação do branch atual para main, mesmo que main já exista (ele sobrescreve).

# Cria e muda para nova branch (comando moderno)
git switch -c nova-funcionalidade
#ou
# Alternativa clássica (ainda amplamente usada)
git checkout -b nova-funcionalidade

# Lista todas as branches locais
git branch

# Mostra branch atual com asterisco
git branch -v
```

---

## 🧪 11. Trabalhar na Nova Branch

```bash
# Adiciona nova função ao arquivo utils.js
echo "function saudacao(nome) { return 'Bem-vindo, ' + nome + '!'; }" >> src/utils.js

# Cria arquivo específico da funcionalidade
echo "// Arquivo da nova funcionalidade" > src/saudacoes.js
echo "function exibirSaudacao() { alert(saudacao('Usuário')); }" >> src/saudacoes.js

# Adiciona arquivos modificados
git add src/utils.js src/saudacoes.js

# Comita as alterações da branch
git commit -m "Adiciona sistema de saudações"
```

---

## 🔀 12. Voltar para Main e Mesclar

```bash
# Volta para a branch principal
git switch main
# ou: git checkout main

# Visualiza diferenças entre branches antes do merge
git diff main nova-funcionalidade

# Mescla a branch nova-funcionalidade na main
git merge nova-funcionalidade
```

### 🚨 Em caso de conflito:

```bash
# Mostra arquivos em conflito
git status

# Após resolver conflitos manualmente nos arquivos:
git add .

# Finaliza o merge
git commit -m "Resolve conflitos entre main e nova-funcionalidade"

# Ou aborta o merge se necessário
git merge --abort
```

---

## 🧹 13. Remover Branch

```bash
# Remove branch local (só funciona se já foi mergeada)
git branch -d nova-funcionalidade

# Força remoção da branch (mesmo que não mergeada)
git branch -D nome-da-branch

# Lista todas as branches (locais e remotas)
git branch -a
```

## ⏪ 14. Resetar e Desfazer Alterações

```bash
# Mostra histórico para encontrar hash do commit
git log --oneline

# Reseta para commit específico (CUIDADO: perde alterações!)
git reset --hard <HASH_DO_COMMIT>

# Reseta apenas o staging, mantém alterações nos arquivos
git reset --soft <HASH_DO_COMMIT>

# Desfaz último commit mantendo alterações
git reset --soft HEAD~1

# Desfaz alterações em arquivo específico (volta ao último commit)
git restore <arquivo>


---

## 📤 15. Conectar com GitHub

```bash
# Adiciona repositório remoto (crie primeiro no GitHub)
git remote add origin https://github.com/SEU_USUARIO/seu-repo.git

# Verifica repositórios remotos configurados
git remote -v

# Envia código para GitHub pela primeira vez
git push -u origin main
# O -u define origin/main como padrão para futuros pushes
```
