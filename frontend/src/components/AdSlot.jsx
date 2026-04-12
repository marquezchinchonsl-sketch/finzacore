import React from 'react';

/**
 * AdSlot - Ready for Google AdSense
 * Replace the data-ad-* attributes with your AdSense slot info
 * and uncomment the <ins> tag when ready.
 */
export default function AdSlot({ type = 'rectangle', adSlot = '', adClient = '' }) {
  // When AdSense is approved, replace the placeholder div with:
  // <ins className="adsbygoogle"
  //   style={{ display: 'block' }}
  //   data-ad-client={adClient}
  //   data-ad-slot={adSlot}
  //   data-ad-format="auto"
  //   data-full-width-responsive="true">
  // </ins>

  return (
    <div className={`ad-slot ad-slot--${type}`}>
      <span style={{
        fontSize: '0.75rem',
        color: 'var(--text-muted)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px'
      }}>
        <span>📢</span>
        <span>Google AdSense</span>
        <span style={{ fontSize: '0.65rem', opacity: 0.6 }}>{type}</span>
      </span>
    </div>
  );
}
