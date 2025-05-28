import React from 'react';

interface DataCardProps {
  data: any;
}

const DataCard: React.FC<DataCardProps> = ({ data }) => {
  if (!data) return null;

  const renderValue = (value: any): React.ReactNode => {
    if (Array.isArray(value)) {
      return (
        <ul className="list-disc list-inside space-y-1">
          {value.map((item, index) => (
            <li key={index} className="text-sm">{item}</li>
          ))}
        </ul>
      );
    }
    if (typeof value === 'object' && value !== null) {
      return (
        <div className="space-y-2">
          {Object.entries(value).map(([k, v]) => (
            <div key={k}>
              <span className="font-medium text-sm">{k}: </span>
              {renderValue(v)}
            </div>
          ))}
        </div>
      );
    }
    return <span className="text-sm">{String(value)}</span>;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      {typeof data === 'object' ? (
        <div className="space-y-3">
          {Object.entries(data).map(([key, value]) => (
            <div key={key}>
              <h4 className="font-medium text-gray-700 mb-1">
                {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </h4>
              {renderValue(value)}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm">{String(data)}</p>
      )}
    </div>
  );
};

export default DataCard;