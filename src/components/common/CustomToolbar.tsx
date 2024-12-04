import React from 'react';
import pdfIcon from '../../assets/pdf.png';

const CustomToolbar = () => (
  <div id="toolbar">
    <select className="ql-font" defaultValue="">
      <option value="arial" style={{ fontFamily: 'Arial' }}>Arial</option>
      <option value="times-new-roman" style={{ fontFamily: 'Times New Roman' }}>Times New Roman</option>
      <option value="calibri" style={{ fontFamily: 'Calibri' }}>Calibri</option>
      <option value="verdana" style={{ fontFamily: 'Verdana' }}>Verdana</option>
      <option value="georgia" style={{ fontFamily: 'Georgia' }}>Georgia</option>
      <option value="trebuchet-ms" style={{ fontFamily: 'Trebuchet MS' }}>Trebuchet MS</option>
      <option value="garamond" style={{ fontFamily: 'Garamond' }}>Garamond</option>
      <option value="comic-sans-ms" style={{ fontFamily: 'Comic Sans MS' }}>Comic Sans MS</option>
      <option value="courier-new" style={{ fontFamily: 'Courier New' }}>Courier New</option>
      <option value="tahoma" style={{ fontFamily: 'Tahoma' }}>Tahoma</option>
      <option value="impact" style={{ fontFamily: 'Impact' }}>Impact</option>
      <option value="lucida-console" style={{ fontFamily: 'Lucida Console' }}>Lucida Console</option>
      <option value="palatino" style={{ fontFamily: 'Palatino' }}>Palatino</option>
      <option value="helvetica" style={{ fontFamily: 'Helvetica' }}>Helvetica</option>
      <option value="cambria" style={{ fontFamily: 'Cambria' }}>Cambria</option>
      <option value="perpetua" style={{ fontFamily: 'Perpetua' }}>Perpetua</option>
      <option value="bookman" style={{ fontFamily: 'Bookman' }}>Bookman</option>
      <option value="rockwell" style={{ fontFamily: 'Rockwell' }}>Rockwell</option>
      <option value="candara" style={{ fontFamily: 'Candara' }}>Candara</option>
      <option value="franklin-gothic-medium" style={{ fontFamily: 'Franklin Gothic Medium' }}>Franklin Gothic Medium</option>
    </select>
    <select className="ql-size" defaultValue="">
      <option value="10px">10</option>
      <option value="12px">12</option>
      <option value="14px">14</option>
      <option value="16px">16</option>
      <option value="18px">18</option>
      <option value="20px">20</option>
      <option value="24px">24</option>
      <option value="28px">28</option>
      <option value="32px">32</option>
      <option value="36px">36</option>
      <option value="40px">40</option>
      <option value="48px">48</option>
      <option value="56px">56</option>
      <option value="64px">64</option>
      <option value="72px">72</option>
      <option value="80px">80</option>
      <option value="96px">96</option>
      <option value="112px">112</option>
      <option value="128px">128</option>
      <option value="144px">144</option>
      <option value="160px">160</option>
    </select>
    <select className="ql-color" defaultValue="" />
    <select className="ql-background" defaultValue="" />
    <button className="ql-bold" aria-label="Kalın"></button>
    <button className="ql-italic" aria-label="İtalik"></button>
    <button className="ql-underline" aria-label="Altı Çizili"></button>
    <button className="ql-strike" aria-label="Üstü Çizili"></button>
    <select className="ql-align" defaultValue="">
      <option value="" label="Sol"></option>
      <option value="center" label="Ortala"></option>
      <option value="right" label="Sağ"></option>
      <option value="justify" label="Yasla"></option>
    </select>
    <button className="ql-link" aria-label="Bağlantı"></button>
    <button className="ql-image" aria-label="Resim"></button>
    <button className="ql-file" aria-label="Dosya Ekle">
      <img src={pdfIcon} alt="Dosya" style={{ width: '18px', height: '18px' }} />
    </button>
    <button className="ql-list" value="ordered" aria-label="Sıralı Liste"></button>
    <button className="ql-list" value="bullet" aria-label="Madde İşaretli Liste"></button>
    <button className="ql-clean" aria-label="Biçimlendirmeyi Temizle"></button>
  </div>
);

export default CustomToolbar;
