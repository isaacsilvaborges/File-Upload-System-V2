 export function verifyFileType(file) {
      const mimeTypes = {
        txt: 'text/plain',
        notdefined: '',
        docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        pdf: 'application/pdf',
        xls: 'application/vnd.ms-excel',
        xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      };
  
      const fileMimeType = file.type.trim();
      
      const isTextFile = Object.values(mimeTypes).includes(fileMimeType);

      if (isTextFile) {
        return true;
      }
      else {
        return false;
      }
    }
  
  