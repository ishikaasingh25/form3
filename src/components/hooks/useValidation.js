import { useState } from 'react';

export const useValidation = (formData) => {
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        let tempErrors = {};

        if (!formData.fullName.trim()) {
            tempErrors.fullName = 'Full Name is required';
        }

        if (!formData.email.trim()) {
            tempErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            tempErrors.email = 'Email is invalid';
        }

        if (!formData.surveyTopic) {
            tempErrors.surveyTopic = 'Survey Topic is required';
        }

        if (formData.surveyTopic === 'Technology') {
            if (!formData.favoriteProgrammingLanguage) {
                tempErrors.favoriteProgrammingLanguage = 'Favorite Programming Language is required';
            }
            if (!formData.yearsOfExperience) {
                tempErrors.yearsOfExperience = 'Years of Experience is required';
            } else if (isNaN(formData.yearsOfExperience) || formData.yearsOfExperience < 0) {
                tempErrors.yearsOfExperience = 'Years of Experience must be a valid number';
            }
        }

        if (formData.surveyTopic === 'Health') {
            if (!formData.exerciseFrequency) {
                tempErrors.exerciseFrequency = 'Exercise Frequency is required';
            }
            if (!formData.dietPreference) {
                tempErrors.dietPreference = 'Diet Preference is required';
            }
        }

        if (formData.surveyTopic === 'Education') {
            if (!formData.highestQualification) {
                tempErrors.highestQualification = 'Highest Qualification is required';
            }
            if (!formData.fieldOfStudy) {
                tempErrors.fieldOfStudy = 'Field of Study is required';
            }
        }

        if (!formData.feedback.trim()) {
            tempErrors.feedback = 'Feedback is required';
        } else if (formData.feedback.length < 50) {
            tempErrors.feedback = 'Feedback must be at least 50 characters';
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    return { errors, validateForm };
};
