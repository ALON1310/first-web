// src/pages/FAQPage.jsx
import React from 'react';
import './FAQPage.css';
import Logo from '../components/Logo';

function FAQPage({ onBackToStore }) {
  const faqs = [
    {
      q: 'How do you support an aircraft acquisition?',
      a: 'From market scanning and pre-buy due diligence through escrow, registration, and delivery. We lead the full transaction with discretion and data-driven advice.'
    },
    {
      q: 'Do you help after the purchase?',
      a: 'Yes. We assist with MRO planning, crew recruitment, training, and ongoing operating cost optimization.'
    },
    {
      q: 'Can you source off-market aircraft?',
      a: 'Frequently. Our network often surfaces aircraft not publicly listed.'
    },
    {
      q: 'Do you accept trade-ins?',
      a: 'Case by case. We can also coordinate sale of your current airframe while acquiring the next.'
    },
    {
      q: 'What about financing and insurance?',
      a: 'We coordinate reputable lenders and insurers, aligning terms with your operating profile.'
    }
  ];

  return (
    <div className="faq-container">
      <Logo />
      <h1 className="faq-title">Frequently Asked Questions</h1>
      <p className="faq-subtitle">
        Clear answers about our advisory, acquisition, and long-term ownership support.
      </p>

      <div className="faq-list">
        {faqs.map((item, i) => (
          <details key={i} className="faq-item">
            <summary>{item.q}</summary>
            <p>{item.a}</p>
          </details>
        ))}
      </div>

      <div className="faq-cta">
        <button className="btn-outline" type="button" onClick={onBackToStore}>← Back to Store</button>
      </div>
    </div>
  );
}

export default FAQPage;
