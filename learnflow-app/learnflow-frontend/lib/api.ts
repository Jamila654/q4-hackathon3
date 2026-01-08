// import axios from 'axios';

// const API_BASE = {
//   tutor: 'http://localhost:8001',
//   codeRunner: 'http://localhost:8002',
//   progress: 'http://localhost:8003',
// };

// export const api = {
//   // Tutor API
//   chat: async (studentId: string, message: string) => {
//     const response = await axios.post(`${API_BASE.tutor}/chat`, {
//       student_id: studentId,
//       message,
//     });
//     return response.data;
//   },

//   // Code Runner API
//   executeCode: async (code: string, studentId: string) => {
//     const response = await axios.post(`${API_BASE.codeRunner}/execute`, {
//       code,
//       student_id: studentId,
//     });
//     return response.data;
//   },

//   reviewCode: async (code: string) => {
//     const response = await axios.post(`${API_BASE.codeRunner}/review`, {
//       code,
//     });
//     return response.data;
//   },

//   // Progress API
//   getTopics: async () => {
//     const response = await axios.get(`${API_BASE.progress}/topics`);
//     return response.data;
//   },

//   getProgress: async (studentId: string) => {
//     const response = await axios.get(`${API_BASE.progress}/progress/${studentId}`);
//     return response.data;
//   },

//   updateProgress: async (studentId: string, topic: string, score: number) => {
//     const response = await axios.post(`${API_BASE.progress}/progress`, {
//       student_id: studentId,
//       topic,
//       score,
//     });
//     return response.data;
//   },

//   getInsights: async (studentId: string) => {
//     const response = await axios.get(`${API_BASE.progress}/insights/${studentId}`);
//     return response.data;
//   },
// };

import axios from 'axios';

const API_BASE = {
  tutor: 'http://localhost:8001',
  codeRunner: 'http://localhost:8002',
  progress: 'http://localhost:8003',
};

export const api = {
  // Tutor API
  chat: async (studentId: string, message: string) => {
    const response = await axios.post(`${API_BASE.tutor}/chat`, {
      student_id: studentId,
      message,
    });
    return response.data;
  },

  // Code Runner API
  executeCode: async (code: string, studentId: string) => {
    const response = await axios.post(`${API_BASE.codeRunner}/execute`, {
      code,
      student_id: studentId,
    });
    return response.data;
  },

  reviewCode: async (code: string) => {
    const response = await axios.post(`${API_BASE.codeRunner}/review`, {
      code,
    });
    return response.data;
  },

  // Progress API
  getTopics: async () => {
    const response = await axios.get(`${API_BASE.progress}/topics`);
    return response.data;
  },

  getProgress: async (studentId: string) => {
    const response = await axios.get(`${API_BASE.progress}/progress/${studentId}`);
    return response.data;
  },

  updateProgress: async (studentId: string, topic: string, score: number) => {
    const response = await axios.post(`${API_BASE.progress}/progress`, {
      student_id: studentId,
      topic,
      score,
    });
    return response.data;
  },

  getInsights: async (studentId: string) => {
    const response = await axios.get(`${API_BASE.progress}/insights/${studentId}`);
    return response.data;
  },
};