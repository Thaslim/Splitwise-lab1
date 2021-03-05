import React from 'react';

const Language = () => (
  <div>
    <select className='modernized' name='user[locale]' id='user_locale'>
      <option selected='selected' value='en'>
        English
      </option>
      <option value='de'>Deutsch</option>
      <option value='es'>Español</option>
      <option value='fr'>Français</option>
      <option value='id'>Bahasa Indonesia</option>
      <option value='it'>Italiano</option>
      <option value='ja'>日本語</option>
      <option value='nl'>Nederlands</option>
      <option value='pt-BR'>Português (Brasil)</option>
      <option value='pt-PT'>Português (Portugal)</option>
      <option value='sv'>Svenska</option>
      <option value='th'>ภาษาไทย</option>
      <option value='emoji'>😀</option>
    </select>
  </div>
);

export default Language;
