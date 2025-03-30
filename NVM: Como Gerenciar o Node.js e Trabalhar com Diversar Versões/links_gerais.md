# NVM - Node Version Manager

O NVM (Node Version Manager) é uma ferramenta que permite instalar e gerenciar múltiplas versões do Node.js em um único ambiente.

## Links Úteis

- [Repositório Oficial do NVM](https://github.com/nvm-sh/nvm)
- [NVM para Windows](https://github.com/coreybutler/nvm-windows)
- [Documentação do Node.js](https://nodejs.org/en/docs/)

## Instalação

### Para macOS e Linux:

```bash
# Usando curl
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# OU usando wget
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

### Para Windows:

Baixe e instale o NVM for Windows: [Página de releases](https://github.com/coreybutler/nvm-windows/releases)

### Verificar instalação:

```bash
nvm --version
```

## Comandos Básicos

### Listar versões disponíveis:

```bash
# Todas as versões disponíveis para instalação
nvm list available

# Versões instaladas localmente
nvm list
```

### Instalar versões do Node.js:

```bash
# Instalar a versão mais recente
nvm install node

# Instalar a versão LTS mais recente
nvm install --lts

# Instalar uma versão específica
nvm install 20.10.0
```

### Usar versões diferentes:

```bash
# Mudar para uma versão específica
nvm use 20.10.0

# Usar a versão mais recente
nvm use node

# Usar a versão LTS
nvm use --lts
```

### Definir versão padrão:

```bash
# Definir versão específica como padrão
nvm alias default 20.10.0

# Definir versão mais recente como padrão
nvm alias default node
```

### Verificar versão atual:

```bash
nvm current
```

## Comandos Avançados

### Executar comando com uma versão específica:

```bash
nvm exec 16.20.0 node --version
```

### Desinstalar uma versão:

```bash
nvm uninstall 16.20.0
```

### Atualizar para versão mais recente preservando pacotes:

```bash
nvm install node --reinstall-packages-from=current
```

### Criar e usar arquivo .nvmrc:

```bash
# Criar arquivo .nvmrc no projeto
echo "16.20.0" > .nvmrc

# Usar versão especificada no .nvmrc
nvm use
```

## Solução de Problemas Comuns

### Comando 'nvm' não encontrado:

Adicione ao arquivo `~/.bashrc`, `~/.zshrc` ou `~/.profile`:

```bash
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```

Em seguida, recarregue o terminal:

```bash
source ~/.bashrc  # ou o arquivo correspondente
```

### Migrar pacotes entre versões:

```bash
nvm reinstall-packages [versão-de-origem]
```

## Casos de Uso Práticos

1. **Trabalhar com diferentes projetos:**
   - Use arquivos `.nvmrc` em cada projeto para especificar a versão do Node.js
   - Ao mudar de projeto, basta executar `nvm use` para ativar a versão correta

2. **Testar compatibilidade:**
   - Teste seu código em múltiplas versões do Node.js sem reinstalar

3. **Atualizar para novas versões sem perder pacotes:**
   - Use `nvm install node --reinstall-packages-from=current` para atualizar mantendo seus pacotes globais
