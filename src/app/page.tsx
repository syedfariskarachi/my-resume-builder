"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import html2pdf from "html2pdf.js";

export default function ResumePage() {
    // States for showing different views
    const [showForm, setShowForm] = useState(false);
    const [showResume, setShowResume] = useState(false);
    
    // Form states
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [careerSummary, setCareerSummary] = useState("");
    const [skills, setSkills] = useState("");
    const [education, setEducation] = useState("");
    const [workExperience, setWorkExperience] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    
    // Resume template state
    const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const resumeRef = useRef(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowResume(true);
        setShowForm(false);
    };

    const handleDownload = () => {
        setIsGeneratingPDF(true);
        const element = resumeRef.current;
        if (element) {
            html2pdf()
                .set({
                    margin: 1,
                    filename: `${name || "resume"}.pdf`,
                    image: { type: 'jpeg', quality: 0.98 },
                    html2canvas: { scale: 2 },
                    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
                })
                .from(element)
                .save()
                .finally(() => setIsGeneratingPDF(false));
        }
    };
    const handleEdit = () => {
      setIsEditing(!isEditing);
      if (isEditing) {
          setShowResume(true);
      }
    };
    

    // Initial template view
    if (!showForm && !showResume) {
        return (
            <>
                <div className="bg-gray-100 min-h-screen p-8 md:p-12 lg:p-16">
                    <div className="font-bold text-2xl text-center text-black mb-8">My Resume</div>
                    <div className="bg-green-500 p-8 rounded-lg flex flex-col md:flex-row items-center justify-between text-black">
                        <div className="flex items-center space-x-4 mb-4 md:mb-0">
                            <div><Image className="bg-gray-300 rounded-full md:w-20 md:h-20" src="/img1.png" alt="" width="60" height="10"/></div>
                            <div>
                                <h1 className="text-xl font-bold md:text-2xl">Faris Shah</h1>
                                <p>Gmail:syedfarisproframer@gmail.com</p>
                                <p>Contact Number:03146868250</p>
                            </div>
                        </div>
                        <div className="space-y-2 text-left">
                        <ul className="flex flex-row flex-wrap md:flex-col space-x-4 md:space-x-0 md:space-y-2">
    <li className="flex items-center">
      <svg height="24" width="24" viewBox="0 0 16 16" aria-hidden="true">
        <path
          fillRule="evenodd"
          d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.01.08-2.1 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.09.16 1.9.08 2.1.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"
        />
      </svg>
      <a href="https://github.com/yourusername"  className="ml-2">
        GitHub
      </a>
    </li>
    <li className="flex items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M22.23 0H1.77C.792 0 0 .774 0 1.73v20.54C0 23.225.792 24 1.77 24h20.46c.978 0 1.77-.774 1.77-1.73V1.73C24 .774 23.208 0 22.23 0zM7.08 20.452H3.545V9h3.535v11.452zM5.31 7.574c-1.13 0-2.045-.918-2.045-2.05 0-1.133.915-2.05 2.045-2.05s2.045.917 2.045 2.05c0 1.132-.915 2.05-2.045 2.05zM20.452 20.452h-3.535v-5.605c0-1.335-.027-3.056-1.862-3.056-1.862 0-2.146 1.454-2.146 2.957v5.704h-3.535V9h3.396v1.562h.049c.472-.894 1.625-1.832 3.347-1.832 3.577 0 4.238 2.354 4.238 5.414v6.308z" />
      </svg>
      <a href="https://www.linkedin.com/in/yourusername" className="ml-2">
        LinkedIn
      </a>
    </li>
    <li className="flex items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M10 2h4c1.1 0 2 .9 2 2v2h3c1.66 0 3 1.34 3 3v10c0 1.66-1.34 3-3 3H5c-1.66 0-3-1.34-3-3V9c0-1.66 1.34-3 3-3h3V4c0-1.1.9-2 2-2zm4 4V4h-4v2h4zm-9 4v10h14V10H5z" />
      </svg>
      <a href="https://www.yourportfolio.com" className="ml-2">
        Portfolio
      </a>
    </li>
    <li className="flex items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M7.75 2h8.5C19.55 2 22 4.45 22 7.75v8.5c0 3.3-2.45 5.75-5.75 5.75h-8.5C4.45 22 2 19.55 2 16.25v-8.5C2 4.45 4.45 2 7.75 2zm0 1.5C5.68 3.5 4 5.18 4 7.75v8.5c0 2.57 1.68 4.25 3.75 4.25h8.5c2.57 0 4.25-1.68 4.25-4.25v-8.5c0-2.57-1.68-4.25-4.25-4.25h-8.5zM12 7.25a4.75 4.75 0 1 1 0 9.5 4.75 4.75 0 0 1 0-9.5zm0 1.5a3.25 3.25 0 1 0 0 6.5 3.25 3.25 0 0 0 0-6.5zM17.25 6.5a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5z" />
      </svg>
      <a href="https://www.instagram.com/yourprofile" className="ml-2">
        Instagram
      </a>
    </li>
  </ul>
                        </div>
                    </div>

                    <div className="mt-8">
                        <h2 className="text-2xl font-bold text-black">Career Summary</h2>
                        <p className="mt-4 text-gray-700">Not available</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                        <div className="bg-gray-200 p-4 rounded-lg">
                            <h3 className="text-xl font-semibold text-black">Skill</h3>
                            <ul className="mt-2 text-gray-700">
                                <li>Front-end Developer</li>
                                <li>Python</li>
                                <li>Word</li>
                                <li>Excel</li>
                                <li>Typescript</li>
                            </ul>
                        </div>

                        <div className="bg-gray-200 p-4 rounded-lg">
                            <h3 className="text-xl font-semibold text-black">Education</h3>
                            <p className="mt-2 text-gray-700">
                                Matriculation from High School<br />
                                Intermidietat from Govt. college<br />
                            </p>
                        </div>

                        <div className="bg-gray-200 p-4 rounded-lg">
                            <h3 className="text-xl font-semibold text-black">Work Experience</h3>
                            <p className="mt-2 text-gray-700">
                                Work om small projects
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-center">
                        <button
                            onClick={() => setShowForm(true)}
                            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 font-semibold"
                        >
                            Create Your Resume
                        </button>
                    </div>
                </div>
            </>
        );
    }

    // Form view
    if (showForm) {
        return (
            <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow-md space-y-4 text-black max-w-2xl mx-auto my-8">
                <div className="text-center">
                    {imagePreview && (
                        <div className="w-32 h-32 relative mx-auto mb-2 rounded-full overflow-hidden">
                            <Image
                                src={imagePreview}
                                alt="Profile preview"
                                layout="fill"
                                objectFit="cover"
                                className="rounded-full"
                            />
                        </div>
                    )}
                    <input type="file" accept="image/*" onChange={handleImageChange} className="mb-4" />
                </div>

                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border rounded w-full p-2"
                    />
                </div>
                {/* Add other form fields similarly */}
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border rounded w-full p-2"
                    />
                </div>
                <div>
                    <label>Phone:</label>
                    <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="border rounded w-full p-2"
                    />
                </div>
                <div>
                    <label>Career Summary:</label>
                    <textarea
                        value={careerSummary}
                        onChange={(e) => setCareerSummary(e.target.value)}
                        className="border rounded w-full p-2"
                        rows={4}
                    />
                </div>
                <div>
                    <label>Skills (comma separated):</label>
                    <input
                        type="text"
                        value={skills}
                        onChange={(e) => setSkills(e.target.value)}
                        className="border rounded w-full p-2"
                    />
                </div>
                <div>
                    <label>Education:</label>
                    <textarea
                        value={education}
                        onChange={(e) => setEducation(e.target.value)}
                        className="border rounded w-full p-2"
                        rows={4}
                    />
                </div>
                <div>
                    <label>Work Experience:</label>
                    <textarea
                        value={workExperience}
                        onChange={(e) => setWorkExperience(e.target.value)}
                        className="border rounded w-full p-2"
                        rows={4}
                    />
                </div>
                <div className="flex gap-4">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-200"
                    >
                        Create Resume
                    </button>
                    <button
                        type="button"
                        onClick={() => setShowForm(false)}
                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors duration-200"
                    >
                        Back
                    </button>
                </div>
            </form>
        );
    }

    // Final resume view with editing capabilities
    return (
        <div className="bg-gray-100 min-h-screen p-8 md:p-12 lg:p-16">
            <div ref={resumeRef} className="bg-gray-100 p-4">
                <div className="bg-green-500 p-4 rounded text-center">
                    <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-white">
                        {imagePreview ? (
                            <Image
                                src={imagePreview}
                                alt="Profile"
                                width={150}
                                height={150}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    const image = e.currentTarget;
                                    image.src = "/api/placeholder/128/128";
                                }}
                            />
                        ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50">
                                <div className="text-gray-400 text-4xl mb-2">📷</div>
                                <span className="text-sm text-gray-400">Photo</span>
                            </div>
                        )}
                    </div>

                    <div className="text-white">
                        {isEditing ? (
                            <div>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="text-2xl font-bold text-black"
                                />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="mt-2 text-black"
                                />
                                <input
                                    type="text"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="mt-2 text-black"
                                />
                            </div>
                        ) : (
                            <div>
                                <h1 className="text-2xl font-bold">{name || "Your Name"}</h1>
                                <p>{email || "youremail@example.com"}</p>
                                <p>{phone || "Your phone number"}</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-6">
                    <h2 className="text-xl font-bold">Career Summary</h2>
                    {isEditing ? (
                        <textarea
                            value={careerSummary}
                            onChange={(e) => setCareerSummary(e.target.value)}
                            className="mt-2 w-full text-black"
                        />
                    ) : (
                        <p className="mt-2">{careerSummary || "Add Career Summary"}</p>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                    <div className="bg-gray-200 p-4 rounded-lg">
                        <h3 className="text-xl font-semibold text-black">Skills</h3>
                        {isEditing ? (
                            <textarea
                                value={skills}
                                onChange={(e) => setSkills(e.target.value)}
                                className="mt-2 w-full text-black"
                            />
                        ) : (
                            <ul className="mt-2 list-none pl-4">
                                {skills ? skills.split(",").map((skill, index) => (
                                    <li key={index} className="text-gray-700">{skill.trim()}</li>
                                )) : <li className="text-gray-700">No skills listed</li>}
                            </ul>
                        )}
                    </div>

                    <div className="bg-gray-200 p-4 rounded-lg">
                        <h3 className="text-xl font-semibold text-black">Education</h3>
                        {isEditing ? (
                            <textarea
                                value={education}
                                onChange={(e) => setEducation(e.target.value)}
                                className="mt-2 w-full text-black"
                            />
                        ) : (
                            <p className="mt-2 text-gray-700">{education || "Add your Education"}</p>
                        )}
                    </div>

                    <div className="bg-gray-200 p-4 rounded-lg">
                        <h3 className="text-xl font-semibold text-black">Work Experience</h3>
                        {isEditing ? (
                            <textarea
                                value={workExperience}
                                onChange={(e) => setWorkExperience(e.target.value)}
                                className="mt-2 w-full text-black"
                            />
                        ) : (
                            <p className="mt-2 text-gray-700">{workExperience || "Add your work history"}</p>
                        )}
                    </div>
                </div>
            </div>

            <div className="mt-6 flex gap-4">
                <button
                    onClick={handleDownload}
                    disabled={isGeneratingPDF}
                    className="px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-200"
                >
                    {isGeneratingPDF ? "Generating PDF..." : "Download PDF"}
                </button>

                <button
                    onClick={handleEdit}
                    className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
                >
                    {isEditing ? "Save Changes" : "Edit Resume"}
                </button>

                <button
                    onClick={() => setShowResume(false)}
                    className="px-6 py-3 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors duration-200"
                >
                    Back to Form
                </button>
            </div>
        </div>
    );
}