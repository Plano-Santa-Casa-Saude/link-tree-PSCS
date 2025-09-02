// Configuração de Imagens
// Este arquivo permite gerenciar facilmente os caminhos das imagens

const IMAGE_CONFIG = {
    // Imagens do Carrossel
    carousel: {
        slide1: "images/img_carrossel_01.PNG",
        slide2: "images/img_carrossel_02.PNG", 
        slide3: "images/img_carrossel_03.PNG"
    },
    
    // Imagem de Perfil
    profile: "images/2.png",
    

};

// Função para obter imagem do carrossel
function getCarouselImage(index) {
    const images = Object.values(IMAGE_CONFIG.carousel);
    return images[index] || images[0];
}



// Função para obter imagem de perfil
function getProfileImage() {
    return IMAGE_CONFIG.profile;
}

// Exportar para uso em outros arquivos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { IMAGE_CONFIG, getCarouselImage, getProfileImage };
} 