import React from 'react';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: any;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const coverImage = product?.coverImage ?? product?.images?.[0] ?? null;
  const price = Number(product?.price ?? 0);
  const name = product?.displayName ?? product?.name ?? '';
  const linkTarget = product?.slug ? `/products/${product.slug}` : `/products/${product.code}`;

  return (
    <Link to={linkTarget} style={{ textDecoration: 'none', display: 'block' }}>
      <div
        style={{
          borderRadius: 16,
          overflow: 'hidden',
          boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
          transition: 'transform 0.2s ease',
          cursor: 'pointer',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-4px)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
      >
        {/* IMAGE */}
        <div
          style={{
            background: '#f0f5f5',
            height: 220,
            overflow: 'hidden',
            padding: 0,
            margin: 0,
            width: '100%',
          }}
        >
          <img
            src={coverImage ?? '/imgs/Ricochet.jpeg'}
            alt={name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>

        {/* BODY */}
        <div
          style={{
            background: '#1a1a1a',
            borderTop: '3px solid #2E9ED4',
            padding: 16,
          }}
        >
          <div
            style={{
              fontFamily: 'Outfit',
              fontSize: 15,
              fontWeight: 500,
              color: '#ffffff',
              marginBottom: 4,
            }}
          >
            {name}
          </div>
          <div
            style={{
              fontFamily: 'Outfit',
              fontSize: 20,
              fontWeight: 500,
              color: '#2E9ED4',
              marginBottom: 14,
            }}
          >
            ${price.toLocaleString('es-CO')}
          </div>
          <div
            style={{
              fontFamily: 'Outfit',
              textAlign: 'center',
              padding: 10,
              background: '#2E9ED4',
              borderRadius: 8,
              color: '#ffffff',
              fontSize: 13,
              fontWeight: 500,
            }}
          >
            Ver producto →
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
