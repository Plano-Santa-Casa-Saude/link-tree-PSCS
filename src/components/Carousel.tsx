import React, { useState, useEffect, useCallback } from 'react';
import type { CarouselNews } from '../types';
import '../styles/Carousel.css';

const carouselNews: CarouselNews[] = [
  {
    id: 1,
    title: "Novo Projeto Revolucionário Lançado!",
    excerpt: "Acabamos de lançar nosso novo projeto que promete revolucionar a forma como trabalhamos com tecnologia. Uma solução inovadora que vai mudar o mercado.",
    date: "2024-01-15",
    tags: ["Tecnologia", "Inovação"],
    image: "/images/img_carrossel_01.PNG"
  },
  {
    id: 2,
    title: "Dicas Essenciais de Produtividade",
    excerpt: "Compartilhando algumas técnicas que uso diariamente para aumentar minha produtividade e foco. Métodos comprovados que realmente funcionam.",
    date: "2024-01-10",
    tags: ["Produtividade", "Dicas"],
    image: "/images/img_carrossel_02.PNG"
  },
  {
    id: 3,
    title: "Atualização Importante dos Serviços",
    excerpt: "Importante atualização sobre nossos serviços e novas funcionalidades disponíveis. Melhorias significativas na experiência do usuário.",
    date: "2024-01-05",
    tags: ["Atualização", "Serviços"],
    image: "/images/img_carrossel_03.PNG"
  }
];

const Carousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % carouselNews.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? carouselNews.length - 1 : prev - 1));
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  return (
    <section className="news-carousel-section">
      <h2 className="section-title">Últimas Notícias</h2>
      <div 
        className="carousel-container"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button className="carousel-btn prev-btn" onClick={prevSlide}>
          <i className="fas fa-chevron-left"></i>
        </button>
        
        <div className="carousel-wrapper">
          <div 
            className="carousel-track"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {carouselNews.map((news) => (
              <div key={news.id} className="carousel-slide">
                <img src={news.image} alt={news.title} loading="lazy" />
                <div className="carousel-slide-content">
                  <h3 className="carousel-slide-title">{news.title}</h3>
                  <p className="carousel-slide-excerpt">{news.excerpt}</p>
                  <div className="carousel-slide-meta">
                    <span className="carousel-slide-date">{formatDate(news.date)}</span>
                    <div className="carousel-slide-tags">
                      {news.tags.map((tag, index) => (
                        <span key={index} className="carousel-slide-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <button className="carousel-btn next-btn" onClick={nextSlide}>
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
      
      <div className="carousel-dots">
        {carouselNews.map((_, index) => (
          <div
            key={index}
            className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default Carousel;
