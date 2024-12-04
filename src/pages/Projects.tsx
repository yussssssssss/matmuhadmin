import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import {
  getProjects,
  addProject,
  updateProject,
  deleteProject,
} from '../services/ProjectService';
import WYSIWYGEditor from '../components/common/WYSIWYGEditor';
import Preview from '../components/Preview';

// Modal için root elemanını belirtin
Modal.setAppElement('#root');

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewContent, setPreviewContent] = useState<{ title: string; content: string } | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await getProjects();
      if (response.success && Array.isArray(response.data)) {
        setProjects(response.data);
      }
    } catch (error) {
      console.error('Projeler yüklenirken hata oluştu:', error);
    }
  };

  const handleSubmit = async () => {
    const projectDto = {
      name,
      description,
    };

    const formData = new FormData();
    formData.append('data', new Blob([JSON.stringify(projectDto)], { type: 'application/json' }));
    if (coverImage) {
      formData.append('coverImage', coverImage);
    }

    try {
      if (editingId) {
        await updateProject(editingId, formData);
      } else {
        await addProject(formData);
      }
      fetchProjects();
      closeModal();
    } catch (error) {
      console.error('Proje eklerken hata oluştu:', error);
    }
  };

  const handleEdit = (project: Project) => {
    setName(project.name || '');
    setDescription(project.description || '');
    setEditingId(project.id);
    openModal();
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await deleteProject(id);
      if (response.success) {
        // Silinen projeyi state'den çıkararak güncelleyin
        setProjects((prevProjects) =>
          prevProjects.filter((project) => project.id !== id)
        );
      }
    } catch (error) {
      console.error('Proje silinirken hata oluştu:', error);
    }
  };
  

  const resetForm = () => {
    setName('');
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
      <h1 className="text-3xl font-bold mb-6 text-white">Projeler Yönetimi</h1>
      <button
        onClick={openModal}
        className="mb-6 px-6 py-3 bg-green-500 text-white font-semibold rounded hover:bg-green-600"
      >
        Yeni Proje Ekle
      </button>
      <div className="mt-6">
        <ul className="space-y-4">
          {projects.map((project) => (
            <li key={project.id} className="bg-white p-4 rounded shadow border flex items-center">
              {project.coverImageUrl && (
                <img
                  src={project.coverImageUrl}
                  alt="Kapak Resmi"
                  className="w-16 h-16 object-cover rounded mr-4"
                />
              )}
              <div className="flex-1">
                <h2 className="text-lg font-semibold mb-2">{project.name}</h2>
                <p className="text-sm text-gray-600 mb-2">
                  Ekleyen: {project.publisher?.firstName} {project.publisher?.lastName} - 
                  {project.date ? ` ${new Date(project.date).toLocaleString()}` : ' Tarih Bilgisi Yok'}
                </p>
                <div className="flex justify-end space-x-4">
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={() =>
                      setPreviewContent({ title: project.name || 'Proje', content: project.description })
                    }
                  >
                    Önizle
                  </button>
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={() => handleEdit(project)}
                  >
                    Düzenle
                  </button>
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => handleDelete(project.id)}
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
        contentLabel="Proje Ekle/Güncelle"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <h2 className="text-xl font-bold mb-4">{editingId ? 'Proje Güncelle' : 'Yeni Proje Ekle'}</h2>
        <form onSubmit={(e) => e.preventDefault()} className="bg-white p-4 rounded shadow">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Proje Adı"
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

export default Projects;
