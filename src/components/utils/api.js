export const fetchAdditionalQuestions = async (topic) => {
  // Dummy data to simulate different questions based on the topic
  const dummyData = {
      Technology: [
          { id: 1, text: 'What is your favorite technology stack?' },
          { id: 2, text: 'Which programming paradigm do you prefer?' }
      ],
      Health: [
          { id: 1, text: 'How many hours do you sleep daily?' },
          { id: 2, text: 'Do you follow any specific diet plan?' }
      ],
      Education: [
          { id: 1, text: 'What is your favorite subject?' },
          { id: 2, text: 'Do you plan to pursue higher education?' }
      ]
  };

  return new Promise((resolve) => {
      setTimeout(() => {
          resolve(dummyData[topic] || []);
      }, 1000); // Simulate network delay
  });
};
