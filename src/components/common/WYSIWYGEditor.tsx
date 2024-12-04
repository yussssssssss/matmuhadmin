import React, { useEffect, useState, useRef } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import CustomToolbar from './CustomToolbar';
import 'react-quill/dist/quill.snow.css';
import ImageResize from 'quill-image-resize-module-react';
import './WYSIWYGEditor.css';
import { uploadFile } from '../../services/FileService';
import { uploadImage } from '../../services/ImageService';

// Quill'i global olarak window nesnesine ekleyin
if (typeof window !== 'undefined' && window.Quill === undefined) {
  window.Quill = Quill;
}

// Quill'e ImageResize modülünü kaydediyoruz
Quill.register('modules/imageResize', ImageResize);

// Yazı boyutları için stil ayarlarını ekle
const Size = Quill.import('attributors/style/size');
Size.whitelist = [
  '10px', '12px', '14px', '16px', '18px', '20px', '24px', '28px', '32px', 
  '36px', '40px', '48px', '56px', '64px', '72px', '80px', '96px', '112px', 
  '128px', '144px', '160px'
];
Quill.register(Size, true);

// Font ailesi için attributor oluşturup kaydediyoruz
const Font = Quill.import('attributors/style/font');
Font.whitelist = [
  'arial', 'times-new-roman', 'calibri', 'verdana', 'georgia', 'trebuchet-ms',
  'garamond', 'comic-sans-ms', 'courier-new', 'tahoma', 'impact', 'lucida-console',
  'palatino', 'helvetica', 'cambria', 'perpetua', 'bookman', 'rockwell', 
  'candara', 'franklin-gothic-medium'
];
Quill.register(Font, true);

// Özel ImageBlot sınıfı
const BlockEmbed = Quill.import('blots/block/embed');
class CustomImageBlot extends BlockEmbed {
  static create(value) {
    let node = super.create();
    node.setAttribute('src', value.src);
    node.setAttribute('width', value.width || '100%'); // Varsayılan olarak %100 genişlik
    if (value.align) {
      node.classList.add(`ql-align-${value.align}`);
    }
    return node;
  }

  static value(node) {
    return {
      src: node.getAttribute('src'),
      width: node.getAttribute('width') || 'auto',
      align: node.classList.contains('ql-align-center')
        ? 'center'
        : node.classList.contains('ql-align-right')
        ? 'right'
        : 'left',
    };
  }
}
CustomImageBlot.blotName = 'customImage';
CustomImageBlot.tagName = 'img';
Quill.register(CustomImageBlot);

// Modülleri bileşen dışında tanımlıyoruz
const modules = {
  toolbar: {
    container: '#toolbar',
    handlers: {
      image: null, // Bileşenin içinde tanımlanacak
      file: null,  // Bileşenin içinde tanımlanacak
    },
  },
  imageResize: {
    modules: ['Resize', 'DisplaySize'],
    displayStyles: {
      backgroundColor: 'black',
      border: 'none',
      color: 'white',
    },
    handleStyles: {
      backgroundColor: 'black',
      border: 'none',
    },
  },
};

const formats = [
  'font',
  'size',
  'color', // Yazı rengi formatı eklendi
  'background', // Arka plan rengi formatı eklendi
  'bold',
  'italic',
  'underline',
  'strike',
  'align',
  'list',
  'bullet',
  'link',
  'customImage',
];

const WYSIWYGEditor = ({ value, onChange }) => {
  const [editorReady, setEditorReady] = useState(false);
  const quillRef = useRef(null);

  useEffect(() => {
    setEditorReady(true);
  }, []);

  const handleImageUpload = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files ? input.files[0] : null;
      if (file) {
        const formData = new FormData();
        formData.append('image', file);

        try {
          const response = await uploadImage(formData);
          if (response && response.data.url) {
            const quill = quillRef.current.getEditor();
            const range = quill.getSelection(true);
            // Varsayılan genişliği %100 olarak belirleyin ve hizalama 'left' olsun
            quill.insertEmbed(range.index, 'customImage', {
              src: response.data.url,
              width: '100%',
              align: 'left',
            });
            quill.setSelection(range.index + 1);
          }
        } catch (error) {
          console.error('Fotoğraf yükleme hatası:', error);
        }
      }
    };
  };

  const handleFileUpload = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    input.click();

    input.onchange = async () => {
      const file = input.files ? input.files[0] : null;
      if (file) {
        const formData = new FormData();
        formData.append('file', file);

        try {
          const response = await uploadFile(formData);
          if (response && response.data.url) {
            const quill = quillRef.current.getEditor();
            const range = quill.getSelection(true);
            const linkText = file.name;
            quill.insertText(range.index, linkText, 'link', response.data.url);
            quill.setSelection(range.index + linkText.length);
          }
        } catch (error) {
          console.error('Dosya yükleme hatası:', error);
        }
      }
    };
  };

  if (!editorReady) {
    return null; // Editör hazır değilken hiçbir şey render etmeyin
  }

  // Modüllere handler işlevlerini ekleyin
  modules.toolbar.handlers.image = handleImageUpload;
  modules.toolbar.handlers.file = handleFileUpload;

  return (
    <>
      <CustomToolbar />
      <ReactQuill
        ref={quillRef}
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        theme="snow"
        placeholder="Buraya metin girin..."
      />
    </>
  );
};

export default WYSIWYGEditor;
