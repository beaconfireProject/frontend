import React, { useState, useEffect } from 'react';
import OnboardingNavbar from '../components/OnboardingNavbar';

type WorkAuthType = 
  | 'Green Card' 
  | 'Citizen' 
  | 'H1-B' 
  | 'L2' 
  | 'F1(CPT/OPT)' 
  | 'H4' 
  | 'Other';

interface OnboardingFormData {
  firstName: string;
  lastName: string;
  middleName?: string;
  preferredName?: string;
  avatarFile?: File | null;
  currentAddress: string;
  cellPhone?: string;
  workPhone?: string;
  email: string;
  ssn?: string;
  dob?: string;
  gender: string;
  isCitizenOrPermanentResident: boolean | null;
  workAuthType?: WorkAuthType | null;
  workAuthOtherDesc?: string;
  workAuthStartDate?: string;
  workAuthEndDate?: string;
  workAuthDocFile?: File | null;
  hasDriversLicense: boolean | null;
  driversLicenseNumber?: string;
  driversLicenseExpiry?: string;
  driversLicenseDocFile?: File | null;
  referenceFirstName?: string;
  referenceLastName?: string;
  referencePhone?: string;
  referenceEmail?: string;
  referenceRelationship?: string;
  emergencyContacts: {
    firstName: string;
    lastName: string;
    middleName?: string;
    phone: string;
    email?: string;
    relationship?: string;
  }[];
}

const defaultEmergencyContact = {
  firstName: '',
  lastName: '',
  middleName: '',
  phone: '',
  email: '',
  relationship: '',
};

const EmployeeOnboardingPage: React.FC<{ userEmail: string }> = ({ userEmail }) => {
  const [formData, setFormData] = useState<OnboardingFormData>({
    firstName: '',
    lastName: '',
    middleName: '',
    preferredName: '',
    avatarFile: null,
    currentAddress: '',
    cellPhone: '',
    workPhone: '',
    email: userEmail, // prefilled and read-only
    ssn: '',
    dob: '',
    gender: '',
    isCitizenOrPermanentResident: null,
    workAuthType: null,
    workAuthOtherDesc: '',
    workAuthStartDate: '',
    workAuthEndDate: '',
    workAuthDocFile: null,
    hasDriversLicense: null,
    driversLicenseNumber: '',
    driversLicenseExpiry: '',
    driversLicenseDocFile: null,
    referenceFirstName: '',
    referenceLastName: '',
    referencePhone: '',
    referenceEmail: '',
    referenceRelationship: '',
    emergencyContacts: [ {...defaultEmergencyContact} ],
  });

  const [showWorkAuthOtherInput, setShowWorkAuthOtherInput] = useState(false);
  const [showWorkAuthDates, setShowWorkAuthDates] = useState(false);
  const [showDriversLicenseFields, setShowDriversLicenseFields] = useState(false);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle file uploads
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    }
  };

  // Handle emergency contacts changes
  const handleEmergencyContactChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const contacts = [...prev.emergencyContacts];
      contacts[index] = { ...contacts[index], [name]: value };
      return { ...prev, emergencyContacts: contacts };
    });
  };

  // Add new emergency contact
  const addEmergencyContact = () => {
    setFormData((prev) => ({
      ...prev,
      emergencyContacts: [...prev.emergencyContacts, { ...defaultEmergencyContact }],
    }));
  };

  // Remove emergency contact
  const removeEmergencyContact = (index: number) => {
    setFormData((prev) => {
      const contacts = [...prev.emergencyContacts];
      contacts.splice(index, 1);
      return { ...prev, emergencyContacts: contacts };
    });
  };

  // Show/hide work auth other input and dates based on selection
  useEffect(() => {
    if (formData.workAuthType === 'Other') {
      setShowWorkAuthOtherInput(true);
      setShowWorkAuthDates(true);
    } else if (
      formData.workAuthType &&
      ['H1-B', 'L2', 'F1(CPT/OPT)', 'H4'].includes(formData.workAuthType)
    ) {
      setShowWorkAuthOtherInput(false);
      setShowWorkAuthDates(true);
    } else {
      setShowWorkAuthOtherInput(false);
      setShowWorkAuthDates(false);
    }
  }, [formData.workAuthType]);

  // Show/hide driver's license fields
  useEffect(() => {
    setShowDriversLicenseFields(!!formData.hasDriversLicense);
  }, [formData.hasDriversLicense]);

  // Submit handler (you will call your backend API here)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: Validate required fields, file uploads

    // Prepare FormData or JSON payload to send

    alert('Submitting onboarding form - implement API call!');
  };

  return (
    <>
    <OnboardingNavbar />
    <div className="container mt-4">
      <h2>Employee Onboarding</h2>
      <div className="bg-white rounded shadow p-4">
        <form onSubmit={handleSubmit}>

          {/* Name Fields */}
          <div className="mb-3">
            <label className="form-label fw-bold">First Name *</label>
            <input
              type="text"
              className="form-control"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Last Name *</label>
            <input
              type="text"
              className="form-control"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Middle Name</label>
            <input
              type="text"
              className="form-control"
              name="middleName"
              value={formData.middleName}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Preferred Name</label>
            <input
              type="text"
              className="form-control"
              name="preferredName"
              value={formData.preferredName}
              onChange={handleChange}
            />
          </div>

          {/* Avatar Upload */}
          <div className="mb-3">
            <label className="form-label">Avatar</label>
            <input type="file" name="avatarFile" accept="image/*" onChange={handleFileChange} />
            <small className="form-text text-muted">Optional. Default avatar will be used if none uploaded.</small>
          </div>

          {/* Address */}
          <div className="mb-3">
            <label className="form-label fw-bold">Current Address *</label>
            <textarea
              className="form-control"
              name="currentAddress"
              value={formData.currentAddress}
              onChange={handleChange}
              required
            />
          </div>

          {/* Phones */}
          <div className="mb-3">
            <label className="form-label">Cell Phone</label>
            <input
              type="tel"
              className="form-control"
              name="cellPhone"
              value={formData.cellPhone}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Work Phone</label>
            <input
              type="tel"
              className="form-control"
              name="workPhone"
              value={formData.workPhone}
              onChange={handleChange}
            />
          </div>

          {/* Email (readonly) */}
          <div className="mb-3">
            <label className="form-label fw-bold">Email *</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              readOnly
            />
          </div>

          {/* SSN, DOB, Gender */}
          <div className="mb-3">
            <label className="form-label">SSN (last 4 digits only)</label>
            <input
              type="text"
              className="form-control"
              name="ssn"
              value={formData.ssn}
              maxLength={4}
              onChange={handleChange}
              placeholder="Last 4 digits"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Date of Birth</label>
            <input
              type="date"
              className="form-control"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Gender</label>
            <select
              className="form-select"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
              <option value="I Prefer Not to Say">I Prefer Not to Say</option>
            </select>
          </div>

          {/* Citizenship/Work Authorization */}
          <fieldset className="mb-3">
            <legend className="fw-bold">Are you a citizen or permanent resident of the U.S.? *</legend>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="isCitizenOrPermanentResident"
                value="true"
                checked={formData.isCitizenOrPermanentResident === true}
                onChange={() => setFormData((prev) => ({ ...prev, isCitizenOrPermanentResident: true, workAuthType: null }))}
                required
              />
              <label className="form-check-label">Yes</label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="isCitizenOrPermanentResident"
                value="false"
                checked={formData.isCitizenOrPermanentResident === false}
                onChange={() => setFormData((prev) => ({ ...prev, isCitizenOrPermanentResident: false }))}
                required
              />
              <label className="form-check-label">No</label>
            </div>
          </fieldset>

          {/* If citizen/permanent resident, select Green Card or Citizen */}
          {formData.isCitizenOrPermanentResident === true && (
            <div className="mb-3">
              <label className="form-label">Select one:</label>
              <select
                className="form-select"
                name="workAuthType"
                value={formData.workAuthType || ''}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="Green Card">Green Card</option>
                <option value="Citizen">Citizen</option>
              </select>
            </div>
          )}

          {/* If NOT citizen/permanent resident, select work authorization */}
          {formData.isCitizenOrPermanentResident === false && (
            <div className="mb-3">
              <label className="form-label">What is your work authorization? *</label>
              <select
                className="form-select"
                name="workAuthType"
                value={formData.workAuthType || ''}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="H1-B">H1-B</option>
                <option value="L2">L2</option>
                <option value="F1(CPT/OPT)">F1(CPT/OPT)</option>
                <option value="H4">H4</option>
                <option value="Other">Other</option>
              </select>
            </div>
          )}

          {/* If other, input box for specifying work authorization */}
          {showWorkAuthOtherInput && (
            <div className="mb-3">
              <label className="form-label">Please specify work authorization *</label>
              <input
                type="text"
                className="form-control"
                name="workAuthOtherDesc"
                value={formData.workAuthOtherDesc}
                onChange={handleChange}
                required
              />
            </div>
          )}

          {/* Work authorization start/end dates */}
          {showWorkAuthDates && (
            <>
              <div className="mb-3">
                <label className="form-label">Work Authorization Start Date *</label>
                <input
                  type="date"
                  className="form-control"
                  name="workAuthStartDate"
                  value={formData.workAuthStartDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Work Authorization Expiration Date *</label>
                <input
                  type="date"
                  className="form-control"
                  name="workAuthEndDate"
                  value={formData.workAuthEndDate}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}

          {/* Upload work authorization document */}
          {(showWorkAuthDates || formData.isCitizenOrPermanentResident === true) && (
            <div className="mb-3">
              <label className="form-label">Upload Work Authorization Document *</label>
              <input
                type="file"
                name="workAuthDocFile"
                accept=".pdf,.jpg,.png"
                onChange={handleFileChange}
                required
              />
            </div>
          )}

          {/* Driver's License */}
          <fieldset className="mb-3">
            <legend className="fw-bold">Do you have a driver's license? *</legend>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="hasDriversLicense"
                value="true"
                checked={formData.hasDriversLicense === true}
                onChange={() => setFormData((prev) => ({ ...prev, hasDriversLicense: true }))}
                required
              />
              <label className="form-check-label">Yes</label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="hasDriversLicense"
                value="false"
                checked={formData.hasDriversLicense === false}
                onChange={() => setFormData((prev) => ({ ...prev, hasDriversLicense: false }))}
                required
              />
              <label className="form-check-label">No</label>
            </div>
          </fieldset>

          {/* Driver's license details if yes */}
          {showDriversLicenseFields && (
            <>
              <div className="mb-3">
                <label className="form-label">Driver's License Number *</label>
                <input
                  type="text"
                  className="form-control"
                  name="driversLicenseNumber"
                  value={formData.driversLicenseNumber}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Driver's License Expiration Date *</label>
                <input
                  type="date"
                  className="form-control"
                  name="driversLicenseExpiry"
                  value={formData.driversLicenseExpiry}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Upload Driver's License Document *</label>
                <input
                  type="file"
                  name="driversLicenseDocFile"
                  accept=".pdf,.jpg,.png"
                  onChange={handleFileChange}
                  required
                />
              </div>
            </>
          )}

          {/* Reference */}
          <h5 className="mt-4">Reference</h5>
          <div className="mb-3">
            <label className="form-label">First Name</label>
            <input
              type="text"
              className="form-control"
              name="referenceFirstName"
              value={formData.referenceFirstName}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Last Name</label>
            <input
              type="text"
              className="form-control"
              name="referenceLastName"
              value={formData.referenceLastName}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input
              type="tel"
              className="form-control"
              name="referencePhone"
              value={formData.referencePhone}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="referenceEmail"
              value={formData.referenceEmail}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Relationship</label>
            <input
              type="text"
              className="form-control"
              name="referenceRelationship"
              value={formData.referenceRelationship}
              onChange={handleChange}
            />
          </div>

          {/* Emergency Contacts */}
          <h5 className="mt-4">Emergency Contacts (at least one required)</h5>
          {formData.emergencyContacts.map((contact, idx) => (
            <div key={idx} className="border p-3 mb-3 rounded">
              <h6>Contact {idx + 1}</h6>
              <div className="mb-2">
                <label className="form-label">First Name *</label>
                <input
                  type="text"
                  className="form-control"
                  name="firstName"
                  value={contact.firstName}
                  onChange={(e) => handleEmergencyContactChange(idx, e)}
                  required
                />
              </div>
              <div className="mb-2">
                <label className="form-label">Last Name *</label>
                <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  value={contact.lastName}
                  onChange={(e) => handleEmergencyContactChange(idx, e)}
                  required
                />
              </div>
              <div className="mb-2">
                <label className="form-label">Middle Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="middleName"
                  value={contact.middleName}
                  onChange={(e) => handleEmergencyContactChange(idx, e)}
                />
              </div>
              <div className="mb-2">
                <label className="form-label">Phone *</label>
                <input
                  type="tel"
                  className="form-control"
                  name="phone"
                  value={contact.phone}
                  onChange={(e) => handleEmergencyContactChange(idx, e)}
                  required
                />
              </div>
              <div className="mb-2">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={contact.email}
                  onChange={(e) => handleEmergencyContactChange(idx, e)}
                />
              </div>
              <div className="mb-2">
                <label className="form-label">Relationship</label>
                <input
                  type="text"
                  className="form-control"
                  name="relationship"
                  value={contact.relationship}
                  onChange={(e) => handleEmergencyContactChange(idx, e)}
                />
              </div>
              {formData.emergencyContacts.length > 1 && (
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={() => removeEmergencyContact(idx)}
                >
                  Remove Contact
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            className="btn btn-secondary mb-4"
            onClick={addEmergencyContact}
          >
            Add Another Emergency Contact
          </button>

          <button type="submit" className="btn btn-primary w-100 mb-5">
            Submit Onboarding
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default EmployeeOnboardingPage;
