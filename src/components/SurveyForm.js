import React, { useState, useEffect } from 'react';
import { useForm } from './hooks/useForm';
import { useValidation } from './hooks/useValidation';
import { fetchAdditionalQuestions } from './utils/api';
import "bootstrap/dist/css/bootstrap.min.css"
import '../App.css';

const SurveyForm = () => {
    const { formData, handleInputChange, setFormData } = useForm({
        fullName: '',
        email: '',
        surveyTopic: '',
        favoriteProgrammingLanguage: '',
        yearsOfExperience: '',
        exerciseFrequency: '',
        dietPreference: '',
        highestQualification: '',
        fieldOfStudy: '',
        feedback: '',
    });

    const { errors, validateForm } = useValidation(formData);
    const [additionalQuestions, setAdditionalQuestions] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            const questions = await fetchAdditionalQuestions(formData.surveyTopic);
            setAdditionalQuestions(questions);
            setIsSubmitted(true);
        }
    };

    useEffect(() => {
        if (formData.surveyTopic) {
            fetchAdditionalQuestions(formData.surveyTopic).then(setAdditionalQuestions);
        }
    }, [formData.surveyTopic]);

    return (
        <div>
            {!isSubmitted ? (
                <>
                    <form  class="form-control" onSubmit={handleSubmit}>
                        <div class="mb-3">
                            <label class="form-label">Full Name</label>
                            <input class="form-control" id="exampleFormControlInput1" type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} />
                            {errors.fullName && <span>{errors.fullName}</span>}
                        </div>
                        <div class="mb-3">
                            <label  class="form-label">Email</label>
                            <input class="form-control" id="exampleFormControlInput1" type="email" name="email" value={formData.email} onChange={handleInputChange} />
                            {errors.email && <span>{errors.email}</span>}
                        </div>
                        <div class="mb-3">
                            <label>Survey Topic</label>
                            <select name="surveyTopic" className="form-control" id="exampleFormControlSelect1" value={formData.surveyTopic} onChange={handleInputChange}>
                                <option value="">Select</option>
                                <option value="Technology">Technology</option>
                                <option value="Health">Health</option>
                                <option value="Education">Education</option>
                            </select>
                            {errors.surveyTopic && <span>{errors.surveyTopic}</span>}
                        </div>

                        {formData.surveyTopic === 'Technology' && (
                            <div>
                                <div>
                                    <label class="form-label">Favorite Programming Language</label>
                                    <select name="favoriteProgrammingLanguage" className="form-control" id="exampleFormControlSelect1" value={formData.favoriteProgrammingLanguage} onChange={handleInputChange}>
                                        <option value="">Select</option>
                                        <option value="JavaScript">JavaScript</option>
                                        <option value="Python">Python</option>
                                        <option value="Java">Java</option>
                                        <option value="C#">C#</option>
                                    </select>
                                    {errors.favoriteProgrammingLanguage && <span>{errors.favoriteProgrammingLanguage}</span>}
                                </div>
                                <div>
                                    <label class="form-label">Years of Experience</label>
                                    <input  class="form-control" id="exampleFormControlInput1"type="number" name="yearsOfExperience" value={formData.yearsOfExperience} onChange={handleInputChange} />
                                    {errors.yearsOfExperience && <span>{errors.yearsOfExperience}</span>}
                                </div>
                            </div>
                        )}

                        {formData.surveyTopic === 'Health' && (
                            <div>
                                <div>
                                    <label class="form-label">Exercise Frequency</label>
                                    <select  className="form-control" id="exampleFormControlSelect1"name="exerciseFrequency" value={formData.exerciseFrequency} onChange={handleInputChange}>
                                        <option value="">Select</option>
                                        <option value="Daily">Daily</option>
                                        <option value="Weekly">Weekly</option>
                                        <option value="Monthly">Monthly</option>
                                        <option value="Rarely">Rarely</option>
                                    </select>
                                    {errors.exerciseFrequency && <span>{errors.exerciseFrequency}</span>}
                                </div>
                                <div>
                                    <label class="form-label">Diet Preference</label>
                                    <select className="form-control" id="exampleFormControlSelect1" name="dietPreference" value={formData.dietPreference} onChange={handleInputChange}>
                                        <option value="">Select</option>
                                        <option value="Vegetarian">Vegetarian</option>
                                        <option value="Vegan">Vegan</option>
                                        <option value="Non-Vegetarian">Non-Vegetarian</option>
                                    </select>
                                    {errors.dietPreference && <span>{errors.dietPreference}</span>}
                                </div>
                            </div>
                        )}

                        {formData.surveyTopic === 'Education' && (
                            <div>
                                <div>
                                    <label class="form-label">Highest Qualification</label>
                                    <select  className="form-control" id="exampleFormControlSelect1"name="highestQualification" value={formData.highestQualification} onChange={handleInputChange}>
                                        <option value="">Select</option>
                                        <option value="High School">High School</option>
                                        <option value="Bachelor's">Bachelor's</option>
                                        <option value="Master's">Master's</option>
                                        <option value="PhD">PhD</option>
                                    </select>
                                    {errors.highestQualification && <span>{errors.highestQualification}</span>}
                                </div>
                                <div>
                                    <label class="form-label">Field of Study</label>
                                    <input  class="form-control" id="exampleFormControlInput1"type="text" name="fieldOfStudy" value={formData.fieldOfStudy} onChange={handleInputChange} />
                                    {errors.fieldOfStudy && <span>{errors.fieldOfStudy}</span>}
                                </div>
                            </div>
                        )}

                        <div>
                            <label class="form-label">Feedback</label>
                            <textarea  class="form-control"  name="feedback" value={formData.feedback} onChange={handleInputChange} />
                            {errors.feedback && <span>{errors.feedback}</span>}
                        </div>

                        <button className="btn btn-primary add" type="submit">Submit</button>
                    </form>

                    <div className="summary">
                        <h2>Form Summary</h2>
                        <p><strong>Full Name:</strong> {formData.fullName}</p>
                        <p><strong>Email:</strong> {formData.email}</p>
                        <p><strong>Survey Topic:</strong> {formData.surveyTopic}</p>

                        {formData.surveyTopic === 'Technology' && (
                            <>
                                <p><strong>Favorite Programming Language:</strong> {formData.favoriteProgrammingLanguage}</p>
                                <p><strong>Years of Experience:</strong> {formData.yearsOfExperience}</p>
                            </>
                        )}

                        {formData.surveyTopic === 'Health' && (
                            <>
                                <p><strong>Exercise Frequency:</strong> {formData.exerciseFrequency}</p>
                                <p><strong>Diet Preference:</strong> {formData.dietPreference}</p>
                            </>
                        )}

                        {formData.surveyTopic === 'Education' && (
                            <>
                                <p><strong>Highest Qualification:</strong> {formData.highestQualification}</p>
                                <p><strong>Field of Study:</strong> {formData.fieldOfStudy}</p>
                            </>
                        )}

                        <p><strong>Feedback:</strong> {formData.feedback}</p>
                    </div>
                </>
            ) : (
                <div>
                    <h2>Summary</h2>
                    <p><strong>Full Name:</strong> {formData.fullName}</p>
                    <p><strong>Email:</strong> {formData.email}</p>
                    <p><strong>Survey Topic:</strong> {formData.surveyTopic}</p>
                    {formData.surveyTopic === 'Technology' && (
                        <>
                            <p><strong>Favorite Programming Language:</strong> {formData.favoriteProgrammingLanguage}</p>
                            <p><strong>Years of Experience:</strong> {formData.yearsOfExperience}</p>
                        </>
                    )}
                    {formData.surveyTopic === 'Health' && (
                        <>
                            <p><strong>Exercise Frequency:</strong> {formData.exerciseFrequency}</p>
                            <p><strong>Diet Preference:</strong> {formData.dietPreference}</p>
                        </>
                    )}
                    {formData.surveyTopic === 'Education' && (
                        <>
                            <p><strong>Highest Qualification:</strong> {formData.highestQualification}</p>
                            <p><strong>Field of Study:</strong> {formData.fieldOfStudy}</p>
                        </>
                    )}
                    <p><strong>Feedback:</strong> {formData.feedback}</p>

                    {additionalQuestions.length > 0 && (
                        <div className="additional-questions">
                            <h3>Additional Questions</h3>
                            {additionalQuestions.map((question, index) => (
                                <div key={index}>
                                    <label>{question.text}</label>
                                    <input
                                        type="text"
                                        name={`additionalQuestion${index}`}
                                        value={formData[`additionalQuestion${index}`] || ''}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SurveyForm;
