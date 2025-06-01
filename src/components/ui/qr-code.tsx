
import React from 'react';

interface QRCodeProps {
  value: string;
  size?: number;
  level?: 'L' | 'M' | 'Q' | 'H';
  className?: string;
}

const QRCode: React.FC<QRCodeProps> = ({ 
  value, 
  size = 128, 
  level = 'M',
  className = '' 
}) => {
  // Simple QR Code generation using Google Charts API
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(value)}&ecc=${level}`;

  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <img 
        src={qrUrl}
        alt="QR Code"
        className="rounded-lg shadow-lg"
        style={{ width: size, height: size }}
      />
      <p className="text-xs text-gray-400 text-center max-w-[128px]">
        اسکن برای دسترسی سریع
      </p>
    </div>
  );
};

export default QRCode;
