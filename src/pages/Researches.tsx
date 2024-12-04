import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import {
  getResearches,
  addResearch,
  updateResearch,
  deleteResearch,
} from '../services/ResearchService';
import { ResponseResearchDto } from '../models/Research';
import WYSIWYGEditor from '../components/common/WYSIWYGEditor';
import Preview from '../components/Preview';

// Modal için root elemanını belirtin
Modal.setAppElement('#root');

const Researches: React.FC = () => {
  const [researches, setResearches] = useState<ResponseResearchDto[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewContent, setPreviewContent] = useState<{ title: string; content: string } | null>(null);

  useEffect(() => {
    fetchResearches();
  }, []);

  const fetchResearches = async () => {
    try {
      const response = await getResearches();
      if (response.success && Array.isArray(response.data)) {
        setResearches(response.data);
      }
    } catch (error) {
      console.error('Araştırmalar yüklenirken hata oluştu:', error);
    }
  };

  const handleSubmit = async () => {
    const researchDto = {
      title,
      description,
    };

    const formData = new FormData();
    formData.append('data', new Blob([JSON.stringify(researchDto)], { type: 'application/json' }));
    if (coverImage) {
      formData.append('coverImage', coverImage);
    }

    try {
      if (editingId) {
        await updateResearch(editingId, formData);
      } else {
        await addResearch(formData);
      }
      fetchResearches();
      closeModal();
    } catch (error) {
      console.error('Araştırma eklerken hata oluştu:', error);
    }
  };

  const handleEdit = (research: ResponseResearchDto) => {
    setTitle(research.title || '');
    setDescription(research.description || '');
    setEditingId(research.id);
    openModal();
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await deleteResearch(id);
      if (response.success) {
        // Silinen araştırmayı state'den çıkararak güncelleyin
        setResearches((prevResearches) =>
          prevResearches.filter((research) => research.id !== id)
        );
      }
    } catch (error) {
      console.error('Araştırma silinirken hata oluştu:', error);
    }
  };
  

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setCoverImage(null);
    setEditingId(null);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    resetForm();
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-white">Araştırmalar Yönetimi</h1>
      <button
        onClick={openModal}
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Yeni Araştırma Ekle
      </button>
      <div className="mt-6">
        <ul className="space-y-4">
          {researches.map((research) => (
            <li key={research.id} className="bg-white p-4 rounded shadow border flex items-center">
              {research.coverImageUrl && (
                <img
                  src={research.coverImageUrl}
                  alt="Kapak Resmi"
                  className="w-16 h-16 object-cover rounded mr-4"
                />
              )}
              <div className="flex-1">
                <h2 className="text-lg font-semibold mb-2">{research.title}</h2>
                <div className="flex justify-end space-x-4">
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={() =>
                      setPreviewContent({ title: research.title || 'Araştırma', content: research.description })
                    }
                  >
                    Önizle
                  </button>
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={() => handleEdit(research)}
                  >
                    Düzenle
                  </button>
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => handleDelete(research.id)}
                  >
                    Sil
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {previewContent && (
        <Preview title={previewContent.title} content={previewContent.content} onClose={() => setPreviewContent(null)} />
      )}

      {/* Modal Popup */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Araştırma Ekle/Güncelle"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <h2 className="text-xl font-bold mb-4">{editingId ? 'Araştırma Güncelle' : 'Yeni Araştırma Ekle'}</h2>
        <form onSubmit={(e) => e.preventDefault()} className="bg-white p-4 rounded shadow">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Başlık"
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <WYSIWYGEditor value={description} onChange={setDescription} />
          <input
            type="file"
            onChange={(e) => setCoverImage(e.target.files ? e.target.files[0] : null)}
            className="w-full p-2 mb-4 border rounded"
            accept="image/*"
          />
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              İptal
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {editingId ? 'Güncelle' : 'Ekle'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Researches;
