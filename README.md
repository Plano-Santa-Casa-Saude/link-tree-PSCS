# Link Tree & Blog Project

Um projeto moderno de link tree com blog integrado, desenvolvido com HTML, CSS e JavaScript.

## 🎨 Características

- **Design Responsivo**: Adapta-se a diferentes tamanhos de tela
- **Menu Lateral**: Links organizados em sidebar à esquerda
- **Carrossel de Notícias**: Apresentação dinâmica das principais notícias

- **Tema Escuro**: Esquema de cores azul marinho, laranja e branco
- **Animações Suaves**: Transições e efeitos visuais elegantes

## 📁 Estrutura do Projeto

```
link-tree-project/
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js           # Funcionalidades JavaScript
├── images/             # Pasta de imagens
│   ├── README.md       # Instruções para imagens
│   ├── config.js       # Configuração de imagens
│   ├── placeholder.txt # Lista de imagens necessárias
│   ├── profile.jpg     # Sua foto de perfil
│   ├── carousel-1.jpg  # Imagem do carrossel 1
│   ├── carousel-2.jpg  # Imagem do carrossel 2
│   ├── carousel-3.jpg  # Imagem do carrossel 3
│   ├── carousel-4.jpg  # Imagem do carrossel 4
│   ├── carousel-5.jpg  # Imagem do carrossel 5

└── README.md           # Este arquivo
```

## 🖼️ Configuração de Imagens

### Como Adicionar Suas Imagens:

1. **Coloque suas imagens na pasta `images/`**
2. **Use os nomes sugeridos**:
   - `profile.jpg` - Sua foto de perfil (200x200px)
   - `carousel-1.jpg` até `carousel-5.jpg` - Imagens do carrossel (800x400px)

3. **Formatos suportados**: JPG, PNG, WebP, SVG

### Tamanhos Recomendados:
- **Perfil**: 200x200px
- **Carrossel**: 800x400px
- **Blog**: 600x300px

## 🚀 Como Usar

1. **Clone ou baixe o projeto**
2. **Adicione suas imagens** na pasta `images/`
3. **Personalize o conteúdo** no arquivo `script.js`
4. **Abra o `index.html`** no seu navegador

## 🎯 Personalização

### Cores
As cores podem ser alteradas no arquivo `styles.css` nas variáveis CSS:
```css
:root {
    --bg-primary: #0a1929;      /* Azul marinho escuro */
    --bg-secondary: #132f4c;    /* Azul marinho claro */
    --text-primary: #ffffff;    /* Branco */
    --text-secondary: #f8bd1c;  /* Laranja */
    --accent-color: #ff8c42;    /* Laranja mais escuro */
}
```

### Conteúdo
Edite os arrays no `script.js`:
- `carouselNews` - Notícias do carrossel

### Links
Modifique os links no `index.html` na seção da sidebar.

## 📱 Responsividade

- **Desktop**: Menu lateral fixo à esquerda
- **Tablet**: Menu lateral menor
- **Mobile**: Menu lateral vira header no topo

## 🔧 Funcionalidades

- ✅ Carrossel automático com navegação manual
- ✅ Menu lateral responsivo
- ✅ Tema escuro/claro
- ✅ Animações suaves
- ✅ Imagens otimizadas
- ✅ Efeitos hover
- ✅ Scroll suave

## 📄 Licença

Este projeto é de uso livre. Sinta-se à vontade para modificar e usar como quiser!
