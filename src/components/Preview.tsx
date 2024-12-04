import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';

interface PreviewProps {
  title: string;
  content: string;
  onClose: () => void;
}

const Preview: React.FC<PreviewProps> = ({ title, content, onClose }) => (
  <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 overflow-auto">
    <div className="bg-white p-6 rounded shadow-md w-3/4 max-w-2xl relative max-h-screen overflow-y-auto">
      <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
        &times;
      </button>
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <h3 className="text-lg font-semibold mb-4">Duyuru Önizlemesi</h3>
      <ReactQuill value={content} readOnly={true} theme="bubble" />
    </div>
  </div>
);

export default Preview;
