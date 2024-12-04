import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { getLectures, addLecture, updateLecture, deleteLecture } from '../services/LectureService';
import { RequestLectureDto } from '../models/Lecture';

// Modal için root elemanını belirtin
Modal.setAppElement('#root');

const Lectures: React.FC = () => {
  const [lectures, setLectures] = useState<RequestLectureDto[]>([]);
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [term, setTerm] = useState(0);
  const [count, setCount] = useState(0);
  const [credit, setCredit] = useState(0);
  const [syllabusLink, setSyllabusLink] = useState('');
  const [notesLink, setNotesLink] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchLectures();
  }, []);

  const fetchLectures = async () => {
    try {
      const response = await getLectures();
      if (response.success && Array.isArray(response.data)) {
        setLectures(response.data);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // Eğer veri yoksa boş liste olarak set et
        setLectures([]);
      } else {
        console.error('Dersler yüklenirken hata oluştu:', error);
      }
    }
  };
  
  const handleDelete = async (id: string) => {
    try {
      const response = await deleteLecture(id);
      if (response.success) {
        setLectures((prevLectures) => prevLectures.filter((lecture) => lecture.id !== id));
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // Eğer veri zaten yoksa veya silinmişse, durumu uygun şekilde yönet
        setLectures((prevLectures) => prevLectures.filter((lecture) => lecture.id !== id));
      } else {
        console.error('Ders silinirken hata oluştu:', error);
      }
    }
  };

  const handleSubmit = async () => {
    const lecture: RequestLectureDto = {
      id: editingId || '',
      name,
      code,
      term,
      count,
      credit,
      syllabusLink,
      notesLink,
    };

    if (editingId) {
      await updateLecture(editingId, lecture);
    } else {
      await addLecture(lecture);
    }

    fetchLectures();
    closeModal();
  };

  const handleEdit = (lecture: RequestLectureDto) => {
    setName(lecture.name);
    setCode(lecture.code);
    setTerm(lecture.term);
    setCount(lecture.count);
    setCredit(lecture.credit);
    setSyllabusLink(lecture.syllabusLink);
    setNotesLink(lecture.notesLink);
    setEditingId(lecture.id);
    openModal();
  };
  

  const resetForm = () => {
    setName('');
    setCode('');
    setTerm(0);
    setCount(0);
    setCredit(0);
    setSyllabusLink('');
    setNotesLink('');
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
      <h1 className="text-3xl font-bold mb-6 text-white">Dersler Yönetimi</h1>
      <button
        onClick={openModal}
        className="mb-6 px-6 py-3 bg-green-500 text-white font-semibold rounded hover:bg-green-600"
      >
        Yeni Ders Ekle
      </button>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {lectures.map((lecture) => (
          <div key={lecture.id} className="bg-white p-6 rounded shadow-md border flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{lecture.name} ({lecture.code})</h2>
              <p className="text-gray-600">Dönem: {lecture.term}</p>
              <p className="text-gray-600">Kredi: {lecture.credit}</p>
              <p className="text-gray-600">Öğrenci Sayısı: {lecture.count}</p>
              {lecture.syllabusLink && (
                <a href={lecture.syllabusLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline mt-2 block">
                  Syllabus
                </a>
              )}
              {lecture.notesLink && (
                <a href={lecture.notesLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline mt-2 block">
                  Notes
                </a>
              )}
            </div>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                className="text-blue-500 hover:underline"
                onClick={() => handleEdit(lecture)}
              >
                Düzenle
              </button>
              <button
                className="text-red-500 hover:underline"
                onClick={() => handleDelete(lecture.id)}
              >
                Sil
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Popup */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Ders Ekle/Güncelle"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <h2 className="text-xl font-bold mb-4">{editingId ? 'Ders Güncelle' : 'Yeni Ders Ekle'}</h2>
        <form onSubmit={(e) => e.preventDefault()} className="bg-white p-4 rounded shadow">
          <div className="mb-4">
            <label htmlFor="lectureName" className="block text-sm font-medium text-gray-700 mb-2">
              Ders Adı
            </label>
            <input
              id="lectureName"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lectureCode" className="block text-sm font-medium text-gray-700 mb-2">
              Ders Kodu
            </label>
            <input
              id="lectureCode"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lectureTerm" className="block text-sm font-medium text-gray-700 mb-2">
              Dönem
            </label>
            <input
              id="lectureTerm"
              type="number"
              value={term}
              onChange={(e) => setTerm(Number(e.target.value))}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lectureCount" className="block text-sm font-medium text-gray-700 mb-2">
              Ders Sayısı
            </label>
            <input
              id="lectureCount"
              type="number"
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lectureCredit" className="block text-sm font-medium text-gray-700 mb-2">
              Kredi
            </label>
            <input
              id="lectureCredit"
              type="number"
              value={credit}
              onChange={(e) => setCredit(Number(e.target.value))}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="syllabusLink" className="block text-sm font-medium text-gray-700 mb-2">
              Syllabus Link
            </label>
            <input
              id="syllabusLink"
              type="text"
              value={syllabusLink}
              onChange={(e) => setSyllabusLink(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="notesLink" className="block text-sm font-medium text-gray-700 mb-2">
              Notes Link
            </label>
            <input
              id="notesLink"
              type="text"
              value={notesLink}
              onChange={(e) => setNotesLink(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
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

export default Lectures;
