import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import {
  getAnnouncements,
  addAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
} from '../services/AnnouncementService';
import { ResponseAnnouncementDto } from '../models/Announcement';
import WYSIWYGEditor from '../components/common/WYSIWYGEditor';
import Preview from '../components/Preview';

// Modal için root elemanını belirtin
Modal.setAppElement('#root');

const Announcements: React.FC = () => {
  const [announcements, setAnnouncements] = useState<ResponseAnnouncementDto[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewContent, setPreviewContent] = useState<{ title: string; content: string } | null>(null);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await getAnnouncements();
      if (response.success && Array.isArray(response.data)) {
        setAnnouncements(response.data);
      }
    } catch (error) {
      console.error('Duyurular yüklenirken hata oluştu:', error);
    }
  };

  const handleSubmit = async () => {
    const announcementDto = {
      title,
      content,
    };

    const formData = new FormData();
    formData.append('data', new Blob([JSON.stringify(announcementDto)], { type: 'application/json' }));
    if (coverImage) {
      formData.append('coverImage', coverImage);
    }

    try {
      if (editingId) {
        await updateAnnouncement(editingId, formData);
      } else {
        await addAnnouncement(formData);
      }
      fetchAnnouncements();
      closeModal();
    } catch (error) {
      console.error('Duyuru eklerken hata oluştu:', error);
    }
  };

  const handleEdit = (announcement: ResponseAnnouncementDto) => {
    setTitle(announcement.title || '');
    setContent(announcement.content || '');
    setEditingId(announcement.id);
    openModal();
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await deleteAnnouncement(id);
      if (response.success) {
        // Silinen duyuruyu state'den çıkararak güncelleyin
        setAnnouncements((prevAnnouncements) =>
          prevAnnouncements.filter((announcement) => announcement.id !== id)
        );
      }
    } catch (error) {
      console.error('Duyuru silinirken hata oluştu:', error);
    }
  };

  const resetForm = () => {
    setTitle('');
    setContent('');
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
      <h1 className="text-2xl font-bold mb-4 text-white">Duyurular Yönetimi</h1>
      <button
        onClick={openModal}
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-blue-600"
      >
        Yeni Duyuru Ekle
      </button>
      <div className="mt-6">
        <ul className="space-y-4">
          {announcements.map((announcement) => (
            <li key={announcement.id} className="bg-white p-4 rounded shadow border flex items-center">
              {announcement.coverImageUrl && (
                <img
                  src={announcement.coverImageUrl}
                  alt="Kapak Resmi"
                  className="w-16 h-16 object-cover rounded mr-4"
                />
              )}
              <div className="flex-1">
                <h2 className="text-lg font-semibold mb-2">{announcement.title}</h2>
                <p className="text-sm text-gray-600 mb-2">
                  Ekleyen: {announcement.publisher?.firstName} {announcement.publisher?.lastName} - 
                  {announcement.publishDate ? ` ${new Date(announcement.publishDate).toLocaleString()}` : ' Tarih Bilgisi Yok'}
                </p>
                <div className="flex justify-end space-x-4">
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={() =>
                      setPreviewContent({ title: announcement.title || 'Duyuru', content: announcement.content })
                    }
                  >
                    Önizle
                  </button>
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={() => handleEdit(announcement)}
                  >
                    Düzenle
                  </button>
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => handleDelete(announcement.id)}
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
        contentLabel="Duyuru Ekle/Güncelle"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <h2 className="text-xl font-bold mb-4">{editingId ? 'Duyuru Güncelle' : 'Yeni Duyuru Ekle'}</h2>
        <form onSubmit={(e) => e.preventDefault()} className="bg-white p-4 rounded shadow">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Başlık"
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <WYSIWYGEditor value={content} onChange={setContent} />
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

export default Announcements;
